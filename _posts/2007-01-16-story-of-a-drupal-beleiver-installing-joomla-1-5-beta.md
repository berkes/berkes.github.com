---
layout: post_archive
title: Story of a Drupal-Beleiver installing Joomla! 1.5 Beta
created: 1168945292
tags:
- Drupal
- PHP
- Theming
- Drupal Talk
lang: en
---
For a client I installed [Joomla! 1.5](http://www.joomla.org/) Beta, with the ultimate goal to develop a new template (theme). I thought it to be a good idea to write down my experiences for all the fellow Drupal believers.

![finished the Joomla! installer](http://webschuur.com/sites/webschuur.com/files/web_finish.png) The README and the [installation manual](http://dev.joomla.org/content/view/2013/93/) (Remarkebly complete, and well written, by the way) only talk about the web-installer. I don't like web-installers, they force me to go on the commandline to tweak server settings and file permissions -- so I thought, being pre-occupied.
Forcing someone onto the commandline, to tweak their server security, defies the whole concept of a web-installer, because in the same time needed to read trough technical Apache documentation, and to change file and access permissions, I could have installed the whole CMS over that commandline. Twice.
However, I was wrong. Well, I was right  about the fact that there is only a web-installer (and no way to install Joomla on the command line), but wrong about being forced to tweak the server. Joomla! has very well thought out alternatives, built into the installer. These alternatives get triggered if the 'normal' procedure does not work because of tight security settings.

However, my first encounter after browsing to the newly extracted Joomla! on the localhost is "Wow!". It does extremely well for the eye. This being the first encounter, makes the experience wonderful. Though I guess certain [fancy javascripts](http://moofx.mad4milk.net) will get annoying after the fifth installation. But taken into consideration that a majority only installs Joomla! once or twice, it is very very well done. First impressions are important. This is true when you are a single and go out clubbing; seeking someone for a flirt. But also for a CMS. My first impression about Joomla! is good. Eventhough I am no longer single, I found my [love](http://drop.org) long ago, this secret (well, no longer secret by now) cheat felt remarkably good :).

Back to securing the server: Letting your PHP write its own PHP is a severe security hole in your set-up.
So, as a general rule, web-based installations should normally simply not work. If they do work, you should consider moving to another server, because the server you are on right then, is not very secure.

However, Joomla! has two options for those on such a properly secured server.
First: It will simply write out a copy-pastable configuration.php to the screen, if it cannot write it to disk. It comes with a good explanation on how to copy the contents into the proper file on the server. Configuration.php is comparable to Drupals settings.php.
Second: Joomla! can act as an FTP client. And letting an (s)FTP client connect to the server, then write your PHP/files, is as secure as you want it to be. A very good invention, I must say. It also allows secure installation of remote modules from within Joomla!, without forcing you to loosen your security.

Once installed and running, I am impressed by the usability of the backend. It took me literally less then 20 minutes to grok over 80% of it. I have worked and developed for about 5 years with Drupal and it took me more then 2 hours to grok the new 5.x admin concepts. Mostly because I kept forgetting where stuff was moved to this release.
Joomla has a very strict backend-frontend concept. The backend is to 'do stuff', the frontend is to look and browse. For a more classic web1.0 site (I make, you consume) this is far better then Drupals' fuzzy-backend-is-inside-the-frontend [concept](http://drupal.org/search/node/hide+navigation+block). For Drupal's idea of community plumbing, the Drupal way (permissions dictate what you see and do in the front-end) is far more suited.
Sure, Drupal now has a way to change the _theme_ for everything that is under the url _admin/*_ but that is certainly _not_ the same as an entirely separate backend. Especially since half the work done on Drupal (including, but not limited to, submitting nodes) is still done in the front-end.

A disclaimer: I can only say something about the useability of Joomla! after actually using it, off course. Being able to grok and find stuff, is not a real proof for usability. I see concepts (locking and unlocking, breaking when using the back button) in Joomla! that I know will start to annoy me very quick when used daily. If I feel an urge, and got an actual chance to really use it for a while, a new review of using it will need to be written.

Another disclaimer: I cannot say much about development on Joomla! I am trying to make a fancy CSS theme, based on some drawings by a designer, for my client. So far with little success. [The manuals on templating](http://dev.joomla.org/downloads/Joomla15TemplateTutorial.zip) (themeing) for Joomla 1.5 are well written, and I am digging trough them, but so far I only managed to break the installation...
![broken theme](http://webschuur.com/sites/webschuur.com/files/error_installation.png)

<br class="clear"/>
But in general, I found my mistress. I am sure I will stick to my beloveth Drupal. And to my great friend Ruby on Rails. But Joomla! feels so nice that I cannot deny it from clients just because it 'is not Drupal'.
