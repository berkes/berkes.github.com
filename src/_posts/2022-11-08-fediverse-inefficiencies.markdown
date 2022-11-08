---
title: "The Fediverse is Inefficient (but that's a good trade-off)"
tags: [fediverse, mastodon, decentral]
lang: en
layout: post
---

Let's address the mammoth in the room: the [fediverse](https://fediverse.party/en/fediverse/), the network of [mastodon](https://joinmastodon.org/)
servers, is very inefficient.

In this post I'll show why it is inefficient and why that isn't a problem.

A great analogy to explain this with is growing food.

## Gardening: making my own food, decentralized

I spend a lot of my time in my vegetable garden, our communal orchard, chicken
coop, and keeping bees. A lot of my food is produced by myself, *decentralized*.

Compare this to one farmer who produces thousands of tonnes of potatoes,
another one who produces tonnes of tomatoes another single farmer keeping
500.000 chickens, or a beekeeper with a huge truck with several millions of
bees travelling from gestation- to gestation. It really holds no comparison.
I've grown two third of my food myself[1], but my tomatoes would've roughly
cost me €35 per kilo, if I calculated everything including a minimum hourly
wage. My honey would cost over €10 a jar if I'd pay my time. And my neighbors
do the same in *their* garden. It's terribly inefficient.[2]

But that doesn't matter, because it's a trade-off. 

I get a lot of good things back. The labor is good. I've solved many software
bugs while weeding a patch of garden[3]. I've come up with some of the best system
architectures while going through one of my hives. I've had the best fun making
jam, drying fruits or conserving harvest. Much better than those guilt-ridden
nights wasting hours of another addicting Netflix series.

The **incentives** are different. I don't have shareholders demanding more
tomatoes, have no loans to pay for the most efficient chicken-coop. I don't
need to out-compete my neighbors. No pressure to sell my produce for the right
price. **The inefficiency doesn't matter**!

There is **connection**. By growing my own, I feel connected to the thing that
literally keeps me alive: my food.

There is **reward**. I'm convinced it's purely psychological, but a self-made
sauerkraut, a pasta from own (carefully selected) tomatoes or fries from these
special potatoes just tastes so much better than anything wrapped in plastic
from a supermarket.

There are **different efficiencies**. My food isn't shipped across oceans (in
airplanes). There isn't a single gram of waste in my "supply-chain": everything
ends as compost or chicken food (manure!)[4].

There is **resilience**. If my potatoes, my neighbors' probably won't. And even
if theirs fail, I still have pumpkins, corn, spinach and much more to cover the
loss. When our chickens get the chicken-flue, they won't all die (we've selected
them for strength, not optimal-egg-laying-efficiency). And even if they do,
it's "just" 8 chickens dead, not 100.000s. Monoculture is a terrible risk.

With decentralized systems like the Fediverse, like Mastodon, we see very
similar trade-offs. We see the same kinds of efficiencies, but the same kinds
of efficiencies.

## Fediverse Technical Inefficiencies

The obvious inefficiency are all the [tens of
thousands](https://fediverse.observer/stats) of servers running mastodon. All
of them run databases, storage, workers, webservers and so on. A single post
with an image may reach [32.1k people](https://mastodon.nu/@gretathunberg) and
all *their* contacts, if these people are spread across thousands of servers,
that image is now stored on all those thousands servers. The (meta) data is
duplicated across thousands databases and thousands of servers spend time
validating and processing the post[5].

Any distributed system is [inefficient](http://scholar.googleusercontent.com/scholar?q=cache:ylLbdPSfTbkJ:scholar.google.com/+Decentralization+Briefing+Notes+-+World+Bank&hl=vi&as_sdt=0,5), for one, because it lacks the
[economy of scale](https://en.wikipedia.org/wiki/Economies_of_scale).

And so is the case with the fediverse. The six million users would "easily" fit
on a mastodon on under thirty (virtual) servers, a very few large PostgreSQL
database servers and a single file-server/storage. I know, because I've built
and grown such Rails systems, with millions of users (on AWS). Certainly not
thousands of servers. Definitely not thousands of database-servers.

Even if Mastodon were to be [rewritten in Rust](https://github.com/ansuz/RIIR),
tuned, and changed into a backend that can host thousands of users on a single
Raspberry-Pi running on solar power, it still is inefficient. For one, because
that backend would be even more efficient when employed in a centralized setup.
And secondly because there is a lot of network overhead.

All the servers also need to communicate and distribute the posts, media,
profiles and metadata. Over the internet. [Activity-pub the underlying
protocol](https://www.w3.org/TR/activitypub/) is very chatty, necessarily. And it
does this over HTTP, hence TCP/IP. All of which is chatty and relatively
inefficient. And because every server is communicating with every other server,
all require extra CPU time, storage, memory and other precious resources just
to distribute a post.

## Fediverse Human Inefficiencies

All the mastodon (and Pleroma, Pixelfed, Misskey and such) servers are managed
by humans. Some humans will manage several servers, and some servers are
managed by several humans. In any case, this causes a lot of duplicated work.
Done mostly by volunteers. Unpaid.

All posts, accounts, media are moderated by humans. Moderators must wade
through spam, racism, hate, (child)porn and abuse. Daily. And then blocked. A
single spam-post might -worst case- have to be dealt with by tens-of-thousands
of moderators. Each one reviewing it and potentially taking action. There's,
again, a *lot* of duplicate work[6].

## Gardening in the Fediverse

Each server on the fediverse is like a personal vegetable garden, or a
neighborhood orchard. Lots of overhead, lots of duplicate work, lots of
inefficiencies that could be solved by handing it over to a few huge-scale
"farmers" instead. Instead of tuning thousands of databases over and over, just
"buy" a single big database from something like AWS RDS: their economy of scale
makes it far more efficient than all the small ones combined.

But like with gardening, it doesn't really matter that it's inefficient. No
shareholders to demand duplicate work to be eliminated. No competition to
out-compete. No growth required to keep relevant. As long as two people can
communicate over "the fediverse" it's a full-on success. Nothing else matters.

All the extra work, done by humans, creates an immense feeling of connection.
When a participant reports troublesome content, they know the *humans* who
handle the report. Trust them. This human connection is, and has always been, 
a crucial factor in creating healthy communities.

While moderating a fediverse server is hard work, it's also rewarding. The same
way getting your email-inbox empty is. But also because there's a direct,
positive impact on the humans that signed up on your server. Often many thank
an admin in person. People trusted this human with their social network and
communication.
Whenever a server-admin asks for donations, support start streaming in: never
enough to cover all hours of work and often not even enough to cover the full
costs. But people gladly pay a few dollars a month when they feel connected to the
ones they're paying it to. Gladly pay humans for their hard work, yet
reluctantly pay a fee for an automated "validation icon".

A fediverse-alike network sees different kinds of efficiencies pop up. People
develop many [alternative types of
software](https://github.com/BasixKOR/awesome-activitypub) to handle different
needs and niches. A
furry-fetish group can tune their moderation and setup very different to a
group who wants to build a safe-space-community for victims of cyber-bullying.
No central setup could attune itself to all these different and dynamic needs
and wants efficiently. Validation of participants becomes [so much
simpler](https://martinfowler.com/articles/your-org-run-mastodon.html) and
banning bullies and hate is a single click away.

The original internet was set up decentralized, with the goal to be resilient
to failing parts and to attacks. A lot of this property has been undone by
re-centralisation: if AWS has an outage, half the internet goes down.
When Twitter is ran into the ground by some Billionaire Chaos Monkey, the whole
world sees it's journalist and government communication break down. A (lifted)
ban on Twitter has actual effect on democracy and society.

[Re-decentralising](https://redecentralize.org/) is, therefore, is very much
needed to make our society resilient. We cannot afford to have a single
software bug break all airplanes, cars or thermostats. Or to have the
communication of a country be dependent on the unpredictable whims of a
billionaire. The education of our kids be governed by advertising algorithms.
We cannot afford to be held hostage by monopolies when it comes to our
infrastructure, communication and information.

As a European, I clearly see how monoculture is spreading over the world.
American monoculture. Renewed prudism (imagine that a child sees a nipple!
gasp!), replaced traditions (we now all have this ridiculous festival of
consumerism, called "Black Friday", without ever having thanksgiving. We're
almost done replacing our weird Dutch Santa Claus -5th of December- with this
American Coca-Cola version). 

Plurality is key to evolution. It is what makes us a humans progress.
Monoculture enlarges the risks, and halts progress. Both in biology and in tech.

The only alternatives would be either to embrace a communist-alike centralized,
monopolized, governance by entities that are governed only by a few
shareholders or billionaires. Or to forego all the internet, automation and
digitization of the last centuries and move back to the early 1900s. 

Both aren't acceptable alternatives for me. So I'll keep working on my own
[digital
garden](https://www.technologyreview.com/2020/09/03/1007716/digital-gardens-let-you-cultivate-your-own-little-bit-of-the-internet/).
And on my physical garden.

---

* [1] I don't eat meat, which makes this easier. Though I did learn to butcher a hare this year - roadkill near my home. I ate that: first meat after some 15 years.
* [2] There's a long standing argument if we'd be able to "feed the world" like this. I am convinced, by studies and papers, not just feelings, that we can. But *only* if we change our consuming patterns. Seasonal crops, local crops, no meat (or it becoming extremely exceptional, like caviar or so), no fish etc.
* [3] Which begs another question: should my clients pay me for the hours tending to my bees, for weeding my garden, or just for the hours that I'm actually staring at a screen? 
* [4] Admitted: if I count the crops eaten by animals, the honey I leave in for the bees, and the fruit I didn't manage to preserve, I did lose a lot. Almost a third, I guess. It was all eaten, just not by me. And it did contribute to a healthy ecosystem.
* [5] Ironically all using electricity and therefore (indirectly) emitting CO2.
* [6] There's good tools, shared lists to block, and mechanisms to block large amounts at once. Still, each server needs humans to do this on their particular server. 
