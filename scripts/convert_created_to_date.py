#!/usr/bin/env python3
"""Convert epoch 'created:' front matter to 'date:' (migration #139).

822 posts store their publication moment as an epoch timestamp in `created:`.
Hugo requires dates; this adds explicit `date:` front matter:

- `date: YYYY-MM-DD` derived from the epoch `created:` value's calendar day
  (Europe/Amsterdam), or from the filename date for posts without `created:`,
- the `created:` key is kept verbatim for provenance,
- `date:` is inserted directly above `created:` (or above the closing `---`
  for posts without it) to keep front matter readable,
- everything else in the file is byte-identical.

Why a date-only value: Jekyll derives a post's URL from the front-matter
date when present, interpreted in UTC. Previously no post had `date:`, so
Jekyll used the filename date at UTC midnight. A date-only `YYYY-MM-DD`
parses as UTC midnight — identical URL and rendered dates. A full local-time
timestamp would shift some posts to the previous UTC day and change their
URLs. Verified: all 822 epoch values fall on the same calendar day as the
filename date (0 mismatches), so the URL day never moves.

Usage: convert_created_to_date.py [POSTS_DIR]
"""
import os
import re
import sys
from datetime import datetime
from zoneinfo import ZoneInfo

AMS = ZoneInfo("Europe/Amsterdam")
CREATED_RE = re.compile(rb'^(created:\s*)(\d{9,11})(\s*)$', re.M)
DATE_LINE_RE = re.compile(rb'^date:', re.M)


def convert(path: str) -> str:
    """Return 'converted', 'from-filename', 'has-date', or 'no-date-possible'."""
    with open(path, 'rb') as fh:
        raw = fh.read()

    if DATE_LINE_RE.search(raw):
        return 'has-date'

    match = CREATED_RE.search(raw)
    if match:
        stamp = datetime.fromtimestamp(int(match.group(2)), AMS)
    else:
        base = os.path.basename(path)
        m = re.match(r'(\d{4})-(\d{2})-(\d{2})-', base)
        if not m:
            return 'no-date-possible'
        stamp = datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)))

    date_line = b'date: ' + stamp.strftime('%Y-%m-%d').encode('ascii') + b'\n'

    if match:
        created_line = match.group(0)
        new_raw = raw.replace(created_line, date_line + created_line, 1)
        label = 'converted'
    else:
        end = raw.index(b'\n---', 3) + 1
        new_raw = raw[:end] + date_line + raw[end:]
        label = 'from-filename'

    if new_raw != raw:
        with open(path, 'wb') as fh:
            fh.write(new_raw)
    return label


def main() -> None:
    posts_dir = sys.argv[1] if len(sys.argv) > 1 else 'src/_posts'
    counts = {}
    for name in sorted(os.listdir(posts_dir)):
        path = os.path.join(posts_dir, name)
        if not os.path.isfile(path):
            continue
        result = convert(path)
        counts[result] = counts.get(result, 0) + 1
        if result not in ('converted', 'from-filename'):
            print(f'  {result}: {name}', file=sys.stderr)
    for key, value in sorted(counts.items()):
        print(f'{key}: {value}')


if __name__ == '__main__':
    main()
