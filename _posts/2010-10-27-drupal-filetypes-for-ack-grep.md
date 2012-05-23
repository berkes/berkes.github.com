---
layout: post
title: Drupal filetypes for Ack grep.
created: 1288183361
tags:
- Drupal
lang: en
---
How often did I not think "sigh, I wish I could just _grep_ this pile of invoices for that date". But unfortunately, the all-powerfull search-tool <a href="http://www.kingcomputerservices.com/unix_101/grep_this.htm">grep</a> is not available <acronym title="In real life">IRL</acronym>. But it is available on most unices, including all Linux systems and OSX. 

But life gets even better. With <a href="http://betterthangrep.com/">Ack-grep</a>. A much faster, better and more targeted tool. For example , it will ignore all sorts of files you usually wanted to ignore, when "grepping" trough a pile of files. You know, searching for that line "sent to foo@example.com", but getting all sorts of results from backup files, revision-databases and what more. Ack does this. And more.

Ack also allows you to define profiles. Sets of files to be searched trough and sets of files to ignore. It comes with <a href="http://betterthangrep.com/">lots of built in sets</a>, but not with Drupal predefined.

To get a Drupal profile, just <a href="http://stackoverflow.com/questions/950755/how-can-i-search-the-contents-of-module-files/950855#950855">add a .ackrc file to your home directory</a> and add the profiles there. 

    echo "--type-set=drupal=.php,.inc,.module,.install,.info,.engine" >> ~/.ackrc

Now you can search trough Drupal with 

    ack "implementation of hook_"
 
Or, if you want to ignore all none-drupal(ish) files, with

    ack --drupal "implementation of hook_"

Or, if you want to search trough all files, except Drupal-files

    ack --nodrupal "Licence"

Many additional tools, such as gedit addons, will use ack, when found (over grep). And will benefit from this drupal profile too.
