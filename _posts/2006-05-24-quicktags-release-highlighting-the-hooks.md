---
layout: post_archive
title: quicktags release, highlighting the hooks!
created: 1148505801
tags:
- drupal
lang: en
---
[Quicktags](http://drupal.org/project/quicktags) ([screenshot+install](http://www.webschuur.com/modules/quicktags)) was just released for 4.7. I cleaned out the whole part, had a big fight with FormsAPI (had to abuse theme functions to insert the JS, but okay) and I rewrote the hooks part. Yes, quicktags has hooks to let you insert your own quicktag buttons!
 
I put a [Developers manual](http://webschuur.com/node/628) online, so that you can read up how to add quicktags support to your module. I want to stress, that it is a hook, so you will *not* make your module *depend* on quicktags by any means! 
You can insert tags and alter the existing tags (removing existing buttons is on the todolist). The hooks are really simple. No need for any Javascript knowledge, nor anything else, complex. If you can build an array, you can add quicktags. 

And for the end users? Its the simplest way to add some html into your posts. Nothing WYSITYBINS (what you see is that your browser is not supported), but just easy ways to add that fingerbreaking a href="" to your post. Even for those who are clueless when it comes to HTML, this is a simple way to get started and learn HTML. After a few months you will know HTML! How's that for your CV?

