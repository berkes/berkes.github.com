---
layout: post
title: ! 'Case Study: blind reading'
created: 1086891299
tags:
- Cases
lang: en
---
I did a small casestudy to prove that drupal is very "blind friendly"

reading: 
http://drupal.org/about
with command:
lynx -dump http://drupal.org/about | head -n 20  - | text2wave -scale 0.8 -F 80000 | oggenc -q 2 -r - > tmp/about_drupal.ogg

<a href="/files/about_drupal.ogg">about_drupal.ogg</a>

and 
http://www.amazon.co.uk
with command:
lynx -dump http://www.amazon.com | head -n 20  - | text2wave -scale 0.8 -F 80000 | oggenc -q 2 -r - > tmp/amazon_home.ogg
<a href="/files/amazon_home.ogg">amazon_home.ogg</a>
