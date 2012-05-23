---
layout: post_archive
title: HOWTO include krumo in devel module with svn externals
created: 1217518993
tags:
- Project Management
- Tips and tricks
- Drupal Talk
- dat doe je zo
lang: en
---
Svn has a very useful concept, called [externals](http://svnbook.red-bean.com/en/1.0/ch07s03.html).

The idea, in a nutshell, is that you include code from another subversion server (and repository) into your own subversioned project. Instead of simply copying the code into your project, you link to existing code. That way you simply update remote projects, when working from thirdparty development releases (that library the other team is developing on the sidetrack), and/or switch to new or stable versions when they are released.
It is a good way to keep track of third party code such as the excellent [krumo](http://krumo.sourceforge.net/) library for debugging your Drupal code. 

You should have:

* A versioned Drupal in a working copy
* Devel module installed and working, also versioned in that working copy.

Move into the development directory.

    cd sites/dev.example.com/modules/devel

*Note:* I do not install devel module in sites/all/modules, for the simple reason that I believe a devel module should be available on your development environment only. (I can hear you think now: but what if I forget a debugstatment somewhere, that would give a fatal error on Live? Answer: don't. Leave debug statements. And test!)

Find out what the latest stable Krumo is from [sourceforge](http://sourceforge.net/project/showfiles.php?group_id=194198). At hte time of writing that was 0.2.1a. This way we can include a stable version.

    svn propset svn:externals "krumo https://krumo.svn.sourceforge.net/svnroot/krumo/tags/0.2.1a/" .

Replace the 0.2.1a with the current stable tag. 

Then update the current directory

    svn up

Krumo will be inserted into your environment, without the code being imported into your svn repository.

    svn ci -m"Added svn:external krumo version 0.2.1a into devel module. Happy debugging\!"

This will push the property to the repository. All people working from that repository will get a copy of krumo directly from sourceforge, on checkout. 

Update: Fixed typo. It should be ci for commit and co for checkout. 
