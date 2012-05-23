---
layout: post
title: Drupal.org Search plugin for KDE
created: 1110368710
tags:
- Coding Corner
lang: nl
---
This is a small search plugin to search Drupal from the KDE desktop.<!--break-->Make a textfile with (be aware of linebreaks when copy-pasting!)<pre>[Desktop Entry]Charset=utf8Hidden=falseKeys=drupalName=Drupal.orgQuery=http://drupal.org/search/node/\\{@}ServiceTypes=SearchProviderType=Service</pre>Inside it.Save it as drupal.desktop in your searchproviders folder. That folder is by default found at:<pre>~/.kde/share/services/searchproviders</pre>Now anywhere in KDE you can search Drupal.org by typing:<pre>drupal:search_term</pre>
