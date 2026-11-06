---
title: "First canvas-sketch trial"
date: 2025-10-09
lang: en
tags:
  - art
  - canvas-sketch
  - javascript
---

Today I tried _canvas-sketch_ for the first time.  
It's a simple generative art toolkit.  
Here's a minimal example in JavaScript:

```js
const canvasSketch = require('canvas-sketch');
const settings = { dimensions: [600, 600] };
const sketch = () => ({ context, width, height }) => {
  context.fillStyle = '#222';
  context.fillRect(0, 0, width, height);
};
canvasSketch(sketch(), settings);
```
