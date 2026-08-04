# Project BioDrone — website

Website for Project BioDrone, a STEAM Centre design project by Sid, Raaghav &amp; Ronan.

## Structure

- `index.html` — home page: hero, the design, key components, interactive drop-height simulator, comparison, applications, risk assessment
- `about.html` — team, our process (interactive timeline), why we built it, future improvements, and roadmap
- `style.css` — all styling, design tokens, and animations
- `script.js` — nav behaviour, scroll reveals, the drop-height simulator, accordion, and timeline scroll-fill

## Before you publish

A few placeholders need your input — search for `edit-note` / `edit me` in `about.html`:

- Team bios (one line each for Sid, Raaghav, Ronan)
- The personal "why we built this" quote
- Roadmap target dates and any real partner org

## Deploying with GitHub Pages

1. Push these files to the root of your repo.
2. On GitHub, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch".
4. Pick your branch (e.g. `main`) and folder (`/`), then save.
5. Your site will be live at `https://<username>.github.io/` (or `.../<repo-name>/`) within a few minutes.

## Local preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.
