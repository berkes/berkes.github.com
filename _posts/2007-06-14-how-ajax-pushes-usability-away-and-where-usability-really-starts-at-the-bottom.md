---
layout: post_archive
title: ! 'How ajax pushes usability away. And where usability really starts: at the
  bottom.'
created: 1181853385
tags:
- programming
- php
- tips and tricks
- design
- drupal talk
- drupal
- usability
- ruby
- ajax
lang: en
---
Ajax is no longer hot, its a commodity. Rich javascript is found all over the place. This is a bad thing. Or at least something we should be worried about. We, being people who care about usability.

Not because javascript is bad, not because of the fact that many javascript is written extremely bad. But because it gives developers an excuse not to work on usability.

## Being a Javascript Lover
I am a javascript lover. Back in the days I put javascript in every site I built. You know, the stuff that would alert('Your browser is too old'). But ever since then I have held my sepsis for use of it too. Javascript is not evil, nor is it 42. It is merely a tool: use it right, and it is good. Use it wrong and it turns evil.

## Common errors in the brain of a developer
The three mistakes made most often are:
* Javascript is used because only because it cán be used.
* Javascript used to replace perfectly working standards.
* Using javascript to hide usability problems.

The first one is rather obvious. Those that don't understand this, should recall the [Days Of Horror](http://www.jalix.org/ressources/internet/dhtml/_dynduo/dynduo/). And they should be banned to Geo cities or any other long-dead web-page community, to play with snowflakes and overly C3wl [mouse-cursor-banners](http://www.javascriptkit.com/script/script2/sparkler.shtml).

The second one is a huge problem, again. [revver](http://one.revver.com), for example, has built some weird upload thingy-majik in flash and javascript, instead of using the proven and working [input file](http://www.456bereastreet.com/lab/form_controls/file/) field. Obviously this weird homebrewn file selector breaks in many browsers: it took me (Admitted, on Linux, KDE, ubuntu) four browsers to find one that could actually upload a file there. I left revver for blip.

TV, obviously.
Another fine example is how the arrogance of designers (Sure I know better how some field should look, then interface developers from large multinationals found after over 10 years of research).

The third one, however, is the worst, because it happens all over the place. It makes us, developers, lazy. We finally found a closet to hide all our crappy interfaces, so that when mammy comes looking, the room looks clean.
I have read and heard it many times in Drupal development "this form is really messy. Just put some collapsible fieldsets around the most messy parts and its solved." No! its! not! solved! It is hidden. Tucked away.

## Hiding a problem is not equal to solving it.
You did not improve usability, you merely hid your inability to think about good usability. In fact you are saying you are both incompetent (I don't know how to solve basic usability questions) and unwilling to be honest about it (I'll hide my mess so that no-one notices).
It is not bad to not know how to solve usability. But then for somebodies sake, ask for help.
Any proper software project, has usability baked into its very core workflow. There are hardly any proper software project. Usability is nearly never baked into the core.

And because of that, it is so easy to abuse some little bits of ajax and javascript to hide that incompetence and the bad workflow of our project.

## The History Of The Teaser[tm]
A clear example: Drupal has known the History Of The Teaser. The concept of its teaser is not bad, its just clumsy and not very usable for many end-users and many cases. I cannot recall how often I had to explain over the phone "left pointy bracket. Exclamation mark. tow dashes the word break. No, not the break key, b, r, e, a, k. Yes with spaces" and so on. You'll know it.
Many attempts to solve this issue died because of just as many reasons (of which every single one could get a separate blog post, so I'll leave it with just that).
I, personally, don't really care, because it takes [only 15 lines of PHP](http://snipplr.com/view/2865/drupal-formalter-for-a-separate-teaser-field/) to make it simple and usable for your specific end-users. And 15 other lines to make it usable for another case and project.

However, most nifty, and IMHO worst, solution was a [complete javascript thingy](http://drupal.org/node/107061). It works fabulous, looks great. And is even more sexy then most women I have met. It even degrades well. And there lies the problem:  it degrades into what we have now, being a rather clumsy (couch) interface. Such a solution is really extremely nifty, had Drupal had only [one audience](http://webschuur.com/publications/blogs/2006-12-26-the_cmc_and_cmf_landscape), and had Drupal not pretended to be a platform for developers.

The point is, that however cool this solution is. It does not solve the usability problem. It only adds niftyness to hide that problem. Underwater we still have the same problem, its just pushed a little out of sight. But it _is_ still there.
Moreover: it forgets that not all users are equal. The __&lt;!-- break --&gt;__ code is flexible, it allows for creative use. And it allows for a 15-line PHP solution that fits within your audiences expectations. A hardcoded javascripted solution does not.

## The Full Monty is about real usability
Usability goes all the way. It starts right at the database design. Or actually even at the [design of the programming language](http://www.artima.com/intv/ruby.html). Most people, working on system that can use a grain of usability, tend to think that usability is only and merely a magical trade of arranging elements on an interface.
But, if the database architecture is wrong, the code will be wrong. If the code is wrong, the behaviour is wrong. And if the behaviour is wrong, then no javascript can ever solve the real problem.

With the teaser, the real problem, is that many expect the body and teaser to be exclusive (again: the core of the issue is that this really depends on the case). What shows in the teaser, may not be part of the body.

So, the real problem with usability, in this case (and in most cases) lies in the database, the basement of any application. In Drupal both teaser and body are stored in duplicate. The body column contains both the teaser and the body. the teaser column only the teaser. yuk! There is no javascript that can ever solve this basic design error.
It has to be said, again, that this is easy to circumvent by a developer typing 15 lines of PHP, so the basic design is not /that/ bad. But solving the usability starts at the lowest level.

## Mr. Wolf, how do you solve a problem then?
So then, how _do_ you improve usability? This, I cannot answer, I think no-one can. Its a complex, difficult trade. One that requires either intimate knowledge of the human psyche, or an Amazon account (so that you can read the many books by people who have that intimate knowledge). And worse: one that differs from case to case, site to site. So what may be true for your audience, is not for others. Usability for Linux users is completely different then usability for the operation of a television.

The most important rule is, however, to bake usability, as requirement, as feedback, as task, right into the workflow of every project and every planning you make. This is the only way that usability issues don't pop up because of low level design flaws. It is also the only way to ensure your product will work (reasonably) well on release. 

If you have done all you can to make your product as friendly as possible, then add some javascript icing on top. To make it _even better_. Don't start of with javascript or AJAX as your one and only saviour.

__Javascript: Lets make good things better.__ (and lets not use it to make evil things less bad),
