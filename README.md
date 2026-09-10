# uofrobotics-web

The University of Regina Robotics Club website, as a React single-page app.

Four routes, one stylesheet, no UI framework and no CSS-in-JS. The design,
copy and behaviour are a direct port of the static build that preceded it —
nothing was redesigned in the move to React.

```
/            Cover: hero fields, contents, six numbers, join
/club        Ch 1–3   the story, the club now, board, the lab
/work        Ch 4–5   SO-ARM101 case study, other builds
/support     Ch 6–8   sponsorship, in-kind, outreach, newsletter
```

---

## Running it

```bash
npm install
npm start          # http://localhost:3000
```

```bash
npm run build      # production bundle in build/
npx serve -s build # serve it the way a host would
```

`serve -s` matters: the `-s` flag makes every unknown path fall back to
`index.html`, which is what a single-page app needs. A plain file server will
404 on `/club`.

---

## Layout

```
public/
  index.html         shell, fonts, favicon, and the pre-paint theme script
  404.html           single-page-app fallback for GitHub Pages
  manifest.json
  robots.txt
  assets/            photographs and the SO-ARM101 clip, served as static files

src/
  index.js           entry point
  App.js             router, page chrome, and the hooks that run per route
  styles/styles.css  the entire design system, one file

  pages/             one per route, composed from components
    Home.js  Club.js  Work.js  Support.js

  components/
    Boot.js          the ASCII counter intro (cover only)
    Hero.js          expanding fields, clocks, the scorpion draw
    Builds.js        the accordion
    Nav.js  Drawer.js  SlideIndex.js  Progress.js  Rails.js  Footer.js
    Story.js  ClubNow.js  Board.js  Lab.js  SoArm101.js
    Contents.js  Proof.js  Sponsorship.js  Outreach.js  Join.js

  hooks/
    useDeck.js                 chapter rail, progress bar, deck keys,
                               scroll-driven type scale, photo parallax
    useReveal.js               wipes, heading scramble, counting numbers
    useMagnetic.js             controls that lean toward the cursor
    useScrollToHash.js         makes /work#builds land in the right place
    usePrefersReducedMotion.js one source of truth for motion preferences

  context/ThemeContext.js      light/dark, persisted, shared by every route
  lib/asset.js                 builds public/ URLs through PUBLIC_URL
  lib/scorpionPath.js          47 KB of path data, isolated so nothing else carries it
```

### Why the hooks read the DOM

`useDeck` and `useReveal` query `.slide` and `[data-reveal]` rather than taking a
config object. That is deliberate: sections stay plain markup, so adding one to a
page is enough to make it join the right-hand chapter rail and pick up its reveal.
Give a `<section>` this and it is wired:

```jsx
<section className="sheet slide" id="lore" data-slide="Lore" data-reveal>
```

Child effects run before parent effects in React, so by the time `App`'s hooks
fire, the route's sections are already mounted and queryable.

---

## Editing

- **Copy** lives inside the components. Nothing is generated, nothing is fetched.
- **Colour and type** are CSS custom properties at the top of `styles.css`.
  `--red` (`#f53531`) is sampled from the club's own scorpion wordmark.
- **Spacing** is five tokens — `--pad`, `--cell`, `--row`, `--block`, `--lede`.
  Change those and the whole site loosens or tightens together.
- **Media** goes in `public/assets/` and is referenced through `asset('name.jpg')`
  so it keeps working when the site is deployed under a sub-path.
- **The list-shaped sections are data-driven.** Hero fields, builds and
  sponsorship tiers are arrays at the top of their component; add an entry rather
  than copying markup.

---

## Deploying

Currently configured for **https://kali2007thecodemaster.github.io/uofrobotics-website/**:

- `package.json` → `"homepage": "https://kali2007thecodemaster.github.io/uofrobotics-website"`
- `public/404.html` → `pathSegmentsToKeep = 1`
- no `public/CNAME`

```bash
npm install
npm run deploy
```

Then **Settings → Pages → Deploy from branch → `gh-pages` / root**.

### Switching to the custom domain (uofrobotics.org)

Three changes, all three or none — each omission breaks the site differently:

1. Delete the `"homepage"` line from `package.json`.
2. Set `pathSegmentsToKeep = 0` in `public/404.html`.
3. Create `public/CNAME` containing one line: `uofrobotics.org`

Then DNS at Porkbun — delete the default parking records, then add:

| Type  | Host      | Answer                          |
| ----- | --------- | ------------------------------- |
| A     | *(blank)* | 185.199.108.153                 |
| A     | *(blank)* | 185.199.109.153                 |
| A     | *(blank)* | 185.199.110.153                 |
| A     | *(blank)* | 185.199.111.153                 |
| CNAME | www       | kali2007thecodemaster.github.io |

A blank host means the apex. Then `npm run deploy`, set the custom domain in
Pages settings, and tick **Enforce HTTPS** once the certificate is issued.

`public/CNAME` is the piece that is easy to lose. `npm run deploy` wipes and
rewrites the whole `gh-pages` branch, deleting the CNAME file GitHub writes when
you set a custom domain — the site then silently reverts to the github.io
address on the *next* deploy, long after anyone connects the two events. Keeping
it in `public/` means every build reproduces it.

Check DNS before blaming GitHub:

```bash
dig uofrobotics.org +noall +answer -t A
dig www.uofrobotics.org +noall +answer
```

### Anywhere else

Netlify, Vercel, Cloudflare Pages: build command `npm run build`, publish
directory `build`, SPA rewrite `/* → /index.html`, and remove `homepage`.

---

## Notes for whoever inherits this

- **The intro runs on the cover only.** Replaying a loading screen on every
  internal navigation would be an irritation, not an experience.
- **Theme is resolved before first paint** by a small inline script in
  `public/index.html`, not by React. If React set it, every route change would
  flash white first. `ThemeContext` adopts whatever that script decided.
- **`data-*` attributes are the contract between markup and behaviour** —
  `data-item`, `data-line`, `data-grow`, `data-parallax`, `data-scramble`,
  `data-count`. They are all documented by use in `styles.css` and the hooks.
- **Motion is opt-out.** Every animation checks `prefers-reduced-motion`, and
  `styles.css` disables transitions wholesale under that query.

### Scrolling, and why it is written the way it is

Scroll used to stutter. Four things caused it, and all four are worth leaving
alone:

1. **No `scroll-snap`.** A page of full-height sections with
   `scroll-snap-type: y proximity` fights the wheel and the trackpad — the
   browser keeps re-targeting mid-gesture. Chapter navigation still works
   through the rail and PageUp/PageDown.
2. **The grid overlay is drawn straight.** `.rails` is a fixed, full-viewport
   layer; giving it `mix-blend-mode` forced the whole page to recomposite on
   every frame of every scroll.
3. **The animation loop runs only while the page moves.** `useDeck` starts a
   rAF loop on scroll and stands down two idle frames later, measures only
   elements currently on screen, and skips a write when the value has not
   changed. `--grow` is quantised to 2% steps because anything finer is
   invisible but still reflows a 100px heading.
4. **No `transition` on `font-size`.** Transitioning a property that triggers
   layout, on the largest type on the page, once per frame, is the most
   expensive thing this site ever did.

Measured over the same 5,000px scroll of `/club`, against the build before
these changes: style recalculations 597 → 296, recalculation time 54ms → 26ms,
layout time 134ms → 15ms.

### Fitting every screen

Full-height sections use `--vh: 100dvh` rather than `100svh`, so they track the
real viewport including mobile browser chrome. There are four breakpoints:

| Query | What changes |
| --- | --- |
| `max-height: 720px` | short laptops and landscape phones: heights become content-driven, block padding tightens |
| `max-width: 1240px` | the chapter rail hides |
| `max-width: 1100px` | stat band, tiers, trust row and partnerships go to two columns |
| `max-width: 900px` | single column; the hero rail becomes a vertical accordion |
| `max-width: 520px` | footer collapses to one column |

Verified with no horizontal overflow and no clipped text at 1920×1080,
1440×900, 1366×768, 1180×820, 834×1112, 768×1024, 430×932, 390×844, 360×640
and 844×390.

- **Content still needing confirmation:** total member count, whether donations
  can be receipted for tax, and the club's URSA ratification status. These are
  marked in the sponsorship copy.

---

## Licence

The club publishes its work under GPL v3, which the site says out loud in two
places. Add a `LICENSE` file with the GPL-3.0 text before making the repository
public so the claim is backed by something.
