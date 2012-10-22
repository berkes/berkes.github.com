---
layout: post_archive
title: ! 'Good CMS (Drupal) designers are rare: ten points on how to find your perfect
  designer'
created: 1185478787
tags:
- project management
- organisation management
- php
- design
- theming
- css
- drupal talk
- drupal
- usability
- drupal blog
- ruby
- ajax
lang: en
---
update: after some stupid editing of mine, I brought the points down to six. [thanks to Bert](http://willy.boerland.com) for telling me I am fool.

More and more often I have to cope with designers in the process of creating Drupal sites. That is a good sign: Drupal matures, so it gets used in more multitalented, professional environments. Not just a pimpled student in the attic who knows some Photoshop and some Javascript and learns some PHP, but project cycles with multidiscplinary teams involved.

The biggest bottleneck, in all this, however, I find, is the _wrongly skilled_ designer.

Gerhard ([killes](http://www.google.nl/search?q=killes&amp;ie=UTF-8&amp;oe=UTF-8)) once brilliantly referred to certainn designers as _"and in the end we print it" people_. Unfortunately the web is not a sheet of paper. Far from it. A dynamic, (community driven) environment is far closer to a complex piece of machinery, then to a pretty piece of paper. Far closer.

Still, many, if not all, projects seem to take the route of the paper. First make something pretty, then mould the functionality into that.

These projects all go wrong. Most of them fail. The resulting sites are pretty...useless.

And each and every one of them will be a dissapointment for all designers, clients, users and developers involved. The designer never gets what he or she had in mind; the web is not as pretty as a photoshop-file. The clients are dissapointed because they bought a pretty photoshop file, but recieved a (often far more expensive) ugly site. Users are staying away because they cannot use the site as they want to; when design and function don't co-operate, your site will drown in an already saturated market (aka: the web). And developers are dissapointed because they simply could not present a site that works well.

After many such projects, have learned several things. Below, I put my <s>ten</s> six rules of thumb on how to involve designers in a complex webdevelopment process. In such a way that all of the involved parties are going to be happy.1. _Parallell discussion_: Don't __ever__ start off with consulting _only_ a designer. Start off with defining your wishes; a concept. Then involve consultants, developers _and_ designers at the exact same moment; never one after the other. A Drupal developer who gets five Jpegs and is told to "implement this in Drupal" will fail. Simple as that.1. _Never overestimate looks_: A designer who laughs at you when you say "we believe in [form follows function](http://www.geocities.com/Athens/2360/jm-eng.fff-hai.html) is per definition a bad designer. Each and every successful site out there is ugly as hell. 'Making something pretty' should be an _enhancement_ never a goal. Good and pretty design, brings your site to a higher level; enhances an already good site. Merely pretty design (lacking the word 'good') will only smother a potential good site.1. _Ask for styleguides_: A page like [mollio](http://www.mollio.org/), describing a dissected, element based design is the thing you need. You certainly don't need page-based designs. Photoshopping five pages is easy. But a dynamic site has dynamic items. Elements like "You must provide your name-- warnings" on comment-forms are a good example of a dynamic item: its only there under certain conditions. If your designer insists on "designing the pages as a whole; the way they are seen", tell her or him, that, when  all combinations are counted, you have over 800 pages to be designed. Tell her or him to either come with a styleguide, or design each and every of the 800+ pages. If a designer comes up with mollio alike styleguides, the desvelopers can implement that in Drupal without any hassle and ensures that all combinations and elements are covered and designed. Nothing is worse then having a pretty page, with a hideous pager (designer: "Can't you just remove these funny numbers, they are ugly and not in my pages?"; is what I once was told).1. _Multitalented_: Ask your Coder how his or her CSSand XHTML skills are. Ask that coder how well she or he knows photoshop or illustrator. Ask the same of your designer. If the answer is "none", you either need an extremely broadly skilled project-leader, or else get a new developer or designer who knows more then just hardcore PHP or pretty colorschemes. Developers and Designers need to coöperate, and certainly not work on both sides of a solid, concrete wall. A good webdesigner and a good webdeveloper knows the latest CSS and XHTML tricks and is not scared by a tiny bit of PHP or by words like "balance" or "symmetry".1. _Think in MVC_: Quite often I recieve photoshopped pages wich contain a lot of (undefined) functionality. A designer will draw an input field with the words "subscribe to the newsletter" next to it, and think: "there; we have a newsletter now". That designer is implementing lots of functionality (newsletters require very complex applications, as any professional should know). A designer who thinks that "a newsletter" equals a few square boxes in photoshop, is as bad as this women I met when I worked as builder: she asked for a power outlet in middle of a wall. She had no idea that a power outlet is more then a white thingy; that it invlolves wires and all that technical crap.  We could not provide that, because it involved a lot of drilling to get the wires there. This women was flabbergasted and sayd "Drilling? But, all I need is a white plastic thingy on the wall, like this one". A good webdesigner should think in models, views and controllers; should know that he, or she is only creating the V, the view part. And that all other parts that touch functionality are to be discussed by the whole team.1. _Ask about CSS, JS, standards and XHTML_: A designer who tells you "I am not a technical person", is exactly that: not a technical person. And since the web, and websites are very technical things, he or she has just told you to be unfit for the job. Even paper design requires technical skills: inktypes, coloradjustments, calibration, paper-types etc. The web is lot more complex then that. A designer who tells you its not, is lying, or has never built a proper website.

Unfortunately, the few designers that I know, who meet all mentioned above are full-booked till the end of 2034. By then we will have Drupal Vista 2.x out. So go educate your desigers and developers to enhance the Drupal projects... :)
