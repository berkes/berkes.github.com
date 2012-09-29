---
layout: post_medium
title: "After almost twelve years of Drupal, I am saying goodbye"
tags: [Drupal, Rails, Goodbye]
lang: en
---
{% include JB/setup %}
Over [eleven years](https://drupal.org/user/1783) years ago, I got [https://drupal.org/user/2663](involved in Drupal), after running two
personal blogs on Drupal. A few years later, to my surprise, I found myself to be
amongst the first few people to [http://web.archive.org/web/20040606050259/http://drupal.org/services](offer commercial and professional Drupal services).

And boy, it was a ride. With no IT-education, other then
[webmonkey](webmonkey.com), the fantastic Drupal-community allowed me to
piggyback and stand on shoulders. Great, strong shoulders. 

I grew. I learned. And I learned how to program somewhat decent. 
I then, gradually I learned there were books and systems that allowed one to program _The Proper Way[tm]_.
Mostly because I was rolling out Drupal in
Real-world projects every day, bumping into issues that, as I found, had
been "solved" ages ago in academical books and studies. I learned that
"talk is silver, code is gold" is simply not true. Code that is
discussed, thought about, refactored, and then discussed again, is of a
much higher quality then code that is "just done". I learned that
properly architecturing something, turns it into far more then gold. I
often complained about "[horse-tack](https://en.wikipedia.org/wiki/Blinders)-coding" in Drupal.
Where working on small, isolated issues was (and is) always preferred over refactoring larger parts. This has led to a lot of repetition, inconsistent APIs and very unpredictable behaviour. I learned about encapsulation, separation of concerns, loose-coupling and more such well-known principals. All of which Drupal lacks, or ignores. I had the feeling I grew faster then Drupal.

I also came across _Ruby on Rails_ and found that there were actually real,
technical solutions for several of my gripes with Drupal. We are talking 2005,
by now. Remember, I have no educational background. At first, I knew
nothing about  OOP, other than what the great folks, the great shoulders
of the Giants in Drupal, told me about it on IRC and in forums.

I learned a lot of new terms, methods and concepts. They were, and still are, an eye-opener. 
MVC was something that actually existed! Something actually existed, actually got designed and invented, solely to solve most of the issues I had with Theming in Drupal! And these design-patterns were not just to make technical people happier (or something to flamewar about), they actually
solve many management and planning-issue too. 

But, I had also grew into something of a local Drupal-expert and goto-guy. Serving
most of the Netherlands as freelancer and Drupal consultant payed for my
mortgage. I got called in on many failing Drupal-project. Got to help
large companies and organisation in their swich to Drupal.

But toggling between Rails and Drupal-work, only made me see all the issues with Drupal
more clearly: there was a lot of work for me to do, in order to make
Drupal something as elegant and nice to work with as Rails. In an ever
growing Drupalcommunity, I decided that my voice and code in this was
only noise; especially since that community [clearly has a different idea
about webdevelopment](http://buytaert.net/views-in-drupal-8) then I have.

Around that time (beginning of 2009), I co-founded [Wizzlern](http://wizzlern.nl/). We developed
training and education for Drupal.
Training people allows you to meet professionals with lots of different backgrounds. People who have formal training in IT. People with much more in-the-field experience then I will probably ever have. And people who are critical. About things in Drupal.

But developing several training-courses also required me to dive really deep into the what and
the why behind things. I suddenly had to paint the big picture around an
inconsistent and weird API, answer questions like: Why are modules so hard to find? How come there are so few pretty
themes, compared to wordpress? Why is it so much harder to use then
Wordpress? Why can't we find a decent workflow to develop in a team and deploy? Feedback from experienced webdevelopers (in Java, Python, .net and PHP-frameworks) made me realize even more that there was something amiss for me.

It became harder for me to defend that, harder to explain my passion for the system, its quircks and its community. They say, that once you have looked in the kitchen of your favorite restaurant, you never want to eat there again. That could be the case here. Or maybe it is because I am a vegetarian.

The realisation came slow. It took years. Drupal actually wants to be
what it is now, not what I thought, or hoped, it wanted to be. My idea of _a toolkit, developed by webdevelopers, for ourselves, wedevelopers, to create ever better websites for our clients_, was a not going to be found in Drupal.

Dries's comment on Copenhagens' keynote made this even more clear for
me. He pointed out that Drupal should not focus on developers.

> "Drupal made the webmaster redundant. In future it will make the webdeveloper
> redundant".

Unfortunately, I cannot find the exact quote, this one is from my vague memory and scriiblish note I made back then. I can only find [Dries answering my question](http://www.youtube.com/watch?v=RGfQHu4QA6c&t=2m19s) about that quote. So his exact words are most probably different from what I phrased here!

However, the bigger picture became more clear to me: something we have seen happening in Drupal for a while
now: It focuses on the click-and-point development of website, not on the
programming of a website. It really wants to be a CMS, albeit a flexible one. Rather then what I consider the future: a developer-platform that allows me [to build a CMS](http://labs.talkingpointsmemo.com/2011/07/the-twilight-of-the-cms.php).

Development in with click-and-point, offers little challenge for me. Learning, where and how to find, evaluate
and configure the umpteenth gallery-slider-view-plugin offers no challenge, nor satisfaction. 
I found this approach of clicking together a site, to have several more
downsides. 

I could never give my clients 100% of what they wish. That umpteenth
slideshow-module might bring me 70% of what my client wants and has
designed. With the addition of two more modules, and some gluecode I
might get to 90%, while adding somthing like 70% unwished and unused
functionality and code. We now have a large, complex, hackish slideshow,
which is still not up to my client's wishes.

It is inefficient. Keeping yourself informed about the huge amount of
ever shifting modules is a full dayjob. So "selecting modules" is a hard
and tough job. We even had a special section in our trainings on that.
But even when found, you still need to learn its interface, get to know
its bugs, weird edge cases and undocumented features. This is worse with
complex modules such as Display-suite, panels and so on. 

It makes your project incomprehensible and unmaintainable. Having
hundred or more modules in a project is not an exception nowadays. I've
helped in projects were a site had over 800 modules. All of them in use!
Introducing a complex module like [Display Suite](https://drupal.org/project/ds) 
just to be able to switch template-files based on context is not a good
option. Don't get me wrong. Views, Panels, Display Suite, Contexts,
Spaces and so on, are works of great art. But also gigantic complex
beasts. Yet all these are unneeded in a framework that has proper tools
and layers available. Writing a query, and outputting the result to JSON
requires hours of investigation, several addon-modules on top of views
and leaves you with a pile of modules no-one truly understands. Compare
that to [a few lines of PHP](http://coenraets.org/blog/2011/12/restful-services-with-jquery-php-and-the-slim-framework/) which achieve not only more, but allow much more flexibility and freedom then views, CCK and another five addon-modules will ever allow you.

In my search to more challenging Drupal-work, I helped several large
sites solve some of their performance-issues. Helped many project with
their problematic Drupal-development and -deployment. I Taught many developers how
to write themes, modules and how to deploy. Unfortunately the challenges
did not revive my love for Drupal, but only took me further from it. I
came to realize that most of the problems stem from the way the Drupal
community prefers to do stuff. I even wrote some [controversial
opinions on that (Dutch)](http://webwereld.nl/opinie/106086/drupal-verkeerde-keus-voor-overheidssites--opinie-.html).

And I decided that it was time to make a shift. Find new projects
outside of Drupal, work on some pet-projects and see if I found more
challenges and opportunities to grow again, outside of Drupal.
After nearly one year of flipping between Drupal and other projects made me
realize that I had to cut all ties, in order to progress. That Drupal
was never going to be the developer-tool I hoped it to become.

I will put down all my Drupal-work and finish the remaining
few of my running Drupal-projects. Both those with clients, and those things like a stable release of tagadelic2 for Drupal 7. I will obviously announce those here.

Moving on to [exiting](http://nodejs.org/) new [technologies](http://www.mongodb.org/), [tools](http://www.sinatrarb.com/) and [development platforms](http://rubyonrails.org/) that fit better with my workflow and programming-experience. 

Goodbye, it was a fantastic bunch of shoulders to be allowed to stand on!
