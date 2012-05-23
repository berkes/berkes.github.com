---
layout: post_archive
title: Image_filter overhaul
created: 1102022595
tags:
- ''
lang: en
---
I started with making a complete new image_filter system. 
One that is not as unfriendly as image_handler, but more powerfull than the current image_filter. Something inbetween both, lets say. A best-of-both-worlds thing.


First thing, is that i revived quicktags. Quicktags will do the insertation and button stuff. 
Quicktags now has a hook that allows module developers to add their own quickbuttons.

image filter has one of these hooks, saying: |insert image|

It will then prompt you if you want to upload an existing one, or upload a new one (with tabs). Uploading will create a new node with type image, in the default node_insert way.
"Choose" will let you choose from existing image nodes.

I created two screenshots. In my plan, they will be in one popup, and both dialogs will be under a tab. Choosing tab | upload | will show the upload dialog. Choosing the tab | Choose | (opened by default) will show you the choose dialog. The list in the choose dialiog is a sortable drupla table, with pager. The preview in both screens is filled once something is chosen. "Upload" contains no javascript, "Choose contains some, to make clicking a rown in the table trigger a POST.

Choose image has five buttons: Three to uplaod, preview and cancel the new image (the default node form buttons). once an image is uplaoded and submitted, the preview area will be the only one active, all the upload form stuff is greyed out.

Choose image Dialog and Upload image Dialog:

<img class="node-image" width="420" src="/files/images/choose_img_01.png" title="Choose image"/>

<img class="node-image" width="420" src="/files/images/upload_img_01.png" title="upload image"/>
