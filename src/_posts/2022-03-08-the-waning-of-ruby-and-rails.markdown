---
title: "The Waning of Ruby and Rails"
tags: [ruby, ruby-on-rails]
layout: post
lang: en
---

Almost 12 years ago I answered a [StackOverflow
question](https://stackoverflow.com/questions/3794270/is-ruby-on-rails-or-at-least-the-community-dying)
*is ruby on rails (or at least the community) dying? [closed]* with
*with a still very active community around it*. Today, 2022, I
see this declining more rapidly than before.

The most obvious (and unscientific) place to look is Google Trends. For
both Ruby, and Ruby on Rails, we see a clear downward trend for years.

![Google Trends](/images/inline/google_trend_ruby.png)

First a sharp bump, then it settles on a sideways pattern, but after
2016 decline sets in. I don't have an explanation for the sharp decline
in 2020 and presume it is a glitch in Googles data. Yet the trend
remains clear: downwards.

Back in 2010, [I answered](https://stackoverflow.com/a/3794316/73673):

> Ruby on Rails was a Hype. That means a lot of people jumped on the bandwagon because that is what they do: jumping on bandwagons (for a living).
> 
> After that hype, many communities popped up, in various languages that mimic Rails. Or try to. Or just took the good ideas and applied them to their community. Now you have gazillion halfbaked PHP-frameworks, and a few actually good ones. You have Django (python), Zend, Symfony (PHP) and even in Ruby, some alternative frameworks. That has spread the attention. There used to be only One Good Framework (sic.) now there are many.
> 
> That said, Rails 3 has just been released. Rails 3 is cutting-edge again. It has all the ingredients for noSQL (the one-but-latest Hype) HTML5 (the latest Hype) and many javascript-frameworks and interactions (the next-to-be Hype).
> 
> That said, Rails is not just Hypes. It is actually a fantastic framework. With a still very active community around it. Just look at github, and visit the trending repo's there once in a while and you will see a Great Rails Thing there every week.
>
> If you want to keep up to date, I would advice:
>
> *   http://www.rubyinside.com a blog all about Ruby.
> *   http://5by5.tv/rubyshow a podcast with (most of) all the news in Rails and Ruby land.

First the last: dedicated podcasts or ruby news-sites have all
disappeared, many haven't been replaced. There's a [fantastic weekly
newsletter](https://rubyweekly.com), but that's about it.

This highlights a problem that is a feedback-loop: without good
information (and tutorials) the influx of new devs will dry up. And
without a flow of new developers, there is less demand for this information (and
tutorials). If we look at e.g. Udemy, as of today (march 2022) there are
a meagre 109 course on Ruby (on Rails) on Udemy. Compared to over 10.000
each, for Python, Java, or JavaScript. One of the best [Rails courses](https://news.learnenough.com/ruby-on-rails-800-pound-gorilla) had its last public update in 2020. Other services such as go-rails are offering courses, just that the landscape is changing, not becoming worse, per-sé.

> With a still very active community around it. Just look at github, and visit the trending repo's there once in a while and you will see a Great Rails Thing there every week.

This is no longer the case. Support, gems, and developers working in the
open, are waning. As example, let's look at the gems for a service that wasn't
around during the initial hype. And one that's not tied to Rails: Azure.

The support for
[Azure](https://www.ruby-toolbox.com/categories/Microsoft_Azure) is
in a bad state. Many unmaintained, hardly any activity in last few
years. With a lot of unresolved issues. For example the official [Library by
Azure itself](https://github.com/Azure/azure-storage-ruby/issues) has 22
issues open, amongst which dependency issues caused by depending on
very old versions of other libraries (Nokogiri). I know, this is N=1,
but I picked this as example, not as proof.

I've recently started working on a (Ruby, not Rails) project where we
need a lot of integrations: payment service providers, cloud
storage, project-management and so on. Modern SAAS - started in the last
decade, almost all lack Official Ruby Clients or SDKs for their APIs.
Yet they offer them for Java, JavaScript, Python or even Rust.

[Slack](https://api.slack.com/tools) has no official clients or SDKs for
Ruby, (but do for other languages) nor does
[Dropbox](https://github.com/Dropbox?q=&type=all&language=ruby).
Azure, as linked above, is hardly maintained, of all
[HubSpot](https://github.com/search?o=desc&q=org%3AHubSpot+hubspot-api%2A&s=stars&type=Repositories)
API clients, the Ruby version is least popular (based on stars and
forks) and least frequent updated. Modern project management like
Monday, Teamleader or Notion all lack any reference to Ruby at all. Do
note that these are examples of popular SAAS that don't have primary
Ruby support. Others do offer it: from AWS to Square: there are
top-notch, well-maintained gems for them.

I should run an actual data analysis over ruby gems, their repo's, open
issues and so on, but glancing over the numbers already shows worrisome
trends. We can see that, if we grab a handful of SAAS services, Ruby
support is lacking. Back in 2010, when I answered that SO question, this
was entirely opposite: the most prominent SDK or API client were the
Ruby ones. One obvious reason is that, back then, the teams developing
the APIs and SAAS did this in Ruby themselves. Companies that were
around then, often have good Ruby clients. Companies from the last few
years often not. And the community versions of those are often missing
entirely or poorly maintained.

If we look at large SAAS or software companies, we can see
that the ones running on Ruby (on Rails) are all from the early days.
I have a hard time finding any
successful SAAS building their products on Rails after 2020. Github: 2008, Shopify:
2006, Twitter: 2006, Groupon: 2008, Zendesk: 2007, AirBnB
2008, Fiverr: 2010. The only larger companies, running Rails and started
after 2010 I could find are Stripe (2011) and Gitlab (2014). Discord and
Mastodon are the only recent popular Ruby-based Open Source projects that I am
aware of.

Obviously there's a strong survivor-bias and skewed correlation here:
successful companies take decades to become that. So naturally
successful SAAS will be older, regardless of using Rails.

> popped up, in various languages that mimic Rails. [...] Now you have gazillion halfbaked PHP-frameworks, and a few actually good ones. You have Django (python), Zend, Symfony (PHP) and even in Ruby, some alternative frameworks.

My point, back in 2010, was that Rapid Application Development (RAD)
development frameworks, using Model View Controller (MVC) architecture,
were in demand, fueled by the success of Rails. I have a separate
post planned on "RAD web frameworks", MVC and ActiveRecord, but it is safe
to say that such frameworks, amongst which Rails, have found
their niche, yet are by no means a silver bullet. It us took some
iterations to find that these architectures are not well-suited for a
large group of problems and domains and to develop and find
alternatives. So Rails' decline in popularity may be fueled by a generic
decline in MVC and RAD, regardless of the language.

When we look at some other sources, [the 2021 StackOverflow survey
results](https://insights.stackoverflow.com/survey/2021#most-loved-dreaded-and-wanted-language-want)
is telling too: Ruby, and Rails dangle in the bottom quadrant of all
lists. Ruby is "dreaded" and "loved" in equal measure. Unfortunately,
they don't have accessible *trends* published, but StackOverflow has a
separate tool based on activity on StackOverflow by tags:
[Ruby](https://insights.stackoverflow.com/trends?tags=java%2Cc%2Cc%2B%2B%2Cpython%2Cc%23%2Cvb.net%2Cjavascript%2Cassembly%2Cphp%2Cperl%2Cruby%2Cvb%2Cswift%2Cr%2Cobjective-c)
is both waning and in the lower quadrant there too for decades. This is
confirmed by the [Tiobe index](https://www.tiobe.com/tiobe-index/),
where Ruby is declining slowly, year after year. Both relative to other
languages and absolute.

So, purely anecdotal, and mostly by glancing over published numbers, and based on a
gut-feeling, I would revise my statement from 2010: yes, Ruby, ruby on
rails, the community is clearly waning. Not dying, though! Just like
Pascal and COBOL (and Perl) never died, if only because of legacy, Ruby
will remain around. I would certainly not say it is a ship going down:
But a ship slowing down month after month.

Popularity, however, says nothing about quality. If popularity was a
measure for quality, then Internet Explorer 6 was the best browser ever
(note for millennials: it wasn't). Ruby still gives the fantastic
development experience it gave when it was released in 2005. It only
became better. Rails still is a great way to get a prototype
demo, or minimum viable product online in days with least surprises.

Does that mean learning Ruby or Rails is a poor career choice?
Certainly not! The [demand for Rails and Ruby
developers](https://www.linkedin.com/jobs/search/?keywords=Ruby) is high
as ever, if only because general demand for developers is ever
increasing. And all that SAAS, built since 2008, needs developers for
the coming decades.
