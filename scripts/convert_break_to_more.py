#!/usr/bin/env python3
"""Convert Drupal-era <!--break--> teaser markers to <!--more--> (#142).

160 posts contain <!--break-->, a Drupal teaser marker Jekyll does not
treat specially — it leaked into the rendered HTML as a comment. Hugo's
excerpt separator is <!--more-->, which CommonMark renders away (like
any HTML comment) and Hugo consumes. This is a cheap bug fix per
migration requirement 5: the artifact disappears from output and the
excerpt becomes functional.

Every occurrence is replaced 1:1; nothing else changes (requirement 6).

Usage: convert_break_to_more.py [POSTS_DIR]
"""
import os
import sys

OLD = '<!--break-->'
NEW = '<!--more-->'


def main() -> None:
    posts_dir = sys.argv[1] if len(sys.argv) > 1 else 'src/_posts'
    files = 0
    occurrences = 0
    for name in sorted(os.listdir(posts_dir)):
        path = os.path.join(posts_dir, name)
        if not os.path.isfile(path):
            continue
        with open(path, encoding='utf-8') as fh:
            text = fh.read()
        count = text.count(OLD)
        if not count:
            continue
        with open(path, 'w', encoding='utf-8') as fh:
            fh.write(text.replace(OLD, NEW))
        files += 1
        occurrences += count
    print(f'files: {files}, markers: {occurrences}')


if __name__ == '__main__':
    main()
