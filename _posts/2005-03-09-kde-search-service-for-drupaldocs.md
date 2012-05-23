---
layout: post
title: KDE search Service for Drupaldocs
created: 1110367250
tags:
- Coding Corner
lang: nl
---
This is a small search plugin for the KDE desktop. (konqueror).<!--break-->Make a textfile with (be aware of linebreaks when copy-pasting!)<pre>[Desktop Entry]Charset=utf8Hidden=falseKeys=ddocsName=DrupalDocsQuery=http://drupaldocs.org/*\\{@}*ServiceTypes=SearchProviderType=Service</pre>Inside it. Save it as ddocs.desktop in your searchproviders folder. That folder is by default found at:<pre>~/.kde/share/services/searchproviders</pre>Now anywhere in KDE you can lookup Drupal ducumentation by typing:<pre>ddocs:search_term</pre>
