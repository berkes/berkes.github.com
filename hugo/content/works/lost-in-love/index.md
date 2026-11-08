---
title: "Lost in Love"
date: 2025-02-09
summary: "A web application where you create and share a unique maze for you and your love"
lang: en
selected: true
tags:
  - webapp
  - javascript
  - game
  - valentines
params:
  sourcecode: https://github.com/berkes/lost-in-love
  image: maze.png
---

![Screenshot of Lost in Love](screenshot.png)

Lost in Love is a web application where you create and share a unique maze generated from two names.

<a class="button large radius white" href="https://love.berk.es" target="_blank">See the app (love.berk.es)</a>

## Conceptual Idea

Lost in Love explores the idea of connection and uniqueness in relationships. By using two names as the seed for randomness, each couple gets their own distinct maze—a visual metaphor for navigating love together. The maze is both shared (created from both names) and unique (no other combination will produce the same result).

## Inspiration

In a gallery in London, I came across gorgeous screenprints by [Ricky Byrne](https://rbyrneart.com/). I loved their use of color and hand-produced feel—the attention to color, layout, and tension. This inspired me to experiment with maze generation algorithms.

In the process, I decided to make it a web app for Valentine's Day, so everyone could create their own maze. I ported the code to run on the web and turned it into a small web-app.

## Algorithm

The names you provide are used to generate "pseudo randomness". If, in the code, I e.g. ask to "pick a random neighbor", it will always
pick the same one for "romeo & juliet" but it would pick a different one than for "anne & bob".

This is fed into a maze generation algorithm using [recursive backtracking](https://www.youtube.com/results?search_query=maze+recursive+backtracking+coding+train). Basically, looping through the following steps:

- Pick a random cell
- Pick a random neighbor
- If the neighbor is unvisited, remove the wall between them and mark it as visited
- Repeat until all cells are visited

Random colors are chosen for the walls and background.

I deliberately chose to animate the maze generation to show the process. It's slow, but I think it's interesting to watch it carve out your maze in real-time.

## Technology

* [Nannou](https://nannou.cc) (Rust) for the original maze generation experiments
* p5.js for the web version
* Recursive backtracking algorithm for maze generation
