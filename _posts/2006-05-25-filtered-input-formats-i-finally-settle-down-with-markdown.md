---
layout: post_archive
title: Filtered input formats, I finally settle down with markdown.
created: 1148564391
tags:
- Drupal Talk
lang: en
---
I have gone trough a lot of stadia of liking, useing and disliking various input formats. and most of the times ended up using plain-ol'-HTML. With [quicktags](http://www.webschuur.com/modules/quicktags) this is more then enough for a blog. But when making up more complex documents, for example with lists, and headings, HTML is far too much work to type. And now I landed with markdown. And I love it. And I just saw that [groups.drupal.org](http://groups.drupal.org) is using it too. (Good choice, Moshe!)

I have a very strong aversion against WYSIWYNRG (what you see is what you never really get) editors. And when they work with Any Browser, then you might find that they have a _way_ too cluttered interface. But the worst part of WYSIWYWB (what you see is what you will break) is that they break every rule or guideline of splitting metadata and design. All my clients or editors who use such editors, seem to be able to completely misuse them. I see that they use them to insert a 120x230 (random example) image in the top right of every post. If they were given file-upload field that makes 120x230 images, and a theme that puts them in the top right its all fine. Off course it is their choice. And who am I to say 'you should not use a WYSIWWBTD (what you see is what will break the design) editor'? But dont ask me to update the theme then. Or to put all the images on the top-left, instead of the top-right. Or make all the images 20 px smaller. That is what I mean with "splitting metadata and design".

But sometimes you need some power. Enter filter input formats. There is a wild range, available for Drupal, starting with simple image tokens, and ending with Media Wiki syntax. 
I tried nearly all of them. And found them either far too limiting, or far too complex. If they are limiting, they are annoying because with simple HTML you can achieve so much more, most often with even less 'characters'. But if they grow flexible and complex, they become exactly equivalents of HTML, only using a less known syntax. Take MediaWikiSyntax. Ever tried to build a table with that? I dont know what is worse: a textarea full of sharp brackets, tds trs etc, or the textarea full of pipesymbols (and no resizer JS will help you with that). 
After that, I tried textile for a while. Its syntax is quite easy to use, but somehow it does not grow on me (nor my clients). I think the syntax is a bit too academic, but I am not sure. Enter markdown. 

I was using markdown on [a wiki](http://www.stikipad.com/), without actually knowing it was markdown. And after a few days already, I thought: "I should really make an effort to make a Drupal filter for this, this is the syntax  was looking for". Untill I found out that it was called markdown. And that markdown is is a Drupal filter already released for 4.7 even!
I think that the reason why markdown appeals to me so much, is that it is the way I am used to mark up text documents. The way I create my emails for example. 

Now, all I need to do, is write a [hook_quicktags](http://webschuur.com/node/628) for markdown, so that you can insert the markdown syntax in an easy faster way, and to make the learning curve even less steep. Another todo is to create a one-page-onsite refernence for markdown syntax.

_To conclude_: In Sympal I install this filter in the default profile, for I am confident it will feel best for all new users. 
