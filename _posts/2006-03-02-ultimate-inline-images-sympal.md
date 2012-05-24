---
layout: post_archive
title: ! 'Ultimate Inline images: Sympal.'
created: 1141332844
tags:
- Drupal Talk
- sympal.nl
lang: en
---
A while ago I [presented the community my ultimate solution](http://drupal.org/node/26288) to the everlasting "Drupal Suxorz Coz it has no Image support".

Well, first of all: there are a gazillion contribs that deal with this. But even for core this is plain untrue: Drupal can handle files (attachments) very well, and showing them inline is as easy as copy-pasting an HTML tag.

However, in search of an even simpler solution, I decided to create something that is as simple as can be. And if found it in the idea "Just add attached images to the body and teaser, if they can be shown inline". Simple as can be!However, all the poolitical debates, made Dries think "there is not enough support for that feature in core". At that time that infuriated me. Not Dries saying that. But the fact that all kinds of people stumbled in that thread an all had an opinion, and all wanted MORE then what my patch did. The fact that all that "NO this is TOO SIMPLE WE NEED ALL THA FEATUREZZZ" got the (IMO) best solution for simple image support on its knees.

However, all the poolitics aside, I looked on: A contrib? Another add-yer-image contrib? No please. So I decided to add it to [inline module](http://drupal.org/project/inline). Richard was so kind to [commit my patch yesterday](http://drupal.org/cvs?commit=26873)!This module is our first real Sympal milestone. Drupal made simpler by adding modules, yay! (as opposed to Drupal with more  features trough added modules)Any inlinable image, less then a certain (configurable) dimension is simply appended to your body, or teaser or not at all. What types of nodes get them where (teaser, body, both or none) is configurable, per type. Defaults to off.

And yes, I hear you all thinking it: "Butbutbutbut I want to define where the image goes". Really? I ask you? Are you sure that you are going to hand-edit the location of images in 2.000.000 nodes? We do this trough a theme function. The appending of the image is done trough a powerful, yet simple theme function. Butbutbutbut, I want to add images left-right-top-bottom-after-the-first sentence. Personally, Id say: get a life (Or CCK):). But no, there are nice reasons for wanting that. Inline module still has the tokens: Just add a [inline:foo.png] where you want to see foo.png et viola!So, this is certainly not some image_assist, nor a WYSIWYWFU editor. This is simple. And that is its power!IMO (but i might be preoccupied, because I made it) this is a must-have for any blog or simple news site out there. And core, I hear you thinking? Not in my time! the contrib is fine. IMO, people who are too lazy to look for a solution should get [a hosted Drupal site!](http://sympal.nl).
