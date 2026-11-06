# berk.es

The personal site of Bèr ‘berkes’ Kessels. A static site, built with
[Hugo](https://gohugo.io) (config: `hugo/hugo.yaml`), tested with
[Cypress](https://cypress.io), deployed by [statichost.eu](https://statichost.eu)
whenever `main` passes CI.

## Daily operations

### Requirements

- [Hugo extended](https://gohugo.io/installation/) ≥ 0.169 on `PATH`
  (e.g. `pip install hugo`, `brew install hugo`, or a release tarball)
- Node/npm for the test suite (`cd tests && npm ci`, or just `just test`
  which handles it)
- `just` — [github.com/casey/just](https://github.com/casey/just)

### Creating a new post

1. Create `hugo/content/posts/YYYY-MM-DD-<slug>.md` — the filename's date
   and slug determine the URL: `/:year/:month/:day/:slug/`. You can
   scaffold the file with front matter pre-filled:
   `hugo new --source hugo posts/$(date +%F)-my-slug.md` (based on
   `hugo/archetypes/`; new files start as `draft: true` — remove that
   line when the post is ready to publish).
   The slug must be lowercase with single dashes (Hugo uses it verbatim,
   unlike the old Jekyll which collapsed dash-runs).
2. Front matter:

   ```yaml
   ---
   title: "Your title"
   date: 2026-01-01
   lang: en        # or nl — drives the About-author text and archive
   tags: [foo, bar] # optional
   slug: "your-slug" # optional; defaults to the filename slug
   ---
   ```

   For migrated-era posts, `layout: post_archive` adds the "this article
   appeared on webschuur.com" note; don't use it for new writing.
3. Optional woodcut: drop `hugo/static-content/images/:year/:month/:day/:slug.png`.
   If the file exists the layout renders it as the decorative figure;
   without it, no image is rendered.
4. `just serve` → check `http://127.0.0.1:1313/…` (Hugo's default; `just serve --port 8000` for :8000).

### Adding a presentation

1. Create `hugo/content/presentations/<name>.md` — or scaffold it with
   `hugo new --source hugo presentations/my-talk.md` — with:

   ```yaml
   ---
   title: "Talk title"
   date: 2026-01-01
   location: "Conference, City"
   lang: en
   url: "/p/<name>.html"   # the URL is /p/<name>.html — set it explicitly
   ---
   ```

   The `url:` front matter is what puts it at `/p/<name>.html`; the
   presentations overview at `/pres.html` lists it automatically
   (newest first). Future-dated presentations appear because
   `buildFuture: true` is set.
2. Slides, exports and other files: `hugo/static-content/` mirrors the
   site root — e.g. `hugo/static-content/blockchainpres/` is served at
   `/blockchainpres/`.

### just commands

Run `just` alone to list them. Recipes:

| Command | What it does | When to use it |
|---|---|---|
| `just build` | Build the site into `hugo/build/` | To produce the static output (deploys use statichost.eu, not this) |
| `just serve` | Preview the site with `hugo server` (flags pass through, e.g. `--port 8000`) | To click through the site locally |
| `just test` | Run the full Cypress suite headless against `hugo server` on :8000 | Before every push; CI runs this on PRs and main |
| `just install` | Install test dependencies (`tests/node_modules`) | Rarely; `test` runs it automatically |

## Repository layout

```
hugo/
  hugo.yaml          # site config
  content/           # posts/, presentations/ and the top-level pages
  layouts/           # templates (port of the old Jekyll layouts)
  static-content/     # images, assets, legacy standalone pages (served at /)
tests/               # Cypress e2e suite + visual baselines
docs/
  known-dead-links.txt  # known-dead links, intentionally unfixed
  archive/              # historical migration documents
.github/workflows/  # CI: test on PRs, test+deploy webhook on main
```

## CI and deployment

`Test and deploy` runs `just test` on every PR and push. On `main` it
additionally triggers the statichost.eu build webhook; statichost
builds with Hugo (its build config is set in the statichost.eu
dashboard) and serves the result at [berk.es](https://berk.es).

## Dark mode

The site follows the system color scheme (`prefers-color-scheme`) via
pure CSS - no toggle, no JS. The palette lives in `app.css` (`:root`
variables); `dark.css` reassigns them in one
`@media (prefers-color-scheme: dark)` block, plus the light-on-dark
artwork variants (`logo-dark.png`, `swallow_light_hr.png`,
`pointing_hand_light.png`). Code blocks are always dark (pygments).
The logo swaps via a `<picture>` element in the base layout.

## Known dead links

Old posts contain linkrot (mostly 2000s-era external links). These are
documented, not fixed: see `docs/known-dead-links.txt`. If a dead-link
report matches an entry there, it is not a new problem.
