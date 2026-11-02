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
   and slug determine the URL: `/:year/:month/:day/:slug/`.
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
4. `just build && just serve` → check `http://127.0.0.1:8000/…`.

### Adding a presentation

1. Create `hugo/content/presentations/<name>.md` with:

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
| `just build` | Build the site into `hugo/build/` | After content/layout changes; always before serve/test |
| `just serve` | Serve `hugo/build/` at :8000 | To click through the built site locally |
| `just test` | Build + run the full Cypress suite headless against the build | Before every push; CI runs this on PRs and main |
| `just update-visual-diffs` | Build + regenerate the visual regression baselines | Only after an *intentional* visual change (see below) |
| `just install` | Install test dependencies (`tests/node_modules`) | Rarely; `test` runs it automatically |

### Updating e2e snapshots

The visual regression tests (`tests/cypress/e2e/visual_regression.cy.js`)
screenshot the homepage, archive and tags pages and compare against the
committed baselines in `tests/cypress/snapshots/`.

When you *intentionally* changed the rendering of one of those pages:

1. Run `just update-visual-diffs`.
2. **Review the regenerated `.snap.png` files** — open them next to the
   served site (`just serve`) and eyeball the change. Never blind-commit:
   a regenerated baseline that "fixes" a test could be rubber-stamping
   a regression.
3. Commit the new `.snap.png` files *together with* the change that
   caused them, so the diff tells one story.

Triage tips from `__diff_output__/` (produced on failure):
- Layout-shaped red blocks (missing/extra sections) → regression, fix
  the site.
- Antialiasing speckle or reordering of equal content → safe to update
  baselines.

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

## Known dead links

Old posts contain linkrot (mostly 2000s-era external links). These are
documented, not fixed: see `docs/known-dead-links.txt`. If a dead-link
report matches an entry there, it is not a new problem.
