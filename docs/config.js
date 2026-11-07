window.LS_CONFIG = {
  // Big title in the bottom-left. Leave empty to use the server's hostname.
  title: "RAGGLE'S TERRORISTE BEACHE",

  // Optional logo above the title, e.g. "img/logo.png". Leave empty for none.
  logo: "",

  // Color for the progress bar, spinner, map name and tip label.
  accentColor: "#e04545",

  // Background pool. One image is picked at random on every connect and map change,
  backgrounds: [
    "img/bg/beacheslam.png"
    "img/bg/BeacheHalloween2026.png"
    "img/bg/TTT_InitialD.jpg"
    "img/bg/cyberbeache.png"
    "img/bg/seaofttt_hq.jpg"
    "img/bg/ippo_beache.png"
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
    { src: "audio/ggaworldly.mp3", title: "Goemon's Great Adventure - Worldly Town Night" },
    { src: "audio/mmlapple.mp3", title: "Megaman legends - Apple Market" },
    { src: "audio/ff14distance.mp3", title: "Final Fantasy XIV - Close In The Distance" },
    //{ src: "audio/darkchao.mp3", title: "Sonic Adventure 2 - Dark Chao Theme" },
    //{ src: "audio/nujabes.mp3", title: "Nujabes - Luv(sic.) pt3 (feat. Shing02)" },
    { src: "audio/dothackmenu.mp3", title: ".Hack// - Desktop Theme" },
    { src: "audio/daydawns.mp3", title: "Phantasy Star Online - Day Dawns" },
    { src: "audio/mvc3.mp3", title: "Marvel vs Capcom 3 - Online Lobby" },
    //{ src: "audio/restareamelee.mp3", title: "Super Smash Bros Melee - Rest Area" },
    { src: "audio/fft.mp3", title: "Final Fantasy Tactics - Menu" },
    { src: "audio/darktideauspex.mp3", title: "Warhammer 40K Darktide - Offworld Auspex" },
    { src: "audio/wildarms3rest.mp3", title: "Wild Arms 3 - Long Days of Rest" },
    { src: "audio/ctcorridor.mp3", title: "Chrono Trigger - Corridors of Time" },
    { src: "audio/sa2aquatic.mp3", title: "Sonic Adventure 2 - Dive Into The Mellow (Aquatic Mine)" },
    { src: "audio/xgemotion.mp3", title: "Xenogears - Emotion" },
    { src: "audio/gwfactions.mp3", title: "Guild Wars - Factions Theme" },
    { src: "audio/mshenesys.mp3", title: "MapleStory - Henesys" },
    { src: "audio/osrsnewbie.mp3", title: "Runescape - Newbie Melody" },
    { src: "audio/ffxbesaid.mp3", title: "Final Fantasy X - Besaid Island" },
    { src: "audio/ebname.mp3", title: "Earthbound - Your Name Please (Noiseless)" },
    { src: "audio/y0substory.mp3", title: "Yakuza 0 - Sub Story Theme" }
    //{ src: "audio/SA2 - Ghost's Pumpkin Soup.mp3", title: "Sonic Adventure 2 - Ghost's Pumpkin Soup" }
  ],

  // 0-1. Multiplied by the player's own in-game music volume (snd_musicvolume).
  musicVolume: 0.2,
  musicFadeInSeconds: 3,
  showNowPlaying: true,

  // The "now loading" overlay in the bottom-right. Leave overlayImage empty for the gif
  overlayImage: "",
  overlayText: "You're On Your Way...",

  // Rotating tips in the top-left. An empty list hides the box.
  tips: [
    "!Beache to open your Beache Coine Wallete.",
    "Configure your game in the F1 MENU.",
    "Alt (Walk) + E (Use) lets you sit.",
    "Live by the prop, die by the prop.",
    "Do you have a single fact to back that up?",
    "A bomb's a bad choice for close-range combat.",
    "Nice werkehs dudehs, you'll have to let me have a play sometime. Looks like super duper fun time eclipse sunset surpise! <]=)",
    "Your life literally is as valuable as a summer ant. I'm just gonna stomp you, you're gonna keep coming back, seal up all my cracks, you're gonna keep coming back, why? Cause you keep smelling the syrup",
    "For me, it is the McChicken! The very embodiment of a fast food sandwich.",
    "In that instant, time stood still, and joy surged through my veins. 'Wow, three for free!' I exclaimed",
    "Press the A (XBOX) or Cross (PLAYSTATION) BUTTON on your controller to jump.",
    "You cheated not only the argument, but yourself. You didn't create. You didn't improvise. You used a copypasta and added nothing. You experienced a hollow debate. Nothing was discussed and nothing was learned. It's sad that you don't know the difference.",
    "I hate this game. With all my heart I hate it. And I don't hate because of what it is able to do. I hate it, because it seems the 99% of people in it are worthless scum, who only able to enjoy their day if they ruin it for the other.",
    "A beach's sand is the slightly unstable ground before the ocean of endless possibility.",
    "Breasts kind of lose their appeal once you realize they look like a massive nutsack and the neck is kind of like the shaft",
    "I will make you pee within the next 24 hours. I won't say when though, it would ruin the surprise. If you're reading this, you will pee. Think of me when you do.",
    "For me, it's bang's. no other soda comes close to the rich flavor and smoothness of bang's root beer.",
    "@everyone, Please DO NOT post nicocado to the server. This has been a reoccurring issue, and I'm not sure why some people have such under developed social skills that they think that a server full of mostly male friends would need to see that.",
    "You will never be a real incel. You have no autism, you have no negative canthal tilt, you have no deep seated emotional resentment. You are a well-adjusted man twisted by irony and memes into a crude mockery of a stone cold virgin.",
    "I want you to quit. I want you to grow up. I want you to get a real job. I want you to understand your friends better. I want you to understand your self better. I want you to understand girls better. I want you to stop being the person you are - let me finish - I want you to stop being the person you are because it's disgusting.",
    "I AM ANNOUNCING MY IMMINENT MASTURBATION.",
    "I'm not a libertarian, I don't know why you guys think I'm libertarian. I'm an Objectivist and laissez faire Capitalist against nationalized industry, I'm pretty sure I've made that abundantly clear.",
    "Is the echo chamber really that deafening for you guys? But anyways, you’re always free to DM and tell me why I’m wrong, IDK why everyone insist on just typing up shit in the discord",
    "I got a message for all you liberals out there: You want my gun? My firearm? Come take it from me. With your weak, soft, liberal, girlish hands. Just try to put those hands on me. Those soft liberal hands, just put em on me.",
    "First, it was the Aggro Crag, and then it evolved into the Mega Crag, and now (it has become) the SUPER AGGRO CRAG.",
    "ＳＵＩＣＩＤＥ ＩＳ ＩＬＬＥＧＡＬ ＢＥＣＡＵＳＥ ＤＥＳＴＲＯＹＩＮＧ ＧＯＶＥＲＮＭＥＮＴ ＰＲＯＰＥＲＴＹ ＩＳ ＩＬＬＥＧＡＬ",
    "'Bullshit.' — Jack Garland"
    
  ],
  tipSeconds: 5,

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
