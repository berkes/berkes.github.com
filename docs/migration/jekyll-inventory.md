# Jekyll feature inventory and migration baseline

Reference document for the Hugo migration (issues #138–#145). This describes
the site as it exists on `main` at the time of writing, so the Hugo port can be
verified against it. All numbers are generated from the source tree.

## Migration requirements (decided by the site owner)

These requirements govern all migration tasks; where they conflict with
"faithful reproduction", the requirements win:

1. **Permalinks must remain identical.** Where a permalink genuinely cannot be
   kept, the old URL must redirect (HTTP or meta-refresh) to the new one.
   **Exception:** asset URLs (images, files linked from posts) do *not* need
   to be preserved.
2. **The legacy redirect tree is dropped.** The 1691 `src/redirects/` pages are
   not ported, aliased, or reproduced. The traffic they carry is deemed
   insignificant. They remain listed in the URL inventory for reference, but
   they are *not* part of the parity requirement.
3. **Broken woodcut images must be backfilled.** The 822 posts that lack their
   `images/<yyyy>/<mm>/<dd>/<slug>.png` file get one (→ #142 or cutover); the
   Hugo template may still guard with a file-exists check.
4. **"Related posts" is re-implemented, not reproduced.** Hugo related-content
   (keyword/taxonomy based) or a similar mechanism is fine; it is explicitly
   acceptable that "related" changes for all older posts.
5. **Existing bugs are not sacred.** Broken things (dead internal links,
   rendering artifacts) do not need to be fixed in Jekyll, but where a fix is
   cheap we do it — and we certainly do not *reproduce* bugs in the new
   environment. Same for obvious inconsistencies (typos in markup or
   template output, wrongly quoted attributes, etc.).
6. **Content is untouched.** Typos in content, titles, tags, and slugs must
   remain as-is. No copy-editing during the migration.

## Configuration (`src/_config.yml`)

| Setting | Value | Hugo counterpart / note |
|---|---|---|
| permalink | `/:categories/:year/:month/:day/:title/` | `:categories` is **always empty** in practice (no post has category front matter; the 12 files matching "categories" are prose mentions). Effective scheme: `/:year/:month/:day/:title/`. Hugo: `permalinks: posts: '/:year/:month/:day/:slug/'` |
| markdown | kramdown, `highlighter: rouge` | Goldmark + Chroma |
| timezone | `Europe/Amsterdam` | `timeZone` |
| `future: TRUE` | posts/presentations dated in the future build | `buildFuture: true` — required for presentations announced in advance |
| destination | `./build` (relative to repo root) | `publishDir` |
| production_url | `https://berk.es` | `baseURL` |
| collections | `presentations`: output, sort_by date, permalink `/p/:name.html` | Hugo content section `presentations` with `url: /p/:slug.html` |
| `JB.*` hash | Jekyll-Bootstrap legacy: `BASE_PATH` (`https://berk.es`), `ASSET_PATH` (`/assets`), page paths, comments/sharing `provider: false` | All resolvable at build time; layouts use these heavily |

## Content inventory

- **876 posts** in `src/_posts`, spanning 2001–2024. Mixed extensions: `.md` and `.markdown`. All have a filename date; 0 posts have a `date:` front-matter key, 822 have epoch `created:` (→ #139).
- **Layout front matter in posts**: 822 × `post_archive`, 52 × `post`, 1 × `"post"`, 1 × `custom_for_2015-05-09-add-sorting-to-your-product-page-in-spree` (a one-off layout, see below).
- **8 presentations** in `src/_presentations` (layout `presentation`), one dated 2025-02-25 → requires `future`.
- **1 draft** in `src/_drafts` (not built).
- **Top-level pages** (all in `src/`): `index.md` (home), `about.md` → `/about.html`, `over.md` → `/over.html`, `pres.md` → `/pres.html`, `error.md` → `/error.html`, `tags.html` → `/tags.html`, `archive.html` (en) → `/archive.html`, `archief.html` (nl) → `/archief.html`.
- **Static files**: `robots.txt`, `humans.txt` (has a BOM), `favicon.ico`, `googlec7090456eac8ff46.html` (Google site verification, raw file), `berkes_pub.gpg`.
- **Redirect tree**: 1691 `index.md` files under `src/redirects/{en,nl}/` (nl: 659 dirs, en: 10), each `layout: refresh` with `refresh_to_post_id`. 1689 point at a dated post URL (`/YYYY/MM/DD/slug`), 2 point at `/`. **Dropped at migration per requirement 2** — not ported, no aliases.
- **Feeds/sitemaps**: `atom.xml` (Atom, latest 100 posts, full content), `sitemap.txt` (plain text, one absolute URL per line for all pages + posts, excluding `redirects/`).
- **Assets**: `src/assets/{images,javascripts,stylesheets}` (Foundation-era CSS: `foundation.css`, `app.css`, `pygments.css`; JS: jquery, modernizr, foundation, `app.js`, `comment.js`), `src/images/` (post images, year/month/day trees + `inline/`), `src/assets/pres/` (per-presentation HTML exports).
- **Special dirs**: `src/scraping/` (standalone reveal.js demo page), `src/blockchainpres/` (standalone `index.html`), `src/_images_templates/` (woodcut source images for the `rake post` scaffold), `src/_migrators/` (obsolete Drupal/`downmark_it` importers, unused).

## Layouts (`src/_layouts/`)

| Layout | Purpose | Notes for Hugo port |
|---|---|---|
| `default.html` | Base HTML: `<html lang>` derived from `page.lang` (defaults `en`), header/nav (About, Articles, Over, Artikelen, Presentations), footer (contact, CC-BY-SA 3.0, archive links, RSS), stylesheet/script/font includes via `ASSET_PATH`, canonical via `site.url`, feedburner `<link>` | Straightforward baseof port; `lang` per page |
| `page.html` | Two-column page with Bèr's portrait figure (`/images/inline/ber_kessels.png`, localized caption) | `about.md`, `over.md` |
| `post.html` | Single post: title, body (8/4 columns), woodcut figure include (4 columns), footer with date (`date_to_long_string`), tags, source link to GitHub, then `about_author`, comment template, `related` (3 posts) | Used by 53 posts |
| `post_archive.html` | Same as post + "published on webschuur.com, migrated" note; no comment block; `location` front matter if present | Used by 822 posts |
| `presentation.html` | Title, "Presented on" date, body; then `about_pres` include | Collection items |
| `presentations.html` | Overview page with portrait figure, lists all presentations reversed | `pres.md` |
| `refresh.html` | Bare HTML with `<meta http-equiv=refresh content="0;url={{ page.refresh_to_post_id }}">` | **Obsolete per requirement 2**: the redirect tree is dropped; keep a redirect/alias mechanism only for permalink changes (requirement 1) |
| `custom_for_2015-05-09-add-sorting...html` | One-off copy of `post.html` where the woodcut figure shows a feature screenshot (`/images/{{ page.id }}.png`, alt "Example of the feature") instead of a Doré woodcut | Only used by that single post; fold into a post layout variant or an `image` front-matter key (→ #142) |

## Includes (`src/_includes/`)

| Include | Purpose | Notes |
|---|---|---|
| `setup.yml` | Jekyll-Bootstrap: assigns `BASE_PATH`, `HOME_PATH`, `ASSET_PATH` Liquid vars | Every page includes it; pure build-time, no output |
| `image.yml` | Decorative figure: `<img src="/images{{ page.id }}.png">` + localized figcaption (nl/en) | **`page.id` is the post URL path** (e.g. `/2015/05/09/slug`), so the image path is `images/<year>/<month>/<day>/<slug>.png`. **822 of 876 posts had no matching file** → rendered a broken image on all pre-2013 posts. **Backfilled in #142** (deterministic round-robin over the `_images_templates` woodcuts); the Hugo template still guards with a file-exists check |
| `about_author.yml` | Localized "About the author" blurb (nl/en) with Mastodon link | Post pages |
| `about_pres.yml` | "About Bèr" presentations blurb | Presentation layout |
| `comment.yml` | `<template>` blocks + JS that looks up Reddit/HN discussions for the URL at runtime | Requires `assets/javascripts/comment.js`; static-output friendly (client-side fetch) |
| `related.yml` | "Read on" list of 3 `site.related_posts` | Jekyll's related posts with `lsi: false` falls back to recent posts. **Re-implemented, not reproduced (requirement 4):** use Hugo related content or taxonomy matching; different "related" output for old posts is acceptable |
| `li_for_post_with_date.yml` | `<li>` with date + link, used in listings | Trivial |
| `posts_collate.yml` | Groups posts by year/month for archive pages | Port to archive page templates |
| `tags_list.yml` | Tag listing helper | Port to taxonomy template |
| `source.yml` | Localized "Sourcecode on Github" link using `page.path` | Hugo equivalent: GitHub edit/view link params |

## Quirks and known difficulties

- **`<!--break-->`**: 160 posts contained the Drupal-era teaser marker inside content, which Jekyll does not treat specially — it leaked into rendered HTML as a literal comment. **Converted to `<!--more-->` in #142** (161 markers): the artifact is gone from rendered output and the excerpt becomes functional in Hugo.
- **Epoch `created:`**: 822 posts (→ #139).
- **`{% highlight %}`**: ~80 Liquid highlight blocks + 2 broken Liquid fragments (`{% for posts ... " }}%}`) — must not survive into Hugo (→ #140).
- **`{{BASE_PATH}}`/`ASSET_PATH`/absolute URLs** in 14 posts (→ #141).
- **Mixed extensions** `.md`/`.markdown` — irrelevant to Hugo.
- **BOM** in `humans.txt` and possibly others — preserve byte-exactly in move.
- **`sitemap.txt` excludes `redirects/`** pages; port this filter.
- **Woodcut convention**: image at `images/<yyyy>/<mm>/<dd>/<slug>.png`; 822/876 were missing (the Rakefile scaffold only started creating them ~2013). **Backfilled in #142**; every post now has one. `lang` coverage: already 876/876 — no gaps existed, nothing to fill.
- **Dead internal links**: the URL inventory shows old Drupal-era paths (`/taxonomy/term/*`, `/aggregator/*`, literal `/[\S]*` artifacts) referenced from post content. Broken today; not required to be fixed (requirement 5: they are not cheap to fix, so content stays as-is). Explicitly excluded from the parity requirement.
- **`layout: "post"`** on one post — quoted YAML value, same layout as `post`.
- **Asset URLs** (images etc.) referenced from posts do not need identical paths after migration (requirement 1 exception). Keeping them stable is still the zero-effort default; only change if the Hugo structure forces it.
- **feedburner**: `<link>` header on every page references `feeds.feedburner.com/berkes`; also footer "RSS" link. The actual feed is `/atom.xml`. Decide whether to keep feedburner URLs at cutover.
- **`site.time`** used in footer ("Copyright 2001-{{ site.time | date: '%Y' }}") — build-timestamp dependent, fine in Hugo.
- **`googlec7090456eac8ff46.html`** contains the string `googlec7090456eac8ff46.html0` (odd, but it is what it is — copy verbatim).
- **`_migrators/`, `_images_templates/`** only referenced by the legacy Rakefile `rake post` scaffold (`next_image!` picks from `_images_templates`) — decide keep/replace/drop at cutover (#145).

## Build, tooling, and tests (as of this writing)

- **Build**: `just build` → Docker (`docker.io/berkes/jekyll:latest`, Ruby 3.2/alpine, entrypoint `bundle exec rake`) runs `bundle install && bundle exec rake build` → `jekyll build --future` into `./build`. (Gem install in-container since #148.)
- **Rakefile tasks**: `rake post` (scaffold + woodcut copy), `rake preview` (`jekyll serve --future --watch`), `rake tags:graph`, `rake tags:remove`, `rake build`, `rake publish` (build + S3 sync — legacy, deploy now via webhook).
- **CI** (`.github/workflows/build.yml`, "Test and deploy"): on PR and push to `main` → `just test` (builds site, serves on :8000, runs Cypress headless). On `main` additionally triggers the statichost.eu build webhook. `docker-image.yml` builds/pushes the Jekyll image; "Dependabot Updates" is the scheduled dependency updater.
- **Cypress suite** (`tests/`, upgraded to Cypress 16 in #150): 13 spec files covering about, archive, code, homepage, images, language, mastodon, navigation, posts, presentations, responsive, tags + visual regression (homepage/archive/tags vs committed snapshots in `tests/cypress/snapshots/`). Baselines can be regenerated with `just update-visual-diffs` (uses `--expose updateSnapshots=true` under Cypress 16). **These committed baselines are part of the known-good reference** for the cutover review.
- **Deploys**: push to `main` → statichost.eu webhook → hosts https://berk.es.

## Baseline build and URL inventory

The frozen baseline is produced by CI on every push to `main` (and on this
branch): the "Test and deploy" workflow builds the site and the workflow
`baseline.yml` (added with this issue) uploads:

- `site.zip` — the complete built site (HTML + assets) from the current `main`.
- `urls.txt` — every URL the site serves: all `href` targets extracted from
  the built HTML (made absolute against `https://berk.es`, deduplicated,
  sorted) plus every entry of the built `sitemap.txt`.

Both are downloadable from the "Baseline build + URL inventory" workflow run
on `main`. The URL list is the parity input for #143 (CI link check) and the
acceptance criterion for the cutover (#145): every URL in `urls.txt` that is
not an explicit, listed exception must resolve in the Hugo build.

**Parity scope per the requirements:** served pages (post URLs, top-level
pages, feeds, sitemap) are in scope for parity; `redirects/` stubs
(requirement 2) and asset URLs (requirement 1 exception) are explicitly out of
scope. Dead content-referenced links (Drupal-era paths) are recorded but also
excluded (requirement 5).
