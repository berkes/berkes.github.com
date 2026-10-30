#!/usr/bin/env python3
"""De-hardcode absolute self-referencing URLs in posts (migration #141).

Posts link to their own site via absolute http(s)://berk.es/ URLs. Root-
relative URLs render identically under Jekyll and Hugo and keep local/
staging previews working. Also fixes the one doubled
`https://berk.es/https://berk.es/...` link (a cheap bug fix, requirement 5).

Only URLs with a scheme are touched: prose mentions of "berk.es" without
scheme, and escaped-Liquid example code (e.g. the `{{ "..." }}` fragments
in the 2012-11-12 post) are left byte-identical (requirement 6).

Usage: dehardcode_urls.py [POSTS_DIR]
"""
import os
import re
import sys

DOUBLE_RE = re.compile(r'https?://berk\.es/https?://berk\.es/')
ABS_RE = re.compile(r'https?://berk\.es/')


def convert(text: str) -> tuple[str, int]:
    text = DOUBLE_RE.sub('https://berk.es/', text)
    return ABS_RE.sub('/', text), len(DOUBLE_RE.findall(text)) + len(ABS_RE.findall(text))


def main() -> None:
    posts_dir = sys.argv[1] if len(sys.argv) > 1 else 'src/_posts'
    files = 0
    urls = 0
    for name in sorted(os.listdir(posts_dir)):
        path = os.path.join(posts_dir, name)
        if not os.path.isfile(path):
            continue
        with open(path, encoding='utf-8') as fh:
            text = fh.read()
        new_text, count = convert(text)
        if new_text != text:
            with open(path, 'w', encoding='utf-8') as fh:
                fh.write(new_text)
            files += 1
            urls += count
            print(f'{name}: {count} URL(s)')
    print(f'files changed: {files}, URLs rewritten: {urls}')


if __name__ == '__main__':
    main()
