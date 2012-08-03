---
layout: post_medium
title: "git deploy or: How I Learned to Stop Worrying and Love Deployment"
tags: [git, Drupal, deployment]
lang: en
---
{% include JB/setup %}

One of the most surprising things I learned when moving away from
Drupal-development towards Rails development, is the impact of fast and
low-barrier deployment.

We all know that [Drupal's deployment is severely broken](http://www.slideshare.net/eaton/drupal-deployment-presentation).

I always thought fast and low-barrier deployment was just a
nice-to-have, because it would bring down the actual hours spent on deploying. But it gives you so much more:

* Very quick response on client requests. 
* The possibility to [fail fast and fail cheap](http://www.flickr.com/photos/bertboerland/2217345100/).
* Be sure about few regressions and no failures.
* Provide guarantees about uptime.
* Allows for canonical releases
* It allows for more code and less config.

## Very quick response on client requests.
There is nothing that makes a client happier then sending in a question or request and seeing
it live and online a few minutes later. And nothing pays your bills so well as a deployment.

If you have contracts that only pay after "the entire project is
finished", it most certainly includes a deployment. But more often it
requires far more, because "finished" implies that all bugs are fixed
and the client gets (almost exactly) what she asked for. In a waterfall
this means many small releases, often on some internal "acceptance"
site. When you can deliver the bugfixes and improvements faster, you
will finish your project faster; the actual time between your first
preview-delivery and the final one (the one that gets the invoice payed) is much shorter.
This is when you are not working "Agile". For "Agile", such
fast-and-often deployments are a requirement.

## The possibility to Fail Fast and Fail Cheap.
If you can push out releases the way my rabbit has babies, you can
afford to have some fail. And because you can release five minutes later, again, you can fix such
a fail with lightning speed. 

A failing release that needs days of fixing, rollbacks and recovery-work
is bad. But when that means that a next release requires even more
planning, people on-call, meetings, and so on, you only make things
worse: the release becomes even more expensive and
cumbersome. 

Being able to quickly recover from a mistake helps the client. She or he
sees less downtime and has to pay less for "deployment-time" and on-call
hosters and sysadmins.

But it mostly allows you to try new stuff. If some new UI-idea, or a
fancy payment-method can be released with little or no effort, it
becomes less hard for everyone to roll it back, if it proved less
successful then anticipated. It makes the investment in some feature
smaller, and therefore the barrier to simply throw it away when it
fails, much lower.

## Be sure about regressions and no failures.
One condition for fast releases, is that you are certain about its
quality. Most often you will have a test-suite in place to insure yourself against
regressions. 

This allows you to hit a few buttons and when everything turns up green,
you can deploy. With arrogance. You know it will go well. And you know
everything continues working. 

The average Drupal-deployment calls for click-frenzies: developers,
clients and other stakeholders click around on the site manually, for
many hours, to ensure everything continues working.

A client who sees an unrelated part failing because you bugfixed another
part, is an unhappy client. Even if you can explain that this complex
access-permission-module touches not just the Wiki (where they asked for
some access control) but also the blogs and forums (whom you forgot to
check throughly against the new access-control).

A client, whom learned to check the
entire, and ever-growing site for failures, on each and every release, is an unhappy (and busy)
client. A developer who manually walks trough the entire site after each
and every change is a very unproductive developer.

Testing as a security against failures is not a result of fast deployment, but a
requirement to have them. If you want fast deployments you must have
tests.

But when testing is not an option, at least the fast, and low-barrier
deployment, allows for quick rollbacks and makes such failures much
cheaper.

## Provide guarantees about uptime.

With Drupal, you [must bring your site down](http://drupalcode.org/project/drupal.git/blob/refs/heads/7.x:/UPGRADE.txt#l54) during deployment. When you consider that your average Deployment of Drupal takes an hour or
more, then no-one can afford to have several releases each week. Even
when you deploy at 03:00 at night.

With slow, manual deployments, especially in cases like Drupal's where
the site is offline during the entire process, the downtime is
unacceptable for many. My clients have often postponed releases for
weeks, because of this; because they were afraid to bring down the site
for even one hour. My last bigger Drupal release took four(!) hours of
manual labor. Half a working-day downtime is _Not an Option_ for most.

That "fear of downtime" and postponing of releases, is actually the worst part
of it. It means that after developing cool new features, you have to
wait weeks before it can be released (and the project can be finished
and billed).
Or worse: it means that you continue development and squeeze hundreds
more bugfixes and features. Making the release even bigger and harder.

## Allows for canonical releases

Releasing often, means that you can release after each and every change
too. The advantages of that, are huge. 

You detect mistakes faster, rolling back is a piece of cake, and the
overall impact of a change is much easier to grasp.

## It allows for more code and less config.

When a release is cheap, "hardcoding" stuff is cheap too. Instead of
writing large and complex "on vacation-message-systems" in a CMS, you
can simply set a "We'll be back august 31" in the template. And deploy.
Four minutes work. 

Yet when the deployment is hard and expensive, you'll need to allow such
things in your application. Quite recently, did we implement a large and
complex layout-system, with drag-and-drop placement of content-snippets
in a CMS. It had a horrible effect on the system: The design became
extremely complex, it had to
cater every possible placement, performance of the application dropped
to snail-speed, the code behind it all was large and complex and the UI of this "in the CMS layout system" required
large and expensive projects in itself. A disaster. 

Yet the reason behind the request for this layout-system was that the
client wanted to change the placement of some content once or twice a
year. With the required downtime for a deployment, the overall costs of
one such deployment and all the friction that caused, it was no longer an
option to call the development-team twice a year with the request for
changing the layout. Building this large and complex beast was actually
cheaper then having some (frontend)developer change some HTML around
twice a year.

With fast deployments, the option to hardcode things is a very valuable
option. It not only allows you to keep the application and its backend
simple and lean, it is mostly a self-amplifying-loop: large and complex
configurable systems require hard and often manual labor on releases.

Which is the main problem in Drupal's deployment: you don't code stuff, you configure
it. And everything configured, cannot be deployed with a
deployment-system, but has to be re-applied manually on a production site.
Off course you can think of many tricks (like exporting and importing the
configuration) but they don't solve the underlying problem:
manually applied configuration is not deployable like code is
deployable. And when that configuration (such as the layout) lives in
the same database as where your content lives, like in Drupal, the
disaster is complete. The chaos is complete when such a manual
configuration (like a new content-field, say "teaser", gets introduced) requires a change in code too. 
Or when a code-change requires manual configuration. 

## Learn to stop worrying too
By coding most of the stuff, in a framework that supports automated
testing and has a good migration-framework, you lower all the barriers. 

### Start testing
Testing allows you to be sure about what you are to release. No need to
manually click trough the site on some "Acceptance" server, for hours,
before releasing. But a few clicks after every change to assure yourself
(and your client) every that worked in the past, still works.

### Write migrations
Instead of manually inserting stuff after a deployment, you should
automate that. 
In rails, I write migrations to change the database. And rake-tasks for
most of the other work, which can then be called from [within the
migration](http://stackoverflow.com/a/2632865/73673). Rake-tasks are
dead-easy to write, mostly because they were designed especially for
automating tasks.
Every task that can be automated, needs no UI, requires no manual labor
and, most importantly can be tested trough and trough.

### Deploy. Just do it.
I write my blog in [Jekyll](http://jekyllrb.com/), where publishing a new
article is a deployment. I don't blog that often, but experiencing how
simple and fast deployments are, has brought some if my deployment-fear
down.

For the other systems, I use
[git-deploy](https://github.com/mislav/git-deploy), which ties the
deployment on top of git. The setup is simple, but the deployment is
ridiculously easy: `git push production`.

I have attempted to rewrite git-deploy for Drupal, but so far, not to
satisfaction. Drush, the Drupal counterpart for Rake is hard to get
configured on each and every (different) production server out there.
And is not very scripting-friendly. But already, it lowers the barrier
so far that deploying becomes fun again.

Deploy to acceptance, test or development on daily basis. Have at least
one place where you and your entire team deploy several times a day.
It brings experience and makes everyone aware of the benefits of good
automation of the process. 

Once you start deploying five times a week, as opposed to once every two
months, you will be a happier developer. You clients will see far more
progress, faster responses and all your sites will improve much faster.

What is holding you back from deploying once a day?
