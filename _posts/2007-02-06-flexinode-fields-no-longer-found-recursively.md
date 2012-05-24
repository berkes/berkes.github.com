---
layout: post_archive
title: Flexinode fields no longer found recursively
created: 1170751798
tags:
- PHP
- Drupal
- Flexinode
lang: en
---
I just added 'recursive FALSE' to [file_scan_directory](http://api.drupal.org/api/4.7/function/file_scan_directory): fields in contrib and other subdirectories are no longer automatically added to the fieldlist. One needs to copy the fields to the root dir, in order to activate them.

Only the 'core' fields are available byt default now. The reason is twofold: 1. Organise the fields better. This is the first step, [vote about your preferences here](http://groups.drupal.org/node/2172).1. Stop the many issues on broken and not maintained fields from pooring in. Flexinode only supports the [core fields](http://groups.drupal.org/node/2338), all other fields are contribs and people's own responsibility. This change highlights that. Hope this does not add a lot of confusion though.
