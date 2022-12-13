---
title: "New Project: Fedetivity   Automate your Mastodon Account"
tags: [mastodon, fediverse, fedetivity]
lang: en
layout: post
---

A few months ago, we shelved Plannel, on which I worked as co-founder for about
a year. There was a need, there was problem, but the actual solution turned out
to not be tech (to improve project communication between clients and
web/creative agencies), but human (really just a "project/account manager", not
more tools). It's a hard lesson, but a good one. 

After trying to join a few existing startups as CTO or co-founder, I decided to
try fix a problem that I've been having for a while. Those are the best
problems to solve. And to hopefully turn into a product and business.

The project is [Fedetivity](https://fedetivity.com). A solution to easily
automate your Mastodon account. But first, how I got to this idea.

I'm still working a few hours a week on
[Flockingbird](https://flockingbird.social) which wants to become the Fediverse
version of "LinkedIn": a professional social network. Flockingbird, however
much I love it, has no viable business-model; at least not one that I see or
believe in. So I've made it my side-project.

Within Flockingbird, I've developed a bot that hunts the fediverse for
Job-postings, then indexes those in a job-board. This is
[search.flockingbird.social](https://search.flockingbird.social), the bot is
[@hunter2](https://botsin.space/@hunter2). The bot is
flaky and unreliable: it often crashes, loses connection, misses replies. To
solve this, I need in-depth knowledge of websockets (in Mastodon),
multithreading, federation, ActivityPub, HTML scraping, mastodon APIs, mastodon
permission scopes, and so forth. Writing an interactive bot (that doesn't
overload it's mastodon instance) turns out to be hard. But I'm solving that for hunter2!

So, why not share it?

And that's what I'm going to work on: taking the most difficult part of writing
bots and other automation for Mastodon or the Fediverse, and turn that into a
product. SAAS and Open Source. Hence, **Fedetivity**.

For those wondering: the [fediverse](https://www.fediverse.to/) is a name for a
set of decentralized, interconnected social media platforms. It's seen a
enormous influx and is on the rise, ever since Elon Musk took over Twitter. But
it was already steadily growing after every other scandal by one of the giant
social media companies.

Coming months, I want to ask as many questions to anyone who has a need to
automate stuff on their mastodon or fediverse account. Or already does so. I've
blocked my agenda to offer free consultancy on mastodon automation. In the hope
that helping people to solve their problem, teaches me about those problems.

If you have a bot, want to move to the fediverse, have moved to the fediverse,
just want to learn more about the fediverse, need to automate or integrate
anything there, just let me know! I can help you with resources, ideas, tools,
anything, really. I can even program these automations for you, if there's a
need. 

I'm sure I can help, while helping myself. At the very least help you to
understand how the fediverse looks towards automation (and not have you
immediately banned, or blocked). So, please feel free to [book a free
consult](https://calendly.com/fedetivity/fedetivity-mastodon-automation-consult)!

My vision for *Fedetivity* is that it becomes the If-This-Then-That, CircleCI
or Travis of fediverse automation. Where tech folks can write their own
automation pipelines and non-techies can build those though a friendly UI. And
where anyone has the freedom to run the software on their own, but where my
hosted version is free for small users and paid for the bigger ones.

But, first, I'll be writing software to solve my own immediate problem: a tool
that listens to mentions, DMs, and as much of the fediverses' status-updates as
possible. Then filter it, and forward that to a bot, *hunter2*, so that this bot
can focus on it's domain (job postings) rather than waste time on juggling
flaky websockets, (de)serializing, authorization, API calls, and other annoying,
time-consuming details.

It's one of those problems where I really wished it was solved already, and I
could just pay someone for a hosted product. Even when Flockingbird isn't
making any money, I'd gladly pay to be able to focus more on finding and
filtering great job-postings. I think those kind of problems are the best to
solve. If *I* would pay someone for this product, than surely someone else
will? But even if no-one else feels this problem, or no-one else wants to pay
for it, I do need to solve it anyway, since I'm stuck on this problem today.
