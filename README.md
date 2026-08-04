# My GitHub Site

A basic static website ready to deploy with GitHub Pages.

## Structure

- `index.html` — main page
- `style.css` — styling
- `script.js` — JavaScript

## Deploying with GitHub Pages

1. Push these files to the root of your repo (or a `docs/` folder — your choice).
2. On GitHub, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch".
4. Pick your branch (e.g. `main`) and folder (`/` or `/docs`), then save.
5. Your site will be live at `https://<username>.github.io/<repo-name>/` within a few minutes.

## Local preview

Just open `index.html` in a browser, or run a simple local server:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.
