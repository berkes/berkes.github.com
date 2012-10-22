---
layout: post_archive
title: Why not to use -dev versions of Drupal-modules.
created: 1332500091
tags:

lang: en
---
[Cross post from a Reddit Thread](http://www.reddit.com/r/drupal/comments/r8p2b/to_drupal_newbies_if_youre_not_yet_using_boost_do/). Comments are most welcome [there](http://www.reddit.com/r/drupal/comments/r8p2b/to_drupal_newbies_if_youre_not_yet_using_boost_do/c43zghj?context=3)

Let us assume that a release is some form of agreement between the developers and her users. Usually a release indicates that:

* The releasable version is considered in a certain state. A state that can be communicated with the users (stable, beta, alpha, security-fix etceteras).
* The release indicates an immutable point in time and development. Even twenty years from now, you can rewind to release XYZ and find it in the exact same state.
* A release is typically kept forever. Unless, off course, the entire project is removed, that release will exist, with the exactly predictable (and often documented) bugs, shortcomings and other incompatibility. In most complex software projects (and your Drupal-core + 30 contribs is such a project) you will always choose predictability over newness.
* A release often runs trough test-cycles. This will be stated in the projects documentation. Most often trough simple "we are beta, please install and report back", but sometimes trough entire [Continuous Integration](https://jenkins-ci.org/) cycles.
* Documentation, Readme's, third-party dependencies are most often developed parallel. A release is a point where they are all brought together and synchronised. This can, indeed, easily mean that a -dev version has less bugs then a release. In most situations that is very logical: you make a release. It contains 6 bugs, 3 are solved, not enough for a new release. Now the -dev release contains 3 bugs and the released version 6. To many people this is an indication that the -dev release is "better" then the released version.

Dev versions may (and often are) be end of line versions. I have, for example, worked on a fully OOP, for users entirely backwards compatible, replacement for Tagadelic. (It is on hold, mostly due to my lessening Drupal involvement). If it is released, there will be an upgrade path from the various releases to the new version. But not from each and every nightly-build -dev. This is part of that "agreement". Dev versions might stop working from one day to another. Often large refactorings mean that features have to pulled out for a few commits, or that entire subsets stop working. A rewrite will break compatibility with other modules for a while, at least. So even if it works now, you simply never know if it will tomorrow. Dev versions are aimed at developers. So all the nice tools to lower the barrier for the larger public, such as installers, integration, end-users documentation and so on, are often neglected during this period. "It does not work -what does not work? -it shows nothing on the installer? -what does the debug-log show you? -the what, I don't know how to look at the log". Such tickets and emails are all too common and are utter time-wasters. If you don't know how to read and debug code, then a -dev version, being for developers, is not for you. You may try it, but certainly should not expect a smooth ride. And definitely not consume precious developers-time by filing already known- or duplicate bugs :).

A few more practical reasons not to use -dev versions are:

* You have not pinned a point in time and development: there is nothing more time-consuming and infuriating then attempting to find the exact time and date for some arbitrary -dev module in some arbitrary three year old Drupalsite that is handed to you.
* You cannot be certain of proper database updates. They are (or should be) guaranteed between releases, but not between -dev versions. chances are that some untested database change between -dev versions spoils your entire database. And if it can happen, it will happen.
* The state is uncertain: whereas a release has known issues and bugs, a -dev version is in a state of brokenness (or else it could be a release, now, shouldn't it?) which is entirely unknown. Installing a -dev version is a little like trial-and-error debugging and coding: it might get you a working environment. But if you have no idea why it works, you are probably worse off then when you had a none-working environment but knew exactly why it did not work.
* The userbase is small and spread out very thin. There is only one Latest Release, making it the most used version. But there are new -dev version rolled out every night, making the amount of users who run the exact same version as you, very small. This fact, is actually the whole concept behind the "agreement-thing".

*TL;DR* You know exactly what you get when you pick a released version. You never know what you get or where it may take you, when you pick a -dev.
