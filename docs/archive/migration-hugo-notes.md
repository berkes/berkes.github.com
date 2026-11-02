# Hugo migration notes (#144, #145)

The site is built with Hugo since the cutover (#145); the Jekyll source
tree (`src/`), its Docker image and the migration scripts are retired.

## Layout of the port

- `hugo/hugo.yaml` — config. Key decisions:
  - `permalinks: posts: '/:year/:month/:day/:slug/'` plus an explicit
    `slug:` (from the post filename, Jekyll's slugify with collapsed
    dash-runs) per post — required because Hugo derives `:slug` from the
    title by default, which does not match Jekyll's filename-based URLs.
  - `staticDir: static-content` — images, assets, legacy standalone HTML
    (presentations exports, demos) copied verbatim from `src/`.
  - `buildFuture: true` (presentations announced in advance).
  - `disableKinds: taxonomy, term, RSS, section, sitemap, 404` — tags and
    archives are custom pages (see below); sections and the XML sitemap
    are not part of the Jekyll site.
  - custom home outputs: `atom.xml` (Atom feed, 100 entries, full
    content) and `sitemap.txt` (one absolute URL per line for pages +
    posts), matching the Jekyll templates.
  - `markup.goldmark.renderer.unsafe: true` — posts contain inline HTML,
    as kramdown passed through.
- `hugo/content/` — the content tree (converted once from the Jekyll
  source during the migration; now the authoring location):
  - `posts/` — 876 posts, filename-identical, `slug:` + (presentations)
    `url:` front matter added, `layout: post`/`presentation`/custom
    dropped, `layout: post_archive` kept (routes to
    `layouts/posts/post_archive.html`), Jekyll `date: YYYY-MM-DD HH:MM`
    normalized to ISO-8601.
  - `presentations/` — 9 presentations with `url: /p/<name>.html`.
  - top-level pages `about.md` (layout `page`), `over.md`, `error.md`,
    `pres.md` (presentations list), `archive.md`/`archief.md` (layout
    `archive`, lang-filtered collated lists), `tags.md` (layout `tags`).
- `hugo/layouts/` — ports of the 8 Jekyll layouts + partials for the 10
  includes. Notable:
  - `woodcut.html` — the Doré figure with a `fileExists` guard (the
    Jekyll bug where 822 posts rendered a broken image cannot recur).
  - `related.html` — re-implemented (requirement 4): tag-overlap match
    over all posts, first 3. Not Jekyll's recent-posts fallback; output
    differs on old posts by design.
  - `tags.html` — all tags with >1 post, with `#<tag>-ref` anchors as
    the Jekyll tags page had.
  - `archive.html` — lang-filtered (en/nl) year/month collation. The
    Jekyll version grouped items under sometimes-misaligned month
    headers (its `post.previous.date` logic); Hugo groups correctly —
    accepted improvement (requirement 5), archive visual baseline will
    need regeneration + review at cutover.
  - `comment.html` — Discu comment templates ported verbatim.

## Verification status

- `just check` (URL parity + link check): **0 missing, 0 new pages;
  0 broken links** against `docs/migration/url-parity-baseline.txt`.
- `just test` runs the full Cypress suite against the Hugo build,
  including the visual regression gates against the reviewed baselines.

## Recipes

- `just build` — build into `hugo/build/`.
- `just check` — build + URL parity/link check.
- `just serve` — serve `hugo/build` on :8000.
- `just test` — build + Cypress suite against the Hugo build.
- `just update-visual-diffs` — regenerate the visual baselines.

## Cutover state (#145)

- `just build`/`just test`/`just check`/`just update-visual-diffs` build
  and verify the Hugo site; CI (Test and deploy) uses the same recipes.
- `src/` (Jekyll source), `src/redirects/` (requirement 2 — not ported),
  the Jekyll Docker image + its workflow, and the one-off migration
  scripts are deleted. Authoring now happens in `hugo/content/`.
- Visual baselines are the reviewed Hugo renders, at the default
  snapshots path; regenerate with `just update-visual-diffs`.
- The URL parity gate still runs against the frozen baseline from the
  Jekyll era (docs/migration/url-parity-baseline.txt).
