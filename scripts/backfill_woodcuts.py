#!/usr/bin/env python3
"""Backfill missing decorative woodcut images for posts (#142).

The post layout renders a decorative figure at
images/<yyyy>/<mm>/<dd>/<slug>.png, derived from the post URL. 822 posts
(predominantly pre-2013) never got one because the `rake post` scaffolding
that creates them landed later — their pages render a broken <img> today.

Migration requirement 3: backfill all of them. Like the Rakefile's
`next_image!` helper, images are picked from the Doré woodcut templates in
src/_images_templates/ (portrait/landscape/panorama), cycled
deterministically in post order so no two adjacent posts share an image.
The last_<layout> pointer files are updated to reflect continued usage so
`rake post` continues the cycle without reusing images.

Usage: backfill_woodcuts.py [--dry-run]
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATES_DIR = os.path.join(ROOT, 'src', '_images_templates')
POSTS_DIR = os.path.join(ROOT, 'src', '_posts')
IMAGES_DIR = os.path.join(ROOT, 'src', 'images')

LAYOUTS = ['portrait', 'landscape', 'panorama']


def load_templates() -> list[str]:
    templates = []
    for layout in LAYOUTS:
        files = sorted(
            (f for f in os.listdir(TEMPLATES_DIR)
             if f.startswith(f'{layout}-') and f.endswith('.png')),
            key=lambda f: int(re.search(r'-(\d+)\.png$', f).group(1)))
        templates.extend(os.path.join(TEMPLATES_DIR, f) for f in files)
    return templates


def main() -> None:
    dry_run = '--dry-run' in sys.argv
    templates = load_templates()
    posts = sorted(
        f for f in os.listdir(POSTS_DIR)
        if re.match(r'\d{4}-\d{2}-\d{2}-', f))

    missing = []
    for name in posts:
        m = re.match(r'(\d{4})-(\d{2})-(\d{2})-(.+)\.(?:md|markdown)$', name)
        if not m:
            continue
        rel = os.path.join(m.group(1), m.group(2), m.group(3),
                           f'{m.group(4)}.png')
        if not os.path.isfile(os.path.join(IMAGES_DIR, rel)):
            missing.append(rel)

    created = 0
    for i, rel in enumerate(missing):
        src = templates[i % len(templates)]
        dest = os.path.join(IMAGES_DIR, rel)
        if dry_run:
            print(f'{rel} <- {os.path.basename(src)}')
            continue
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(src, 'rb') as fh:
            data = fh.read()
        with open(dest, 'wb') as fh:
            fh.write(data)
        created += 1

    if not dry_run:
        used = len(missing)
        for layout in LAYOUTS:
            count = len([t for t in templates
                         if os.path.basename(t).startswith(f'{layout}-')])
            pointer = os.path.join(TEMPLATES_DIR, f'last_{layout}')
            with open(pointer) as fh:
                current = int(fh.read().strip() or 0)
            with open(pointer, 'w') as fh:
                fh.write(f'{(current + used) % count or count}\n')

    print(f'{"would create" if dry_run else "created"}: {created}')
    print(f'templates available: {len(templates)}')


if __name__ == '__main__':
    main()
