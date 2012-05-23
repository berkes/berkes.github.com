---
layout: post_archive
title: Lots of missing files in development of Drupal? Switch off Drupal's error handling
created: 1262725609
tags:
- Tips and tricks
- Drupal Talk
- Drupal
- Drupal Blog
lang: en
---
When testing, or developing an existing site, one often does not copy over all the filebase. 
A site that has been collecting uploads (such as images in blogs) for a while may have a gigantic amount of images. Often, when setting up a development environment, it is too much to keep the entire filebase in sync, even when you work on a recent codebase and a recent database. 

In Drupal, this gives a lot of problems with the "file not found" handling. The default Drupal .htaccess puts 404 errors, file not found, on to Drupal. So that Drupal can write watchdog errors, or fire things such as imagecache image-actions. 
On a page with several images this may result in tens, or sometimes even over 50 file-not-found errors. And since they are all passed to Drupal, the whole of Drupal is bootstrapped, database-connections are opened, watchdog entries are written, and maybe a lot more, even. 

On my poor old dual-core laptop, this can result in 15 apache threads hammering the database and the CPU all at once! As if I am serving fifteen simultaneous visitors at once! 

The simple solution, is to switch off Drupal's error-handling in .htaccess.

In the file .htaccess, in Drupal root, simply replace the line 

    # Make Drupal handle any 404 errors.
    ErrorDocument 404 /index.php

into

    # Make Drupal handle any 404 errors.
    ErrorDocument 404 "The requested page was not found.  


That speeds up your development -environment with missing images often a hundred- or more-fold!
