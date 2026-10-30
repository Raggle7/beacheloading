# TTT2 Loading Screen

A self-hosted loading screen for our TTT2 server, replacing gmod-lsm.com. It's a static web
page on GitHub Pages plus a one-file server addon that points players at it. There's no
account and no backend: to change anything, edit `docs/config.js` and push.

On every connect and map change it shows:

- a random background (or a per-map one), never the same twice in a row
- a random music track that fades in at the player's own in-game music volume
- a "now loading" spinner or your own GIF
- the server name, map, download progress and the file currently downloading
- rotating tips, and optional seasonal sets of images and music

## What's in here

```
docs/                 the loading screen page (GitHub Pages serves this folder)
  config.js           the only file you normally edit
  img/bg/             random background pool (the placeholders are safe to delete)
  img/maps/           optional per-map backgrounds
  audio/              music
  preview.html        open this in a browser to see the page with fake loading data
lua/autorun/server/   tiny server addon that sets sv_loadingurl
```

## Setup

1. **Create a GitHub repo** and push this folder to it. GitHub Pages needs a public repo on a
   free account, so everything in `docs/` is public.
2. **Turn on Pages:** repo **Settings → Pages → Build and deployment**. Choose
   *Deploy from a branch*, branch `main`, folder `/docs`, then **Save**. After a minute or so
   the page is live at `https://<your-name>.github.io/<repo>/`.
3. **Check it in a browser:** open `https://<your-name>.github.io/<repo>/preview.html`.
4. **Point the server at it.** Pick one of these:
   - **Addon:** copy this repo (or just the `lua` folder) to
     `garrysmod/addons/ttt2_loadingscreen/` on the server, then either edit `DEFAULT_URL` in
     `lua/autorun/server/ttt2_loadingscreen.lua` or add this to `server.cfg`:
     ```
     ttt2_loadingscreen_url "https://<your-name>.github.io/<repo>/?map=%m"
     ```
   - **No addon:** put this line in `server.cfg` instead:
     ```
     sv_loadingurl "https://<your-name>.github.io/<repo>/?map=%m"
     ```
5. **Remove the old gmod-lsm setup.** Delete any old `sv_loadingurl` line from `server.cfg`
   and remove the gmod-lsm addon if you have one, or it will overwrite this one.
6. Change map or restart the server, then join.

## Changing images, music and text

Add files under `docs/`, list them in `docs/config.js`, then commit and push. Every setting is
explained in that file. GitHub Pages caches files for about 10 minutes, so changes can take
that long to show up in-game.

- **Per-map backgrounds:** key `mapBackgrounds` by the exact map name (the one shown by the
  `status` console command), e.g. `"ttt_minecraft_b5": "img/maps/ttt_minecraft_b5.jpg"`.
- **Seasons:** add an entry to `seasons` with a `from`/`to` date (MM-DD). Any setting listed in
  the season replaces the normal one during those dates.
- **Music titles:** the "now playing" text is the file name unless you give a `title`, so naming
  files `Artist - Song.mp3` saves typing.

Size guide (smaller files mean less bandwidth spent before the game's own downloads start):

| File              | Target                                            |
| ----------------- | ------------------------------------------------- |
| Background        | 1920×1080 JPG or WebP, about 200–400 KB           |
| Music             | MP3 or OGG at 128–160 kbps (about 1 MB per minute) |
| Now-loading GIF   | under about 150 KB, small dimensions              |
| Logo              | PNG or WebP, under about 100 KB                   |

Only the chosen background and track are downloaded on each load, never the whole pool.

## Previewing

Open `docs/preview.html` in a browser (double-clicking it works). It plays back the same calls
GMod makes during a connect, on a loop. Your browser blocks autoplay, so click once to hear the
music. That never happens in-game.

You can add options to the address:

- `index.html?preview&map=ttt_minecraft_b5` tests a per-map background.
- `index.html?preview&date=10-31` tests a season.

## Testing in-game for the first time

- Check that the music plays. GMod's browser is Chromium 86 without some media formats (MP4
  video is listed as unsupported), so if an MP3 stays silent, convert it to OGG. When a track
  fails to load, the page skips to another one.
- The loading screen takes no mouse or keyboard input, so it can't have buttons such as mute.
  Players turn the music down with their in-game music volume.
- Players who have set `cl_enable_loadingurl 0` see the default GMod loading screen.

## Keeping it light

- The page itself (HTML, CSS and JavaScript) is about 25 KB before compression, with no
  libraries, web fonts or trackers.
- Animations are limited to small areas. The game copies every repainted pixel of the page, so
  avoid full-screen motion such as video backgrounds or zooming images.
- Music is the largest download by far. GitHub Pages has a soft bandwidth limit of 100 GB a
  month, which is tens of thousands of loads at about 3 MB each.
- Only use music and images you have the rights to. The repo is public, and GitHub removes
  copyrighted files when it gets a takedown request.
