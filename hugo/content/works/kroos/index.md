---
title: "kroos"
date: 2025-07-04
summary: "Animated simulation of frogs swimming through duckweed, leaving organic paths"
lang: en
selected: true
params:
  image: kroos.png
  deferred_js: kroos.js
---

kroos is a generative art piece that simulates the natural patterns created by small frogs swimming through a pond covered in duckweed.

{{< video src=./kroos.mp4 >}}

Kroos is an animated generative artwork that creates organic, flowing patterns through simple behavioral rules. The piece simulates a pond filled with thousands of duckweed leaves and multiple frogs that navigate through them, leaving visible trails as they displace the vegetation.

## Conceptual Idea

The work explores emergence. How complex, beautiful patterns arise from simple rules. Each frog follows a basic algorithm: move toward a goal while preferring paths with less duckweed. This simple behavior, multiplied across many agents, creates intricate, organic pathways that feel natural and alive.

## Inspiration

The inspiration came from observing a pond where little frogs swim through duckweed (kroos in Dutch). As they move, they push the duckweed aside, creating visible paths. Interestingly, the frogs tend to follow these existing paths rather than forge new ones, creating a feedback loop where paths become more defined over time.

This behavior creates beautiful, organic patterns—networks of clear water cutting through the green carpet of duckweed, constantly shifting but following familiar routes.

## Algorithm

Each frog navigates by sampling three points ahead (left, forward, right) and choosing the direction with the least duckweed.

As frogs move, they physically displace leaves, pushing them aside. The leaves themselves have simple physics: they move away from each other to avoid overlap. A frog pushes away leaves and those leaves then push away others.

Frogs travel between random points on the pond's edge, and when they reach their goal, they pick a new destination and continue swimming. This endless movement gradually carves out an evolving network of paths through the duckweed.

The piece supports different distribution patterns: random frogs from all edges, single-origin (all starting from one point), web (creating a geometric network), and opposite (mirrored crossings).

## Technology and tools

* <a href="https://github.com/mattdesl/canvas-sketch">canvas-sketch</a> as framework for animation and drawing.
* <a href="https://www.pattvira.com/coding-tutorials/v/quadtree-1">Quadtree algorithm</a> for spatial optimization.
* Vector mathematics for movement and physics.


## Live playground

<button id="control-play" class="button">Play</button>
<canvas id="playground-canvas">
</canvas>
