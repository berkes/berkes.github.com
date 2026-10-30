#!/usr/bin/env python3
"""Convert Jekyll Liquid {% highlight %} blocks to fenced code blocks (#140).

Hugo's Goldmark does not execute Liquid tags; posts keeping them would
render the tags as literal text after the migration. Fenced code blocks
with a language hint are valid CommonMark and render identically in Jekyll
(via rouge) today.

Rules:
- `{% highlight <lang> [startinline] %}` ... `{% endhighlight %}` becomes
  ```<lang> ... ``` (fence length adapts to longer backtick runs inside).
- Whitespace variants ({%highlight X%}, double spaces) are handled.
- `startinline` (a rouge-only php/bash option) is dropped.
- Language names are lowercased (HTML -> html) for consistency; both are
  valid lexers in rouge and Chroma.
- Everything outside the converted blocks is byte-identical (requirement 6).

Usage: convert_highlight_to_fences.py [POSTS_DIR]
"""
import os
import re
import sys

OPEN_RE = re.compile(
    r'\{%-?\s*highlight\s+([A-Za-z0-9_+-]+)(\s+startinline)?\s*-?%\}')
END_RE = re.compile(r'\{%-?\s*endhighlight\s*-?%\}')
FENCE_RE = re.compile(r'^(`{3,})', re.M)


def fence_len(block_body: str) -> int:
    longest = 0
    for match in FENCE_RE.finditer(block_body):
        longest = max(longest, len(match.group(1)))
    return max(3, longest + 1)


def convert_text(text: str) -> str:
    out = []
    pos = 0
    while True:
        open_m = OPEN_RE.search(text, pos)
        if not open_m:
            out.append(text[pos:])
            break
        end_m = END_RE.search(text, open_m.end())
        if not end_m:
            raise ValueError(f'unbalanced highlight block at offset {open_m.start()}')
        lang = open_m.group(1).lower()
        body = text[open_m.end():end_m.start()]
        fence = '`' * fence_len(body)
        out.append(text[pos:open_m.start()])
        out.append(f'{fence}{lang}\n{body.rstrip()}\n{fence}')
        pos = end_m.end()
    return ''.join(out)


def main() -> None:
    posts_dir = sys.argv[1] if len(sys.argv) > 1 else 'src/_posts'
    converted = 0
    for name in sorted(os.listdir(posts_dir)):
        path = os.path.join(posts_dir, name)
        if not os.path.isfile(path):
            continue
        with open(path, encoding='utf-8') as fh:
            text = fh.read()
        if '{%' not in text and '{% ' not in text:
            continue
        if 'highlight' not in text:
            continue
        new_text = convert_text(text)
        if new_text != text:
            with open(path, 'w', encoding='utf-8') as fh:
                fh.write(new_text)
            converted += 1
    print(f'converted files: {converted}')


if __name__ == '__main__':
    main()
