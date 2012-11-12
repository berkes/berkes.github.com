---
layout: post_medium
title: "Spree e-commerce on budgethoster Site5"
tags: [whitepaper, ruby on rails, spree, e-commerce, hosting, server, site5,
git-deploy]
lang: en
---

Recently I rolled out a
Ruby-on-Rails/[Spree](http://spreecommerce.com)-based webshop on the
budgethoster [Site5](htp://site5.com). I thought to share some gotcha's, reasoning
around this project. To debunk the idea that hosting for Rails is either
complex and hard, or done on Heroku. To explain a bit about Spree as a
good option for your e-commerce (or not) and to go a little into how I modified
Spree.

My wife makes [custom bags, smartphone- and tablet sleeves, and all sorts
of leather, handcrafted jewelery](http://annatreurniet.nl). Obviously she wanted to sell some
through the internet; So I made her a webshop. 

## Reasons for choosing for Spree
I decided to go for Spree, after some investigation. A few important
reasons where:

* It's catchphrase _It was designed to make customization and upgrades
  as simple as possible_.
* It is built in Ruby on Rails, and that is what I do. (Although I
  probably know more about PHP, and Drupal, at that).
* We wanted a simple shop. Her needs are mostly simplicity; less
  features in the shop equals better. Spree promises that; as opposed to
  most ready-to-go shopping tools, that promise every feature you may
  wish. And get in your way.
* We needed flexibility. Simple means that it offers less options and
  choices. But also that the business-logic needs to handle more.
* I wanted the site to be ready for mobile and thus to be [responsive](http://zomigi.com/blog/examples-of-flexible-layouts-with-css3-media-queries/). Rails is ready for this. HTML5 and all that. So is Spree.

Some reasons why I had thoughts about either writing my own e-commerce or
going with a PHP-solution were:

* I had (and have, read on) my questions about how true the catchphrase
  _It was designed to make customization... as simple as possible_ was,
  in reality.
* Spree is Rails. Rails requires professional hosting; not a problem for
  a project developed for over 1k; where hosting at $20 per month is peanuts. In this
  case $20 per month is far over budget; again, the insides of her exact
  business-choices are out of scope for this project. Good-enough
  PHP-hosters come for under the $5 per month.
* I was going to build it for free, obviously. So we could not afford me
  spending hundreds of hours on tweaking some tool, CSS and whatnot. A
  turnkey-solution like [Magento](https://en.wikipedia.org/wiki/Magento) would be a faster solution.
* We chose the Dutch bank and payment provider [Omnikassa](https://www.rabobank.nl/bedrijven/producten/betalen_en_ontvangen/geld_ontvangen/rabo_omnikassa/) because
  they simply offered the best deal for her. There was no omnikassa
  payment plugin for Spree, but there were some for more famous
  frameworks.

I went for Spree after proof-of-concepting my two biggest challenges:
offsite payment and (Zurb-foundation](http://foundation.zurb.com) as CSS/HTML framework, instead of
the default [Skeleton](http://www.getskeleton.com/), came out quite
alright. And a 30 days trial on [Site5](https://www.site5.com/) proved me that hosting there was
going to work out.

## Zurb Foundation

I replaced most views with my own HTML, so that I can use Zurb
foundation. It offered just a little more features, such as a [slider](http://foundation.zurb.com/docs/orbit.php)
and more advanced responsive features; like hiding entire subtrees of
elements on certain devises.

In the end, we decided to go Desktop-first; I am re-doing some of the
views now, so they are prettier on mobile too. The reason we put this
lower in our todo, is that the most-used payment system in the
Netherlands, iDeal, trough our PSP omnikassa, is not mobile-friendly in
the first place. So why offer an entire mobile-webshop when people
cannot pay (properly) on a mobile?

It turned out to be really easy, but quite a journey of discovery trough all the
spree-gems and its views, before I found out what views to copy into my
own projects. The CSS was just as cumbersome to override. In the end, I
decided to simply do away with _all_ CSS and JavaScript for the front-end and roll my own.

## Site5 Hosting.

For under €5 per month you get a server with git, ssh-access and
Passenger to host your Rails application. A few Euro more for a static
IP address, which I need for the SSL-certificate. It is an e-commerce,
you need HTTPs.

It requires a [few settings to be changed](http://kb.site5.com/ruby-on-rails/how-to-deploy-a-rails-3-application-with-phusion-passenger/) to my Rails application and it
requires Ruby [1.8.7](http://kb.site5.com/ruby-on-rails/ruby-rails-gems/) since that is what their Passenger is configured
to use, but in the end it works just fine. 

The only problem I had was some asset-precompiling issue, where the
compiler just died on me. After a support-call, the Site5-engineers upped
some memory on the server and I could compile just fine. 
It turned out that some spree plugin came with several hundreds of
(demo) asset-files like huge videos that needed to be "compiled" by the
asset-pipeline. Cleaning up [Spree Slider](https://github.com/berkes/spree_slider/commits/master) and removing its assets
fixed the issue for good. But hey, I don't expect a budget-hoster to
support me compiling hundreds of megabytes of video and other
demo-stuff. Fair enough.

Also, their uptime is reasonable. Not enterprise-alike reliable (IMHO), so I
have [nagios](http://nagiosplugins.org/man/check_http) to check the
frontpage every several minutes for certain strings to occur (It looks
if the words "Anna Treurniet" occur in the `<title>`). Every odd
month (or so) there is a restart or some short downtime. One time Site5
changed the MySQL-setup (location of the socket moved to elsewhere) so I
had over half a day of downtime until solved. And now and again the
application gets shut-down for no clear reason, so it needs to boot,
resulting in the webshop loading very slow for one or two visitors. The
nagios checking actually kind-of solves this too, since it acts as a
"visitor" opening the site every five minutes.

All in all, I am very happy with this host. It offers far (far!) more then one
would expect from a €5/month. In my "enterprise"-jobs, I have to deal with €500-and-up-per-month
hosters who have far worse deals, support, deployment and uptime.

Their absolute biggest downside is the way their bulkhosting environment holds them back from upgrading to Ruby 1.9.3. 
So, if you depend on a reasonable recent Ruby-version, bad luck. 

## Git Deploy

In order to keep the deployment smooth and somewhat close to the
experience I have with [Heroku](http://heroku.com), I use [git-deploy](https://github.com/mislav/git-deploy). Git deploy consists of a few simple hooks that run on the server in post-receive hooks. So, after you push your changes to production with `git push production`, the server runs a few commands, like (when needed) database-migrations, assets and cache-refreshing and then a restart of the Rails application. I have used this for [other, PHP-based systems too](http://www.berk.es/2012/08/03/git-deploy-or-how-i-learned-to-stop-worrying-and-love-deployment/).
Some problems, as mentioned above with asset-precompiling aside, it
works like a charm. 

Obviously, when using git to manage the deployment, you need a [good
branching and releasing management](http://www.jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/). With that in place, I can fix and deploy changes within minutes. Yes. Minutes. Probably faster than most of you can log in over SSH, find the sourcecode on production, and hack a fix in with Vim.

## Testing and TDD

Unfortunately, I did not manage to get good integration tests for Spree
going. Most of the extensions lack any form of tests. Spree itself is is
covered pretty well, but integrating Spree means changing configuration,
overriding behaviours with [Decorators](http://guides.spreecommerce.com/logic_customization.html). And I still have no idea how
to tests these properly. The rest is mostly view-overrides, which often
breaks Spree's own tests and requires me to rewrite all the spree-tests
in my application. It mostly boils down to my inexperience with testing
mostly, though.

## Omnikassa

A [Spree Extension](http://www.spreecommerce.com/extensions/95-spree-omni) was written to allow offsite-payment with the
Dutch payment-system Omnikassa. This is and was a mess. Spree had no 
(proper) support for offsite payments, so I had to hack into the entire
checkout-workflow in order to get this payment-system going. The
Omnikassa-extension somehow breaks the feature in Spree to allow
discounts; it breaks certain orders in the back-end and whatnot. Spree
1.2.0 promises to have this checkout-workflow-inflexibility fixed, but
an upgrade is rather hard, seeing all the customisations the application
needed.

## Spree again?

I don't think I will use Spree for a future e-commerce project. Despite
its promise to be the most flexible solution, I found it making too much
assumptions and being far too inflexible in areas. I'd rather roll my
own, next time. 
The most important parts that Spree offers me, are either very easy to
develop myself (products, categories, their views, content-management), 
 not needed (credit card-handling, user-login, 3rd party
 statistics) or covered in solid Rails plugins (administration, editors).

Against small-things-made-hard, like changing the checkout-workflow
(one-click-checkout?, offsite-payments), manually ordering the products
on the frontpage, integrating a simple CMS for the few "static pages"
and so on. Usually, in an Average Rails-projects these things take a
few hours programming and deploying. Here they took me days of stepping
through spree-core code in order to understand how my Decorator did
(not) change some ordering or some menu-addition.

For me, Spree offers me too little benefits to overcome its downsides. Despites
its promise, it is very much a ready-made application, which works
according to various assumptions about workflow, features and even looks, that you can
configure and beat into shape; mostly. The very same conceptual things that [Drove me
from Drupal](http://www.berk.es/2012/10/01/farewell-drupal/).

But overall, rolling a simple, Spree-site on Site5, gives you a
well-designed, ready-to-go e-commerce environment for under €10 per
month. And with a few hacks and tools, you can make the deployment to
that host really easy. Whether Spree is the best solution for your
e-commerce needs, depends on how much (and what exactly) you need to
customize.
