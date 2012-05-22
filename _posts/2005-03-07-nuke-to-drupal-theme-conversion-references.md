---
layout: post
title: ! 'Nuke to Drupal Theme Conversion: References'
created: 1110214939
tags:
- osViews *nuke2Drupal
- Drupal Talk
lang: en
---
I am starting the conversion to Drupal with a theme conversion. For this, I see two solutions: 
A Nuke Theme engine, that will run any nuke theme on <A href="http://www.drupal.org">Drupal</a>.
A Custom Conversion of the theme. 

<h3>PHPTemplate</h3>
I chose the latter, because the cleint wanted to implement some big technical changes in the layout. It will look the same, but the HTML behind it will change a lot. So we need to rewrite quite some parts anyway, which means that its much easier to create new <A href="http://drupal.org/node/11810">PHPtemplate</a> theme.

<h3>Screendumps</h3>
I use <a href="http://www.babysimon.co.uk/khtml2png/index.html">khtml2png</a> to generate a set of images from the original site. These images will be used in future as Background image, for reference. 

<h3>Plain HTML</h3>
Next I saved two pages as HTML (full page) <a href="http://www.mozilla.org/support/firefox/menu#filesaveas">with Firefox.</a>. These plain HTML pages will be used as framework and reference for the page.tpl.php, node.tpl.php, block.tpl.php. Once saved as full all images should already be available.

Now we have all the files available that will be used as reference.
