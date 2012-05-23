---
layout: post_archive
title: Fancy Rays in inkscape
created: 1168355338
tags:
- Design
- Inkscape
lang: en
---
![Flag of our Fellow Commies](http://webschuur.com/sites/webschuur.com/files/result_export.png) A really nice thing to do with [inkscape](http://inkscape.org) is to create rays. Rays are hot, maybe not as hot as [swirly curls](http://webschuur.com/publications/blogs/2007-01-06-swirly_curls_in_inkscape_0), but certainly worth your time.

In this tutorial I introduce the concept of gradients, and how to use duplicate tools to create repeating patterns.  Inkscape is one of the best tools when you want to work with gradients. I think not even Adobe Illustrator can beat the gradient tools of Inkscape. 

<script>
 digg_url = 'http://digg.com/design/Fancy_rays_in_Inkscape';
 </script>
<script src="http://digg.com/api/diggthis.js"></script>

<!--break-->
For rays, or any more digital drawing, we can best use inkscape in pixel-mode. Simplest to get there, is to use a template that is meant for the screen. 

1. create new: 1042 x 800
![Create new file from template](http://webschuur.com/sites/webschuur.com/files/01_new_file.png)

1. Because we need to be precise, we add some guidelines. Click on one of the the rulers and drag a new guide onto the canvas. Doubleclick on a ruler to set its position in detail.![Guide parameters](http://webschuur.com/sites/webschuur.com/files/03_guide_params.png)

1. Set File » Document properties, Snap to guides, so that we can draw precicely on the guides.
![Snap to guides](http://webschuur.com/sites/webschuur.com/files/04_guide_params.png)
 
1. Choose Bezier curves (Shift + F6)
draw a triangle (use guides to make it exact)

1. Fill it with a solid color, set 'stroke paint' to none.
![Filled triangle](http://webschuur.com/sites/webschuur.com/files/05_filled_triangle.png)

1. Toggle the selection mode to rotate mode, then drag centre crosshair to bottom corner.

1. Now we duplicate this. A linked duplicate means that if you change the parent, all its linked 'children' follow that. You change the color of the parent: all children will change the color too.
Linked duplicate of top-triangle (Alt + D), rotate 90° CCW
Linked duplicate of top-triangle (Alt + D), rotate 90° CW
Linked duplicate of top-triangle (Alt + D), rotate 90° CW twice

1. Now that we have a nice cross, select all four triangles and group them.
![Cross](http://webschuur.com/sites/webschuur.com/files/06_triangles_in_cross.png)

1. We now create a linked duplicate of the entire cross (Alt + D)
1. Click the cross again (toggle into rotate mode). Hold CTRL for controlled rotation.

1. Repeat the duplicating and rotating until you have the rays as dense as wished.

1. Now select all the crosses and group them.
![Circle of rays](http://webschuur.com/sites/webschuur.com/files/07_rays.png)

1. Optionally add a coloured square behind the rays, you may want to paint them white, so then they won't be visible against the white canvas.

1. Choose Stroke and paint (Ctrl + Shift + F) tool, select radial gradient. Click the 'Edit' button. Set both gradient ends to white (or whatever color you want the rays to be). But one end fully transparent.
![Gradient edit](http://webschuur.com/sites/webschuur.com/files/08_gradient.png)

1. Now we make the gradient a bit more ray-ish.
Add a new stop.
Drag offset to +/-0.70
Drag alpha channel to +/-80
![Gradient settings](http://webschuur.com/sites/webschuur.com/files/09_gradient_adjusted_center_stop.png)

1. With a [nice image](http://www.imdb.com/title/tt0418689/) ([download example here](http://webschuur.com/sites/webschuur.com/files/10_flags our fathers.png)) in front, the rays come out really nice.

1. For that, use the import tool (File » Import), and put it on top of the image.
![Import tool](http://webschuur.com/sites/webschuur.com/files/11_file_import.png)

Et voilá, a fancy schmancy sunset!
