---
layout: post_archive
title: Flexinode image field fixes
created: 1169906024
tags:
- php
- drupal
- flexinode
lang: en
---
This morning I waded trough all the image-field bugs for Flexinode. Most of the issues were duplicates (Folks, please, search and read other issues when filing new ones), but there were some serious validation problems.

All but one are solved now, the last one, is a problem that will occur when upgrading/updating. In 4.7 a few new configuration features (regarding resizingof images) were introduced, yet no-one ever created a way to make all the old content update to these new settings. Nor did someone think of a way to insert default settings in case of an upgrade.

This last one, is a particular nasty one. If I don't find a volunteer to fix this, I will proably strip the resizing from the image field alltogether. A feature that breaks peoples sites, is worse then not having that feature at all. 
