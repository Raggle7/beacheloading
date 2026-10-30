// Loading screen settings. This is the only file you need to edit.
// Paths are relative to this folder (docs/). Commit and push your changes;
// GitHub Pages picks them up within a few minutes.

window.LS_CONFIG = {
  // Big title in the bottom-left. Leave empty to use the server's hostname.
  title: "",

  // Optional logo above the title, e.g. "img/logo.png". Leave empty for none.
  logo: "",

  // Color for the progress bar, spinner, map name and tip label.
  accentColor: "#e04545",

  // Background pool. One image is picked at random on every connect and map change,
  // never the same one twice in a row. Aim for 1920x1080 JPG/WebP around 200-400 KB.
  backgrounds: [
    "img/bg/BeacheHalloween2026.png"
  ],

  // Optional images for specific maps; these replace the pool on that map.
  // A map can have one image or a list to pick from.
  mapBackgrounds: {
    // "ttt_minecraft_b5": "img/maps/ttt_minecraft_b5.jpg",
    // "ttt_67thway_v14": ["img/maps/67thway-1.jpg", "img/maps/67thway-2.jpg"]
  },

  // Switch to another image every N seconds during long loads. 0 = one image per load.
  // Each switch downloads another image, so keep this off or long.
  slideshowSeconds: 0,

  // Music. One track is picked at random per load and plays until loading finishes.
  // Each entry is a path, or { src: "...", title: "..." } to set the "now playing" text
  // (otherwise the file name is shown). 128-160 kbps MP3/OGG keeps files small.
  music: [
    { src: "audio/darkchao.mp3", title: "SA2 - Dark Chao Theme" }
  ],

  // 0-1. Multiplied by the player's own in-game music volume (snd_musicvolume).
  musicVolume: 0.3,
  musicFadeInSeconds: 3,
  showNowPlaying: true,

  // The "now loading" overlay in the bottom-right. Leave overlayImage empty for the
  // built-in spinner, or point it at a GIF/PNG/WebP (keep GIFs under ~150 KB).
  // Set overlayText to "" if your image already says "now loading".
  overlayImage: "",
  overlayText: "Now loading",

  // Rotating tips in the top-left. An empty list hides the box.
  // Swap these for your own server's rules and tips.
  tips: [
    "!Beache to open your Beache Coine Wallete.",
    "Alt (Walk) + E (Use) lets you sit!",
    "Live by the prop, die by the prop. — Unknown",
    "A bomb's a bad choice for close-range combat. — JC Denton"
  ],
  tipSeconds: 4,

  // Friendly map names. Unlisted maps are tidied automatically
  // (ttt_minecraft_b5 -> Minecraft B5).
  mapNames: {
    // "ttt_67thway_v14": "67th Way"
  },

  // Seasonal overrides. While today's date is between "from" and "to" (MM-DD,
  // inclusive), any setting listed in the season replaces the one above.
  // The first matching season wins; ranges may wrap the new year ("12-20" to "01-05").
  seasons: [
    // {
    //   from: "10-15", to: "11-02",
    //   accentColor: "#ff7a1a",
    //   backgrounds: ["img/season/halloween-1.jpg", "img/season/halloween-2.jpg"],
    //   music: ["audio/season/spooky.mp3"]
    // }
  ]
};
