/*
 * Preview mode: plays back the calls GMod makes during a connect, on a loop, so the page
 * can be checked in a normal browser. Open index.html?preview (or preview.html).
 * Extras: &map=ttt_minecraft_b5 tests per-map images, &date=10-31 tests seasons.
 * Only loaded in preview mode; players never download it.
 */
(function () {
  "use strict";

  var mapMatch = /[?&]map=([^&]*)/.exec(window.location.search);
  var map = mapMatch ? decodeURIComponent(mapMatch[1]) : "ttt_minecraft_b5";
  var files = [
    "maps/" + map + ".bsp",
    "materials/vgui/ttt/dynamic/roles/icon_traitor.vmt",
    "models/weapons/w_ttt_example.mdl",
    "sound/ttt2/example_round_start.wav",
    "TTT2 Example Workshop Content"
  ];

  function connect() {
    window.SetStatusChanged("Retrieving server info...");
    setTimeout(function () {
      window.GameDetails("RAGGLE'S TERRORISTE BEACHE", window.location.href, map, 24,
        "76561197960287930", "terrortown", 1, "en", "Trouble in Terrorist Town 2");
    }, 400);
    setTimeout(download, 1500);
  }

  function download() {
    var total = 140;
    var needed = 60;
    window.SetFilesNeeded(needed);
    window.SetFilesTotal(total);
    var timer = setInterval(function () {
      needed -= 1;
      window.DownloadingFile(files[needed % files.length]);
      window.SetFilesNeeded(needed);
      if (needed > 0) return;
      clearInterval(timer);
      finish(["Workshop Complete", "Sending client info...", "Client info sent!", "Starting Lua..."]);
    }, 150);
  }

  function finish(statuses) {
    statuses.forEach(function (status, i) {
      setTimeout(function () {
        window.SetStatusChanged(status);
      }, 900 * i);
    });
    setTimeout(connect, 900 * statuses.length + 2500);
  }

  connect();
})();
