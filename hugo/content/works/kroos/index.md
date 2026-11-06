---
title: "kroos"
date: 2025-07-04
summary: "Animated simulation of frogs swimming through duckweed, leaving organic paths"
lang: en
selected: true
params:
  image: kroos.png
---

kroos is a generative art piece that simulates the natural patterns created by small frogs swimming through a pond covered in duckweed.

{{< video src=./kroos.mp4 >}}

## What is it?

kroos is an animated generative artwork that creates organic, flowing patterns through simple behavioral rules. The piece simulates a pond filled with thousands of duckweed leaves and multiple frogs that navigate through them, leaving visible trails as they displace the vegetation.

## Conceptual Idea

The work explores emergence—how complex, beautiful patterns arise from simple rules. Each frog follows a basic algorithm: move toward a goal while preferring paths with less duckweed. This simple behavior, multiplied across many agents, creates intricate, organic pathways that feel natural and alive.

The piece captures a specific moment in nature—the delicate balance between stillness (the duckweed) and movement (the frogs), and how motion leaves traces in seemingly static systems.

## Inspiration

The inspiration came from observing a pond where little frogs swim through duckweed (kroos in Dutch). As they move, they push the duckweed aside, creating visible paths. Interestingly, the frogs tend to follow these existing paths rather than forge new ones, creating a feedback loop where paths become more defined over time.

This behavior creates beautiful, organic patterns—networks of clear water cutting through the green carpet of duckweed, constantly shifting but following familiar routes.

## How does it work?

The simulation uses a quadtree data structure for efficient spatial queries across 12,000 duckweed leaves in a circular pond. Each frog navigates by sampling three points ahead (left, forward, right) and choosing the direction with the least duckweed.

As frogs move, they physically displace leaves, pushing them aside. The leaves themselves have simple physics—they want to move away from each other to avoid overlap, creating natural clustering and spacing.

Frogs travel between random points on the pond's edge, and when they reach their goal, they pick a new destination and continue swimming. This endless movement gradually carves out an evolving network of paths through the duckweed.

The piece supports different distribution patterns: random frogs from all edges, single-origin (all starting from one point), web (creating a geometric network), and opposite (mirrored crossings).

## What did you use?

* canvas-sketch for the animation framework
* JavaScript with HTML5 Canvas for rendering
* Quadtree algorithm for spatial optimization
* Vector mathematics for movement and physics
* Custom behavioral AI for pathfinding through obstacles
* Designed for Instagram story format (1080×1920)