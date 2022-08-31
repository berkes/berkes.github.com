---
title: "Exponential compound interest on Technical Debt. And how I avoided it."
tags: [architecture, project, technical-debt]
lang: en
layout: post
---

In this post I'll try to explain why not all technical debt is crippling. And
what I learned, dealing with technical debt. I'll try to show that:

* Technical Debt isn't always bad.
* It is bad, dangerous even, when it starts to compound.
* The interest must be calculated into operations.
* We must deliberately and actively choose when and where to take on technical
  debt.
* One trick to take on technical debt but keep the interest low, is to decouple
  our code.

During my career, I've worked on many codebases. One thing that differed a lot
between projects, is the effect of "technical debt". A few projects where
completely crippled by it. Where "paying the debt" took the entire companies'
engineering "budget": hardly able to react to the market, to deliver feature
requests, to keep users happy. All effort "wasted" on just keeping the software
barely running.

Yet other projects, often much larger, than those ones above, or with far
smaller teams, managed to keep delivering for years, decades even. Managed to
maintain a high velocity. Continuously.

I've been pondering why that is, for years. Until I read [Debt the first 5000
years](https://www.goodreads.com/book/show/6617037-debt) by David Graeber. And
until I started to seriously research companies (stocks) to invest in. I then
realized that in finances, not all debts are equal. That having big debts, in
itself is not bad. But that the types of debt are what make them dangerous.
And I learned to appreciate the effect of compounding interest. 

![3% interest on debt: Simple vs Compound](/images/inline/interest_simple_vs_compound.png)

When we talk about *Technical Debt* we usually don't categorize it. After all,
the term was coined as just an analogy, not something scientific:

> Shipping first time code is like going into debt. A little debt speeds
> development so long as it is paid back promptly with a rewrite... The danger
> occurs when the debt is not repaid. Every minute spent on not-quite-right
> code counts as interest on that debt. Entire engineering organizations can be
> brought to a stand-still under the debt load of an unconsolidated
> implementation, object-oriented or otherwise.
> — Ward Cunningham, 1992
	
But the idea isn't new. In 1980 already, Computer Scientist Meir Manny Lehman
saw a clear cause and effect. And stressed that it is important we continually
keep paying off those debts:

> As an evolving program is continually changed, its complexity, reflecting
> deteriorating structure, increases unless work is done to maintain or reduce
> it.
> — Meir Manny Lehman, 1980

Technical debt will cause our project to deteriorate over time. The accumulation
is what makes it such a powerful and dangerous concept. As DHH and Jason fried
point out: it gets worse over time, and you'll often only notice that when it
is too late:

> Promises pile up like debt, and they accrue interest, too. The longer you
> wait > to fulfill them, the more they cost to pay off and the worse the
> regret. When it’s time to do the work, you realize just how expensive that
> really was.
> — Jason Fried, David Heinemeier Hansson in It Doesn’t Have to Be Crazy at Work

When we don't pay back the Interest, over time will not just accumulate, it will
compound. Compounding interest means that if don't pay off interest, that
interest itself becomes debt too. Which increases the debt, which increases the
interest. Ad infinitum, exponential.

Consider above graph, in which I show a debt of $1000, with 3% interest.
One (blue) line is where interest is paid off. The other, is where interest
isn't paid off and is added to the debt. After 100 periods, one has paid off
a total of $3000. The other now has a debt of over $50.000.

> Compound interest is the eighth wonder of the world. He who understands it,
> earns it … he who doesn’t … pays it.
> — Albert Einstein

Yet, many companies take on debt. Many of the highest valued companies in the
world, have large debt/equity ratios: not just large debts, but large debts compared
to their equity. E.g. Apple has a debt ratio of over 100%: it has more
debt than that it has equity. And Apple has *a mind boggling-lot* of equity:
and therefore a mind-boggling lot of debt.

![Screenshot showing amount of debt that Apple has](/images/inline/apple-debt.png)
Screenshot from [SeekingAlpha](https://simplywall.st/stocks/us/tech/nasdaq-aapl/apple#health)

Like with such financial debts, I have experienced projects that took on 
technical debt in software, safely. Without grinding to a halt or going
bankrupt, without turning into a [Phoenix
project](https://www.goodreads.com/book/show/17255186-the-phoenix-project).

When is technical debt safe? Where is it safe? For that, we must first take a
detour. To get a common misconception is out of the way: **That we,
engineers, programmers, aren't the ones responsible for the debt**.

David Graeber points out in his provoking book, that financial debt
isn't equally distributed. Or, more precise: who has to pay it back, isn't
equally distributed:

> As it turns out, we don't "all" have to pay our debts. Only some of us do.
> ― David Graeber, Debt: The First 5,000 Years 

The typical story, we, engineers like to tell ourselves, is that it is
"management forces us" to make the shortcuts[1]. That "management" is taking on
the debts and that "we" then have to pay it back. I'm convinced this is a
misconception. A story "we" tell ourselves to shirk our engineering responsibility.

A medium post on this topic [confirms that
misconception](https://medium.com/swlh/technical-interest-or-how-technical-debt-can-bankrupt-your-code-60b1a5f61ac7)
when explaining the concept of technical debt with an example: 

> Of course, you thought that after shipping your app, you would have time to
> go back, get rid of the hack you made, redesign the architecture, implement
> it, and make your code look good again. In other words, get rid of your
> technical debt. [...] Those same stakeholders come to you and say that the
> app needs to get that new feature as soon as possible. You tell them that you
> are just trying to make the code be in good shape again. And you hear back
> that there is simply no time for that now, you can take care of that later.
> [...] In fact, it has to go through some loops and hoops in order to make it
> work.

A junior, that I once mentored, explained why his code was becoming more and more messy:

> "Management needs me to churn out new features, rather than work on stuff
that improves the software". (paraphrased)

I have thought this same fallacy many times. But I, and this junior, am
making a few mistakes here:

* I did not quantify or clarify the debt and the interest clearly. The whole
  business should be worried by this debt, not just a (few) programmer(s).
* I made it look like "taking on debt" and "paying back debt" are entirely
  different projects, which we plan in succession, rather than something that
  we (also) do as part of our daily work.
* I am not taking "the business" serious enough. The part that actually pays my
  beer. I wrongly consider "engineering" vs "business" as opposites, rather
  than as the enablers of each-other they are.
* That taking on technical debt can be avoided, and is not a *fact of life* of
  a software project.

And, above all, I did not design the code in such a way that it can safely take
on the inevitable debt. Or even embrace it.

With a monetary debt, there are two things to do to avoid bankruptcy through
compound interest: keep paying off the interest and debts, or keep the interest
rates low.

This is an and/and, not or/or: with low interest rates, continuously paying off
the debt is easy, which is why people will lend money for low interests. It's a
positive feedback loop!

With high interests, it is hard to pay off debts. And when there's a high risk
of not paying off debts continuously, people will charge much higher interest,
making it harder to keep paying them off. A negative feedback loop!

This is the same for technical debt. High interest means we cannot pay it off:
we have so much hacks and ugly code, that forever we remain behind on actually
fixing all that. All available time is wasted on "emergencies" and on "fixing
bugs" caused by the debt. But that then also means that the interest remains high.

With technical debt, the common "answer to technical debt" is to just keep
reserving time to improve the codebase. Always, continuously, refactor. Keep
paying off your debts. Something-something Lannister.

But the second part of that negative feedback loop is often ignored: we should
keep the interest low. With low interest, having a large debt is fine.

## Keep the interest rates low

For example, if we borrow $1000, over 200 weeks, with a weekly interest rate of
2, 6, or 12%, and don't pay off anything, this is the difference:

| loan	| 2%	| 6%	| 12%|
|------|-----|-----|----|
|$1,000.00	|$2,997.74	|$5,601.05	|$10,607.13 |

With a low interest, 2%, the loan has **grown almost three times**. With 12%, the
loan **grew over ten times**. In technical debt, we cannot calculate it this precise.

But we could take the ratios: If we take on technical debt, with a low interest
(2%), what we built today with two FTE, will cost us the work of 6 FTE in
future to "pay back".
But with a high interest (12%)% would cost us 20FTE in that same future. 
The increased compounding effect caused by the height of interest is real and visible.

**So, how do we avoid paying a big interest? How can we safely take on debt, like
e.g. the company Apple does with money, without going bankrupt?**

One thing I saw between the projects described in the first paragraph, is that
the problematic projects had a high interest. Not so much a high rate of debt.
And that this was always caused by tight coupling. Orthogonality:

> In computing, the term has come to signify a kind of independence or
> decoupling. Two or more things are orthogonal if changes in one do not affect
> any of the others.
> — David Thomas and Andrew Hunt in The Pragmatic Programmer

In a tight coupled our system, a shortcut, quick hack, will easily spread into
everywhere. It will touch everything that you have today, but also everything
that is introduced in the future will be influenced. **This is a compounding
effect**. But worse is that tearing it out in future is hard: after all, the
chance that "paying back the debt" has unindented side-effects grows over time.
**This is another compounding effect**.

## Tight Coupling

By decoupling our system, taking on debt, can be kept locally. Isolated. The
effect, the interest, is not affected by future work on other parts. It is
still there, but only affects our work when we touch the isolated part. And
ripping it out is much easier. If, for some reason, we leave the debt to grow
unmanageable, we don't need The Big Rewrite™ of the entire system, we, at most,
might need to rewrite the isolated subsystem.

A typical SAAS web app may look something like below[2]. 

![Network diagram of a tightly coupled software system](/images/inline/diagram-coupled.png)

We see at least two important problems. And both caused real issues down the
line. Both turned out to be crippling technical debt. In different projects,
though. The first one I saw repeated in three different projects, all three
struggling with the debt it brought. The second is when the refactoring (paying
off the debt) is done wrong, or at the wrong moment. Where the refactoring
itself becomes the technical debt.

We can see that everything is coupled to "role" and "user". The infamous
User-becomes-a-God-model issue. E.g. to answer *can a user create a task in
this project*, the developers coupled almost every class to every other class.
The *subscription-Plan*, together with the *Role* determine what actions a *User*
can take on *Task* in a certain *Project*. To answer that question, we are
going through six of the ten classes. We have tightly coupled over half of our
codebase. Obvious problems arose: E.g. these codebases had (unit-ish) tests
that would take over a minute, hundreds of lines of code, to set-up a database,
just so the test could then create a task on which it could test stuff. Even if
the test was entirely unrelated to "creating a task", it has to create
subscriptions, plans, roles, users, projects, task, (in a database!) just to test
that "Given a task with status completed, when I edit it, I can only change it
to status new". Such tests ran slow, but also took hours to write.

In both codebases, this technical debt was once, a long time ago, "quickly
added" through a library. Not very well thought through. Technical debt not
taken on deliberate and within constraints. At the time it probably wasn't even
seen as technical debt, not even as a potential problem, but the accumulating
interest wasn't tackled and compounded into a situation where literally a
majority of classes had references to nearly all other classes. 

When, for example, I introduced, a sorting feature on a table on dashboard, this accidentally broke the unrelated PDF reporting feature.
**Textbook tight-coupling**.

The *solution* implemented, however, in both these projects, was to increase
the amount of manual testing (man-hours, interest-related costs!)  to spend way
more on code-reviews that warranted (fear, also interest-related cost), to over
design new features and to simply have downtime, crashes or performance-issues
and timeouts every few months. I.e. to not pay off the debt, but instead
continue paying just the interest. And to allow this interest to remain high.

The second example, from another codebase, is what happens when someone
takes "DRY, don't repeat yourself" too literal. The code had several
upload-an-image-and-attach-that-to-X classes. An engineer saw that duplication,
refactored that into a single class that "handled all uploads". This appears as
good refactoring: paying off some technical debt! But alas, if we look closely
(and with hindsight) it was *accidental duplication*. We, unknowingly, took on
debt instead of paying it off. If we had a modularized architecture, and
enforced it, we probably wouldn't even consider this refactoring.

## Loose coupling

In the projects that did not struggle with technical debt
(but, again, some had large amounts of debt, they just didn't suffer from it),
the architecture looked different. There were clear subsystems: modules. Not
microservices[3], but just well defined boundaries. In some systems classes
could, technically, reach into a boundary and poke around there: it was just
discipline that kept the team from actually doing that.

I've taken the diagram above, and without moving the "classes", I introduced
boundaries: placed them in modules. And I reversed the "attachment"-DRY
refactoring by giving each class its own dedicated attachment back. I did move
any components just to make it more readable though: just added containers.

![Network diagram of a decoupled software system](/images/inline/diagram-decoupled.png)

What we see now, is modularized, compartmentalized architecture. There is an
"Authorization subsystem", which will answer the question "can user with this
ID perform action X on a thing with this ID" in isolation, on its own, using
data only it owns etc. 

If we now take on technical debt in this authorization subsystem (business needs a
log-in-with-github-button yesterday), it doesn't touch anything but this subsystem.
**The interest doesn't go up exponential, it goes up linear**. And if we take on
technical debt in the billing subsystem (Sales needs a free trial which can
access all features), it only touches the finance subsystem. 

The projects which didn't suffer from the technical debt, were compartmentalized
like this. The subsystems isolated. Communication and coupling minimised to
well-defined ports (interfaces, methods etc).

In these projects the teams were confident to take on technical debt. But
*only* if it remained compartmentalized. Never if the "technical debt" meant
introducing coupling. Never if it meant to compromise the boundaries, break the
isolation. Because debt that breaks the boundaries, will compound quickly into a
spiral of compounding interest that can never be paid off.

## Rewrite from Scratch

As long as it is isolated, we also have a clear worst-case-scenario: being forced to
*rewrite the entire subsystem*. The worst possible interest of our technical
debt is known: rewrite subsystem X.

I've actually paid off technical debt this way, a few times[4]. One
of those was an (auto-generated)avatar-subsystem, which took just two days to rewrite
from scratch and turn into a microservice, because, unlike in the first diagram
above, we always kept the classes and algorithms for the avatars
isolated from all other stuff that had to do with "Users". Yet, internally,
within the boundaries of this "avatar subsystem" the code was a terrible mess,
performed horribly, was tightly coupled to a specific storage implementation,
and withheld the entire codebase from scaling up horizontally - it was the last part that could not run parallel. 

Two days, one FTE: That was all it took to pay off our biggest chunk of
technical debt within the company. And we always knew the size of the debt, and
therefore did not shirk back from taking on even more debt: because it's effect
was always isolated. Bounded.

## Conclusion

With proper compartments, a decoupled architecture, technical debt can be
contained. Which causes it's interest, the effort required to pay it off, to
grow linear, rather then exponential. Which can still lead to a crippling debt.
Still lead to compounding interest. But which keeps if far more manageable.

Technical debt, ugly code, allowing us to deliver a feature today, which will
cost us, with interest, much more effort to solve in a year, than we save
today. But sometimes that is what is needed to keep the business afloat. And
often is fine. Provided we keep the interest rates low. 

It is up to the engineers to make this visible. And it is up to the engineers
to keep the interest low through software architecture and discipline. And up
to the entire business to keep paying off the debt, or at the very least the
paying off the interest, because the compounding effect will otherwise grind
the project to halt. Or even cause bankruptcy.

Discussion and comments are welcome over at [this hackernews post](https://news.ycombinator.com/item?id=32660834)

---

1. But in my experience those places hardly exist. Probably, because they won't survive competition where engineers can take responsibility. And because in reality, management and C-level will listen to engineers, but might choose to ignore their warnings. Either because engineers have shown a history of "cry wolf", or because other issues press harder on the business as a whole. Most often the last. And to engineers who lack this perspective for whatever reason, it may look like management is "forcing technical debt" upon them. Without seeing that it's really an "Us", not "them vs me" thing.
2. The actual domain of both the cases where I encountered this was not "project management". There weren't literal "tasks" nor literal "projects". The real code was far more complex, the reality was far worse than what I describe here.
3. Though microservices are the culmination of decoupling, when done right, there are many steps between a "highly coupled system" and "a highly decoupled microservice system". The most obvious being a monolith with properly decoupled, internal modules. And with rigidly enforced (domain) boundaries.
4. In general, I severely dislike "rewrite from scratch". Books have been filled by why this is a bad idea, and I agree. But if the rewrite is isolated, small, and in a well-tested (integration test) system, it might prove the most efficient way to get rid of technical debt. Sometimes.
