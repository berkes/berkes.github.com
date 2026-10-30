#!/usr/bin/env python3
"""Extract the URL inventory from a built static site.

Part of the Hugo migration baseline (#138). Collects:
- every absolute URL in build/sitemap.txt (as built),
- every link target found in href attributes of the built HTML,
- every page/image/asset path that exists in the build output,

normalizes them to absolute URLs against the site base URL, and prints a
sorted, deduplicated list. This is the parity input for the link-check CI
(#143) and the cutover acceptance (#145).
"""
import os
import re
import sys
from urllib.parse import urljoin

HREF_RE = re.compile(r'href="([^"]+)"')
SRC_RE = re.compile(r'src="([^"]+)"')
EXTENSIONS = ('.html', '.htm', '.xml', '.txt', '.gpg', '.ico', '.png', '.jpg',
              '.jpeg', '.gif', '.webp', '.css', '.js', '.json', '.svg')


def normalize(build_dir: str, base_url: str) -> set:
    urls = set()

    sitemap = os.path.join(build_dir, 'sitemap.txt')
    if os.path.isfile(sitemap):
        with open(sitemap, encoding='utf-8') as fh:
            for line in fh:
                line = line.strip()
                if line:
                    urls.add(urljoin(base_url, line))

    for root, _dirs, files in os.walk(build_dir):
        for name in files:
            path = os.path.join(root, name)
            rel = os.path.relpath(path, build_dir)
            if name.endswith(EXTENSIONS):
                if rel.endswith('index.html'):
                    rel = rel[:-len('index.html')] or './'
                urls.add(urljoin(base_url, '/' + rel.replace(os.sep, '/')))
            if name.endswith(('.html', '.htm')):
                with open(path, encoding='utf-8', errors='replace') as fh:
                    html = fh.read()
                page_url = base_url + '/' + rel.replace(os.sep, '/')
                for match in HREF_RE.findall(html) + SRC_RE.findall(html):
                    match = match.strip()
                    if not match or match.startswith('#'):
                        continue
                    if match.startswith(('mailto:', 'data:', 'tel:', 'javascript:')):
                        continue
                    urls.add(urljoin(page_url, match))

    urls.discard(base_url + '/')
    urls.discard(base_url + '/./')
    return urls


def main() -> None:
    if len(sys.argv) != 3:
        print(f'usage: {sys.argv[0]} BUILD_DIR BASE_URL', file=sys.stderr)
        sys.exit(1)
    build_dir, base_url = sys.argv[1], sys.argv[2].rstrip('/')
    for url in sorted(normalize(build_dir, base_url)):
        print(url)


if __name__ == '__main__':
    main()
