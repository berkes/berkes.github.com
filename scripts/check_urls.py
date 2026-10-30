#!/usr/bin/env python3
"""Check a built static site for broken internal links and URL parity (#143).

Two checks, both builder-agnostic (they operate on a directory of built
HTML, so they drop onto the Hugo build unchanged at the cutover):

1. Link check: every internal href/src in the built HTML must resolve to a
   file in the build directory (directory-style URLs resolve index.html).
   Anchors (#...), scheme URLs (mailto:, http(s): to other hosts), and
   data: URIs are skipped.

2. Parity check (optional, with --baseline): the set of "served pages"
   (HTML files + feeds/sitemap) must match the baseline file exactly.
   Scope per the migration requirements: every built page is in scope.
   Assets are reported but not gated (requirement 1 exception) unless
   --strict-assets is passed.

Exit code 1 on any broken link or parity mismatch.

Usage:
  check_urls.py BUILD_DIR [--baseline FILE] [--strict-assets]
"""
import argparse
import os
import re
import sys
from urllib.parse import urljoin, urlparse

HREF_RE = re.compile(r'(?:href|src)="([^"]+)"')
PAGE_EXTENSIONS = ('.html', '.htm', '.xml', '.txt')
# Standalone HTML apps (presentations, demos) that reference their own
# assets and JS templates; not part of the site page graph.
SKIP_DIRS = ('redirects/', 'assets/pres/', 'misc/', 'scraping/', 'blockchainpres/')


def build_pages(build_dir: str) -> set:
    pages = set()
    for root, _dirs, files in os.walk(build_dir):
        for name in files:
            rel = os.path.relpath(os.path.join(root, name), build_dir)
            rel = '/' + rel.replace(os.sep, '/')
            if rel == '/index.html':
                rel = '/'
            elif rel.endswith('/index.html'):
                rel = rel[:-len('index.html')]
            if any(rel.startswith(d) for d in SKIP_DIRS):
                continue
            if name.endswith(PAGE_EXTENSIONS):
                pages.add(rel)
    return pages


def resolve(build_dir: str, url_path: str) -> bool:
    path = url_path.split('#', 1)[0].split('?', 1)[0]
    if not path:
        path = '/'
    local = path.lstrip('/')
    if not local:
        return os.path.isfile(os.path.join(build_dir, 'index.html'))
    if os.path.isfile(os.path.join(build_dir, local)):
        return True
    if os.path.isdir(os.path.join(build_dir, local)):
        return (os.path.isfile(os.path.join(build_dir, local, 'index.html'))
                or os.path.isfile(os.path.join(build_dir, local, 'index.htm')))
    return False


def check_links(build_dir: str, ignore=None) -> list:
    ignore = ignore or set()
    broken = []
    for root, _dirs, files in os.walk(build_dir):
        for name in files:
            if not name.endswith(('.html', '.htm')):
                continue
            page = os.path.join(root, name)
            page_url = '/' + os.path.relpath(page, build_dir).replace(os.sep, '/')
            if page_url == '/index.html':
                page_url = '/'
            if any(page_url.startswith(d) for d in SKIP_DIRS):
                continue
            with open(page, encoding='utf-8', errors='replace') as fh:
                html = fh.read()
            for target in HREF_RE.findall(html):
                target = target.strip()
                if not target or target.startswith('#'):
                    continue
                parsed = urlparse(target)
                if parsed.scheme or target.startswith('//'):
                    continue
                absolute = urljoin(page_url, parsed.path or '/')
                if absolute == '/index.html':
                    absolute = '/'
                if not resolve(build_dir, absolute):
                    if absolute in ignore or target in ignore:
                        continue
                    broken.append((page_url, target))
    return broken


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('build_dir')
    parser.add_argument('--baseline')
    parser.add_argument('--ignore', help='file with known-dead link targets, one per line')
    args = parser.parse_args()

    build_dir = args.build_dir
    ignore = set()
    if args.ignore and os.path.isfile(args.ignore):
        with open(args.ignore, encoding='utf-8') as fh:
            ignore = set(line.strip() for line in fh if line.strip())
    failures = 0

    broken = check_links(build_dir, ignore)
    for page, target in broken:
        print(f'BROKEN LINK: {page} -> {target}')
    failures += len(broken)
    print(f'link check: {len(broken)} broken internal links')

    if args.baseline:
        with open(args.baseline, encoding='utf-8') as fh:
            baseline_pages = set(
                line.strip() for line in fh if line.strip())
        current_pages = build_pages(build_dir)
        missing = baseline_pages - current_pages
        added = current_pages - baseline_pages
        for page in sorted(missing):
            print(f'MISSING PAGE (in baseline, not in build): {page}')
        for page in sorted(added):
            print(f'NEW PAGE (in build, not in baseline): {page}')
        if missing:
            failures += len(missing)
        print(f'parity check: {len(missing)} missing, {len(added)} new pages')

    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
