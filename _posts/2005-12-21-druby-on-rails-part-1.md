---
layout: post_archive
title: Druby on Rails part 1
created: 1135199843
tags:
- drupal talk
- ruby
lang: en
---
So the next issue. I cant recall why I numbered my first post as 0, but ill leave it with that. True Geeks Start Counting At Zero.

This post is about the greatness of RoRs development workflow. And the lack thereof in Drupal.

So far, by following the book, I've got my first customised products (from a shopping card system) online. And I learnt a lot about how RoR helps you a lot in your workflow. Indeed: agile development. By merely <em>editing</em> a few files. The most time I spent was in getting the CSS and HTML to play nicely. (I'm a visual guy after all).

So what can we do to make Drupal easier to develop on top of? In my <a href="/node/381">last post</a> I already spoke about the greatness of code generation. I am adding this here, plus some more niftyness.
<ul>
<li>Code generation. I have already experimented with tiny shell scripts that build small modules from the commandline. A lot of Drupal programming is Copy Paste Search Replace work. Scripts can do that much faster than any human can. We should share such scripts to build a code builder. It should, IMO, not live in Bash scripts, but in php scripts, invoked from the commandline.
 Another good thing about this, is that it will allow new developers to start of faster. And prevent these developers from developing incompatible, non-standard code.</li>
<li>Dev -> Test -> Production: RoR has a built in workflow system, with scripts to publish your work in one of these stages. By default a foo_development, foo_test and foo_production database should be created. RoR will take care of the rest. Drupal could include a set of shell (or, better: PHP commandline) scripts that move around Drupal on your server, as well as clip into any SVN or CVS repos. We all need it, why not use it and make this a nice default. Unit testing can (should) live in there as well.</li>
<li>Scaffolding CSS. Learning by example is great, having good fallback defaults is even better. But defaults should <strong>never</strong> ever be in the way of development of non-default stuff. Rather then that despised drupal.css, we should include a default fallback drupal.css using a development system (theme-developer.module, for example). Then when we move away from 'development' we can compile this with one of the abovementioned scripts. Definitely not like we do now: remove the file on runtime(!)</li>
<li>Quick, real Quick editing. I have no clue how drupal could help in this. But the best thing of RoR is that you can literally develop live in front of your client. Rapid prototyping, indeed. I am sure that a (commandline) installation system for modules could serve this. It should not be too hard to collect a module from SVN, copy it to the correct place, then execute any mysql (or .install) files, then enable it. I am thinking of something based on symlinks and a small bash script. As long as it is not web-based, security is a lesser thread. 
And who wants to install in a GUI anyway, except noobs and dummies. Serious, RoR can afford not to make all this web-based, because its target-audience is developers. Only developers. Drupal spreads itself very thin across all sorts of users (and then does never truly please any of them, if that is possible at all)</li>
</ul>
