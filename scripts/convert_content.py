#!/usr/bin/env python3
"""Convert the Jekyll source tree into the Hugo content tree (#144).

Copies posts, presentations and pages from src/ into hugo/content/ with
Hugo-compatible structure. Posts keep their filename (Hugo derives the
slug and date from it, same as Jekyll). Front matter is copied verbatim
except:
- `layout: post_archive` and `layout: post` are dropped so Hugo's
  default single template applies (single.html covers both; the archive
  note is driven by the front-matter presence of a `created:` key),
- `layout: "post"` likewise,
- the one-off custom_for_2015-05-09 layout key is dropped (single.html
  renders that post's inline image via its woodcut file).
All other front matter (title, tags, lang, date, created, location) is
copied byte-for-byte; bodies are untouched.

Pages (about.md, over.md, pres.md, error.md, index.md, tags.html,
archive.html, archief.html) are converted from Jekyll/Liquid pages into
Hugo content pages; their Liquid bodies are replaced by the Hugo
templates (list/archive layouts), since the templates own that markup
now.

Usage: convert_content.py
"""
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')
HUGO = os.path.join(ROOT, 'hugo')

POSTS_OUT = os.path.join(HUGO, 'content', 'posts')
PRES_OUT = os.path.join(HUGO, 'content', 'presentations')


def convert_front_matter(raw: str) -> str:
    lines = raw.split('\n')
    out = []
    for line in lines:
        if re.match(r'^layout:\s*["\']?(post|presentation|custom_for_2015-05-09-add-sorting-to-your-product-page-in-spree)["\']?\s*$',
                    line.strip()):
            continue
        out.append(line)
    return '\n'.join(out)


def convert_file(path: str, dest: str, slug: str = None,
                 url: str = None) -> None:
    with open(path, encoding='utf-8') as fh:
        raw = fh.read()
    if raw.startswith('---'):
        end = raw.index('\n---', 3)
        closing = raw.index('\n', end + 4)
        front = raw[:end + 1]          # up to and including newline before ---
        body = raw[closing + 1:]
        front = convert_front_matter(front)
        extras = ''
        if slug:
            extras += f'slug: "{slug}"\n'
        if url:
            extras += f'url: "{url}"\n'
        front = front + extras + raw[end + 1:closing + 1]
        front = re.sub(
            r'^date: (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})(:\d{2})?\s*$',
            lambda m: 'date: %sT%s%s+01:00' % (
                m.group(1), m.group(2), m.group(3) or ':00'),
            front, flags=re.M)
        raw = front + body
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, 'w', encoding='utf-8') as fh:
        fh.write(raw)


def filename_slug(name: str) -> str:
    m = re.match(r'\d{4}-\d{2}-\d{2}-(.+)\.(?:md|markdown)$', name)
    slug = m.group(1) if m else name
    # Jekyll's Jekyll::Utils.slugify collapses runs of non-alphanumerics
    # into single dashes (e.g. 'a---b' -> 'a-b'); Hugo uses slug: verbatim.
    return re.sub(r'-{2,}', '-', slug)


def main() -> None:
    # Posts
    posts_src = os.path.join(SRC, '_posts')
    count = 0
    for name in sorted(os.listdir(posts_src)):
        convert_file(os.path.join(posts_src, name),
                     os.path.join(POSTS_OUT, name),
                     slug=filename_slug(name))
        count += 1
    print(f'posts: {count}')

    # Presentations
    pres_src = os.path.join(SRC, '_presentations')
    count = 0
    for name in sorted(os.listdir(pres_src)):
        base = name[:-3] if name.endswith('.md') else name
        convert_file(os.path.join(pres_src, name),
                     os.path.join(PRES_OUT, name),
                     url=f'/p/{base}.html')
        count += 1
    print(f'presentations: {count}')

    # Top-level pages: Hugo content pages with front matter only; the
    # bodies are template-driven now. Map Jekyll permalink -> Hugo url.
    pages = {
        'about.md': dict(title='About Bèr Kessels', lang='en',
                         layout='page', url='/about.html', body=True),
        'over.md': dict(title='Over Bèr Kessels', lang='nl',
                        layout='page', url='/over.html', body=True),
        'error.md': dict(title='Error', lang=None, layout='page',
                         url='/error.html', body=False),
        'pres.md': dict(title='Presentations by Bèr ‘berkes’ Kessels',
                        lang=None, layout='pres', url='/pres.html',
                        body=False),
    }
    for name, meta in pages.items():
        front = ['---', f'title: "{meta["title"]}"']
        if meta.get('lang'):
            front.append(f'lang: {meta["lang"]}')
        if meta.get('layout'):
            front.append(f'layout: {meta["layout"]}')
        if meta.get('url'):
            front.append(f'url: {meta["url"]}')
        front.append('---\n')
        dest = os.path.join(HUGO, 'content', name)
        body = ''
        if meta.get('body'):
            with open(os.path.join(SRC, name), encoding='utf-8') as fh:
                raw = fh.read()
            end = raw.index('\n---', 3)
            body = raw[raw.index('\n', end + 4) + 1:]
        with open(dest, 'w', encoding='utf-8') as fh:
            fh.write('\n'.join(front) + body)
        print(f'page: {name}')

    # Archive pages (archive.html / archief.html / tags.html): content
    # pages pointing at the archive/tags layouts.
    archives = [
        ('archive.md', 'Archive, English articles', 'en', 'archive',
         '/archive.html'),
        ('archief.md', 'Archief, Nederlandse artikelen', 'nl', 'archive',
         '/archief.html'),
        ('tags.md', 'Tags', None, 'tags', '/tags.html'),
    ]
    for name, title, lang, layout, url in archives:
        front = ['---', f'title: "{title}"']
        if lang:
            front.append(f'lang: {lang}')
        front.append(f'layout: {layout}')
        front.append(f'url: {url}')
        front.append('---\n')
        with open(os.path.join(HUGO, 'content', name), 'w',
                  encoding='utf-8') as fh:
            fh.write('\n'.join(front))
        print(f'page: {name}')


if __name__ == '__main__':
    main()
