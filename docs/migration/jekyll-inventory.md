# Jekyll feature inventory and migration baseline

Reference document for the Hugo migration (issues #138–#145). This describes
the site as it exists on `main` at the time of writing, so the Hugo port can be
verified against it. All numbers are generated from the source tree.

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
- **Redirect tree**: 1691 `index.md` files under `src/redirects/{en,nl}/` (nl: 659 dirs, en: 10), each `layout: refresh` with `refresh_to_post_id`. 1689 point at a dated post URL (`/YYYY/MM/DD/slug`), 2 point at `/`.
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
| `refresh.html` | Bare HTML with `<meta http-equiv=refresh content="0;url={{ page.refresh_to_post_id }}">` | → Hugo aliases preferred (see redirect strategy) |
| `custom_for_2015-05-09-add-sorting...html` | One-off copy of `post.html` where the woodcut figure shows a feature screenshot (`/images/{{ page.id }}.png`, alt "Example of the feature") instead of a Doré woodcut | Only used by that single post; fold into a post layout variant or an `image` front-matter key (→ #142) |

## Includes (`src/_includes/`)

| Include | Purpose | Notes |
|---|---|---|
| `setup.yml` | Jekyll-Bootstrap: assigns `BASE_PATH`, `HOME_PATH`, `ASSET_PATH` Liquid vars | Every page includes it; pure build-time, no output |
| `image.yml` | Decorative figure: `<img src="/images{{ page.id }}.png">` + localized figcaption (nl/en) | **`page.id` is the post URL path** (e.g. `/2015/05/09/slug`), so the image path is `images/<year>/<month>/<day>/<slug>.png`. **822 of 876 posts have no matching file** → currently renders a broken image on all pre-2015 posts. Hugo port must decide: keep broken behavior, suppress missing images, or backfill (→ #142) |
| `about_author.yml` | Localized "About the author" blurb (nl/en) with Mastodon link | Post pages |
| `about_pres.yml` | "About Bèr" presentations blurb | Presentation layout |
| `comment.yml` | `<template>` blocks + JS that looks up Reddit/HN discussions for the URL at runtime | Requires `assets/javascripts/comment.js`; static-output friendly (client-side fetch) |
| `related.yml` | "Read on" list of 3 `site.related_posts` | Jekyll's LSI-based related posts (`lsi: false` → Jekyll falls back to... nothing? Verify: with `lsi: false`, `related_posts` returns the most recent posts) — **verify during port**, likely "3 latest posts" |
| `li_for_post_with_date.yml` | `<li>` with date + link, used in listings | Trivial |
| `posts_collate.yml` | Groups posts by year/month for archive pages | Port to archive page templates |
| `tags_list.yml` | Tag listing helper | Port to taxonomy template |
| `source.yml` | Localized "Sourcecode on Github" link using `page.path` | Hugo equivalent: GitHub edit/view link params |

## Quirks and known difficulties

- **`<!--break-->`**: 160 posts contain the Drupal-era teaser marker inside content. Jekyll does **not** treat it specially; it leaks into rendered HTML today. Hugo's `<!--more-->` is functional. Decide: convert (changes rendered HTML — acceptable, currently renders as a comment), or strip (→ #142).
- **Epoch `created:`**: 822 posts (→ #139).
- **`{% highlight %}`**: ~80 Liquid highlight blocks + 2 broken Liquid fragments (`{% for posts ... " }}%}`) — must not survive into Hugo (→ #140).
- **`{{BASE_PATH}}`/`ASSET_PATH`/absolute URLs** in 14 posts (→ #141).
- **Mixed extensions** `.md`/`.markdown` — irrelevant to Hugo.
- **BOM** in `humans.txt` and possibly others — preserve byte-exactly in move.
- **`sitemap.txt` excludes `redirects/`** pages; port this filter.
- **Woodcut convention**: image at `images/<yyyy>/<mm>/<dd>/<slug>.png`; **822/876 missing** (the Rakefile scaffold only started creating them ~2015). See #142 for the decision; the Hugo template needs a file-exists check regardless.
- **`layout: "post"`** on one post — quoted YAML value, same layout as `post`.
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
