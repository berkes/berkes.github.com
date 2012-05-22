---
layout: post
title: ! 'Nuke to Drupal Theme conversion: Prepare images'
created: 1110216426
tags:
- osViews *nuke2Drupal
- Drupal Talk
lang: en
---
Now I will convert all the images into useable snippets. One requirement of mine is that I use PNG, because of itw power. Another requirement is that we use CSS everywhere, so images should be useable as background patterns etc. 

<h3>Convert gif to png</h3>
I use the commandline tool <a href="http://www.catb.org/~esr/gif2png/">gif2png</a> To convert all image files at once.
Using the following command will convert all Gifs into optimised png files. 
<pre>
$ find -name '*gif' -exec gif2png -pdOv {} \;
</pre>

<h3>Reorganising the images</h3>
I created several directories to hold the new files:
res/images/ (all the layout images)
res/icons/ (all the categrory images and icons)
res/logos/ (logos and titles)
re/unused/ (items such as the image buttons)

<h3>Image only tabs</h3>
One requirement was to replace the images-buttons with HTML and CSS buttons, so I move all these image tabs into "unused". Later on we still need these to create sliding-doors tabs, but more about that later.
