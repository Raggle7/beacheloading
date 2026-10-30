/*
 * TTT2 loading screen.
 *
 * GMod calls the window.* functions in the "GMod API" section while a player connects;
 * everything else is driven by config.js. Written in plain ES5 with no libraries so it
 * stays small and still runs on the old Awesomium engine some Linux players have.
 */
(function () {
  "use strict";

  var params = parseQuery(window.location.search);
  var isPreview = Object.prototype.hasOwnProperty.call(params, "preview");
  var cfg = withSeason(window.LS_CONFIG || {});

  var state = {
    // From "?map=%m" in sv_loadingurl, so the right background can load before GameDetails.
    map: params.map && params.map.indexOf("%") === -1 ? params.map : "",
    playerVolume: 1,
    filesTotal: 0,
    filesNeeded: 0
  };

  // ---------------------------------------------------------------- helpers

  function $(id) {
    return document.getElementById(id);
  }

  function setText(id, text) {
    $(id).textContent = text == null ? "" : String(text);
  }

  function setHidden(id, hidden) {
    var el = $(id);
    if (hidden) el.classList.add("is-hidden");
    else el.classList.remove("is-hidden");
  }

  function parseQuery(search) {
    var out = {};
    search.replace(/^\?/, "").split("&").forEach(function (pair) {
      if (!pair) return;
      var parts = pair.split("=");
      out[decode(parts[0])] = parts.length > 1 ? decode(parts.slice(1).join("=")) : "";
    });
    return out;
  }

  function decode(text) {
    try {
      return decodeURIComponent(text.replace(/\+/g, " "));
    } catch (e) {
      return text;
    }
  }

  // localStorage can be missing or throw; it only powers "don't repeat the last pick".
  function recall(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function remember(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {}
  }

  function list(value) {
    if (!value) return [];
    return Object.prototype.toString.call(value) === "[object Array]" ? value : [value];
  }

  function srcOf(item) {
    return typeof item === "string" ? item : item.src;
  }

  function clamp01(n) {
    return Math.max(0, Math.min(1, n));
  }

  function shuffle(items) {
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = items[i];
      items[i] = items[j];
      items[j] = tmp;
    }
    return items;
  }

  // Random item, avoiding whatever was picked last time under the same key.
  function pickFresh(items, key) {
    if (!items.length) return null;
    var last = recall(key);
    var choices = items.filter(function (item) {
      return srcOf(item) !== last;
    });
    if (!choices.length) choices = items;
    var choice = choices[Math.floor(Math.random() * choices.length)];
    remember(key, srcOf(choice));
    return choice;
  }

  function loadScript(src) {
    var script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
  }

  // ---------------------------------------------------------------- seasons

  // Copy of the config with the first matching season's settings laid over it.
  function withSeason(base) {
    var merged = {};
    var key;
    for (key in base) merged[key] = base[key];

    var today = monthDay(isPreview && params.date ? params.date : null);
    var seasons = list(base.seasons);
    for (var i = 0; i < seasons.length; i++) {
      var season = seasons[i];
      var from = monthDay(season.from);
      var to = monthDay(season.to);
      var active = from <= to ? today >= from && today <= to : today >= from || today <= to;
      if (!active) continue;
      for (key in season) {
        if (key !== "from" && key !== "to") merged[key] = season[key];
      }
      break;
    }
    return merged;
  }

  // "10-31" -> 1031. No argument means today.
  function monthDay(text) {
    if (!text) {
      var now = new Date();
      return (now.getMonth() + 1) * 100 + now.getDate();
    }
    var parts = String(text).split("-");
    return parseInt(parts[0], 10) * 100 + parseInt(parts[1], 10);
  }

  // ---------------------------------------------------------------- backgrounds

  var bgLayers = [$("bg-a"), $("bg-b")];
  var bgFront = 0;
  var bgCurrent = null;
  var slideshowTimer = null;

  function backgroundPool() {
    var forMap = state.map && cfg.mapBackgrounds ? list(cfg.mapBackgrounds[state.map]) : [];
    return forMap.length ? forMap : list(cfg.backgrounds);
  }

  // Loads the image off-screen first, then crossfades to it, so there's never a half-drawn frame.
  function showBackground(src) {
    if (!src || src === bgCurrent) return;
    bgCurrent = src;
    var img = new Image();
    img.onload = function () {
      if (bgCurrent !== src) return;
      var next = bgLayers[1 - bgFront];
      next.style.backgroundImage = 'url("' + src.replace(/"/g, '\\"') + '")';
      next.classList.add("is-visible");
      bgLayers[bgFront].classList.remove("is-visible");
      bgFront = 1 - bgFront;
    };
    img.src = src;
  }

  function pickBackground() {
    var pool = backgroundPool();
    showBackground(pickFresh(pool, "ls.lastBackground"));

    clearInterval(slideshowTimer);
    if (cfg.slideshowSeconds > 0 && pool.length > 1) {
      slideshowTimer = setInterval(function () {
        showBackground(pickFresh(backgroundPool(), "ls.lastBackground"));
      }, cfg.slideshowSeconds * 1000);
    }
  }

  // ---------------------------------------------------------------- music

  var tracks = list(cfg.music);
  var failed = {};
  var audio = null;
  var currentTrack = null;
  var fadeTimer = null;
  var musicStarted = false;

  function musicVolume() {
    var base = typeof cfg.musicVolume === "number" ? cfg.musicVolume : 0.4;
    return clamp01(base) * state.playerVolume;
  }

  function startMusic() {
    if (musicStarted) return;
    musicStarted = true;
    if (!tracks.length || musicVolume() <= 0) return;

    audio = new Audio();
    audio.preload = "auto";
    audio.volume = 0;
    audio.loop = tracks.length === 1;
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("ended", function () {
      playTrack(pickFresh(playableTracks(), "ls.lastTrack"));
    });
    // Missing file or a format this browser can't decode: try another track.
    audio.addEventListener("error", function () {
      if (currentTrack) failed[srcOf(currentTrack)] = true;
      playTrack(pickFresh(playableTracks(), "ls.lastTrack"));
    });
    playTrack(pickFresh(tracks, "ls.lastTrack"));
  }

  function playableTracks() {
    return tracks.filter(function (track) {
      return !failed[srcOf(track)];
    });
  }

  function playTrack(track) {
    currentTrack = track;
    if (!track) {
      setHidden("now-playing", true);
      return;
    }
    audio.src = srcOf(track);
    var attempt = audio.play();
    if (attempt && attempt.catch) attempt.catch(onPlayRejected);
  }

  function onPlaying() {
    if (cfg.showNowPlaying !== false && currentTrack) {
      setText("track-title", trackTitle(currentTrack));
      setHidden("now-playing", false);
    }
    fadeToTarget();
  }

  // Ramps up to the target volume, or drops straight to it if the target went down.
  function fadeToTarget() {
    clearInterval(fadeTimer);
    var seconds = typeof cfg.musicFadeInSeconds === "number" ? cfg.musicFadeInSeconds : 3;
    fadeTimer = setInterval(function () {
      var target = musicVolume();
      var step = seconds > 0 ? target / (seconds * 20) : target;
      audio.volume = audio.volume > target ? target : Math.min(target, audio.volume + step);
      if (audio.volume >= target) clearInterval(fadeTimer);
    }, 50);
  }

  // Desktop browsers block autoplay until the page is clicked, which only matters in preview
  // mode: GMod's loading screen takes no mouse input, so there is nothing to click there.
  function onPlayRejected(err) {
    if (!err || err.name !== "NotAllowedError") return;
    document.body.classList.add("needs-gesture");
    function resume() {
      document.removeEventListener("click", resume);
      document.removeEventListener("keydown", resume);
      document.body.classList.remove("needs-gesture");
      audio.play();
    }
    document.addEventListener("click", resume);
    document.addEventListener("keydown", resume);
  }

  function trackTitle(track) {
    if (track.title) return track.title;
    var name = srcOf(track).split("/").pop().replace(/\.[^.]+$/, "");
    return decode(name).replace(/_+/g, " ").trim();
  }

  // ---------------------------------------------------------------- text, tips, overlay

  function prettyMapName(map) {
    if (cfg.mapNames && cfg.mapNames[map]) return cfg.mapNames[map];
    return map
      .replace(/^(ttt2?|gm|cs|de|rp|zs|mu|dm|ph|jb)_/i, "")
      .split(/[_\s]+/)
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  function startTips() {
    var tips = shuffle(list(cfg.tips).slice());
    if (!tips.length) return;

    var index = 0;
    setText("tip-text", tips[0]);
    setHidden("tip", false);
    if (tips.length < 2) return;

    var seconds = Math.max(3, cfg.tipSeconds || 8);
    setInterval(function () {
      setHidden("tip", true);
      setTimeout(function () {
        index = (index + 1) % tips.length;
        setText("tip-text", tips[index]);
        setHidden("tip", false);
      }, 600);
    }, seconds * 1000);
  }

  // The spinner stays up until the custom image has loaded, so the corner is never empty.
  function setupOverlay() {
    var text = cfg.overlayText == null ? "Now loading" : cfg.overlayText;
    setText("loader-text", text);
    $("loader-caption").hidden = !text;

    if (!cfg.overlayImage) return;
    var img = $("loader-image");
    img.onload = function () {
      img.hidden = false;
      $("spinner").hidden = true;
    };
    img.src = cfg.overlayImage;
  }

  function setupLogo() {
    if (!cfg.logo) return;
    var logo = $("logo");
    logo.onload = function () {
      logo.hidden = false;
    };
    logo.src = cfg.logo;
  }

  function updateProgress() {
    var total = state.filesTotal;
    if (total <= 0) {
      setHidden("progress", true);
      setText("file-count", "");
      return;
    }
    var done = Math.max(0, total - state.filesNeeded);
    $("progress-fill").style.width = Math.min(100, (done / total) * 100) + "%";
    setHidden("progress", false);
    setText("file-count", done + " / " + total + " files");
  }

  // ---------------------------------------------------------------- GMod API

  window.GameDetails = function (servername, serverurl, mapname, maxplayers, steamid, gamemode, volume) {
    setText("server-name", cfg.title || servername);

    if (mapname) {
      setText("map-name", prettyMapName(mapname));
      // Only needed when sv_loadingurl doesn't pass ?map=%m.
      if (!state.map) {
        state.map = mapname;
        if (cfg.mapBackgrounds && cfg.mapBackgrounds[mapname]) pickBackground();
      }
    }

    var playerVolume = parseFloat(volume);
    if (!isNaN(playerVolume)) state.playerVolume = clamp01(playerVolume);

    if (!musicStarted) {
      startMusic();
    } else if (audio && musicVolume() <= 0) {
      audio.pause();
      setHidden("now-playing", true);
    } else if (audio) {
      fadeToTarget();
    }
  };

  window.SetFilesTotal = function (total) {
    state.filesTotal = parseInt(total, 10) || 0;
    updateProgress();
  };

  window.SetFilesNeeded = function (needed) {
    state.filesNeeded = parseInt(needed, 10) || 0;
    updateProgress();
  };

  window.DownloadingFile = function (fileName) {
    setText("status", "Downloading");
    setText("file-name", fileName);
  };

  window.SetStatusChanged = function (status) {
    setText("status", status);
    setText("file-name", "");
  };

  // ---------------------------------------------------------------- start

  if (cfg.accentColor) document.documentElement.style.setProperty("--accent", cfg.accentColor);

  setText("server-name", cfg.title || "");
  if (state.map) setText("map-name", prettyMapName(state.map));
  setupLogo();
  setupOverlay();
  pickBackground();
  startTips();

  // GameDetails normally arrives first and starts the music at the player's own volume.
  // This is the fallback if it never comes.
  setTimeout(startMusic, 2500);

  if (isPreview) {
    document.body.classList.add("is-preview");
    loadScript("preview.js");
  }
})();
