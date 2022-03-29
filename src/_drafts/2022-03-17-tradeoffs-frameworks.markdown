---
title: "The Tradeoffs of Web Frameworks"
tags: [rails, framework, architecture]
lang: en
---

> Abstractions All The Way Down
TODO: look up this quote

Abstractions are the primary tool for a software developer to organize their code.
Abstractions go far beyond things like "naming a file" or "sticking it in a
directory". Abstractions follow software-design-patterns, are documented, but
most of all: they draw clear lines. Most of us will automatically draw lines in
our codebase, and organize it, because we naturally feel that just throwing
everything in one function or file is a recipe for disaster.

This is not new and not controversial either.

TODO: look up who "He" is.
In his 1972 ACM Turing Award lecture, he described the process he envisioned
for consistently delivering high-quality software. He saw the 3 keys to this
revolution

>   The use of abstraction to make programs intellectually manageable
>   Developing correctness proofs alongside the software
>   Approaching the task of software development as humble programmers

Or, as TODO: lookup this quote puts it:

The most direct application of Dijkstra’s advice is to write code that is as
simple as possible. This means that we avoid clever tricks. This means that we
use abstraction to simplify code, not make it more complicated. Simplicity
improves the maintainability of the code over the life of the application.

# Frameworks are not abstractions, they enforce them

A framework in itself is not an abstraction. It's a scaffold (a literal
framework) to hang your code in abstractions.

For example, with Rails, we have Model, Views and Controllers (MVC) as
abstractions. Controllers are where we put our abstractions of "the things that
trigger the work to be done on recieving a request". Models are where we put
our abstractions of "things that we can do the work on" and views are how we
display "those things that we did work on".

Wether or not the M, V and C are good abstractions for a web-application, is
for another post (spoiler alert: they aren't) but this is what we get from
the framework Rails: Models, Views and Controllers. Those are the extent of our
abstractions.[1] We are forced to use these abstractions. And adding our own
abstractions is only possible insofar that they don't conflict with the M, V and C.
More practically: if your use-case warrants a repository pattern, as abstraction
around the database storage, you are out of luck: Rails dictates ActiveRecord, an Object Relation Mapper, that lives *inside* your models (and not aside from them), regardless of whether you want this, need it,
or whether it is a good practice for your use case (it probably is not, but this too is for another article).

So, if abstractions and specific architectures are enforced, and chosen for you, you should be damn sure they are fit for your use-case. Today, and in near future. 

How do you know that they are that? When starting, you lack all this
information. Sure, the person with The Biggest AppIdea in years, may say "we
need this to scale up to 600000 users in three years, but as a developer, your
answer to those wishfull thoughts should best be a conservative "YANGI", You
Ain't gonna need it [that scale]. 

But when the domain expert tells you that shipping boxes and managing their
inventory requires connecting to a gazillion external services, is highly
eventual-consistent in nature, and that correctness over time is far more
important than lookup-speed, and that scale is in order of tens of users per
minute, and that a lot of input comes from CSV files uploaded to network
drives, you better be damn sure to choose an architecture that is fit for such
a domain.

https://www.codewithjason.com/abstraction-in-rails/
> Sadly, many Rails apps have a near-total lack of abstraction. 

> The fix to this particular problem could be a very simple one: just move the trigger code out of article.rb and put it in a module somewhere.
TODO: look up the quote by DHH "put it in modules / concerns".

TODO: a module is not abstraction - look up critique for
concerns/modules


## Architectures versus Frameworks

A framworks imposes one or more architectures on us. So a framework implies
certain architectural choices. But architectures don't require frameworks. The
might make a certain architecture easier to use, or faster to start with. 

This distinction is important. Because many of the benefits typically ascribed
to *the framework* actually comes from a (standardized) architecture.  The fact
that a new developer knows what models, views and Controllers do, is because
that developer is familiar with the MVC architecture (and in this case design
pattern), and not because that developer is familiar with Rails.[3]

To sum them up, the benefits that design patterns and architectures offer us are:

* Smart people, much smarter than me, have designed solutions for my problems.
* Documentation and familiarity - e.g. the term "Adapter Pattern" implies
  details that developers now don't need to convey. Just use the term, and
  everyone know what we mean (right?).
* Reusability. Of own code, of libraries, modules and so on.

And, depending on what architecture and design patterns are chosen, they
themselves offer us the benefits of solving specific problems; their entire
reason for existing is to solve common problems in common ways.

This leaves but a few benefits ascribable to the framework employing those
architectures:

* Choice for architectures made for you. (less Bikeshedding)
* Startup speed. Getting started often extremely well documented, with good
  training available, and often guided with neat scripts and tooling to speed
  this up even more.
* Tooling. Scripts, commands, or other automation to speed up generation of code.
* Clear conventions like placement, file and directory structures, styling and
  naming an so on.
* Consistency, which follows from those conventions.

## Choice of architecture.

When we start with Rails, Django, or even an [Event Source
Framework](https://sequent.io) we choose for a certain architecture. As I said
above, this is a clear benefit of a framework (and not a benefit that is
actually offered by the underlying architecture). 

But is that good? Architectures come with massive tradeoffs. All design patterns
have a strict list of preconditions when they apply and when not. Each architecture
has use-cases in which is shines and use-cases where it's a hindrance instead.
It very much depends on your use case, what architecture is applicable.

From this, we can deduce that a framework isn't appropriate for every use-case.
I don't think it is particularly controversial to state that an Microservice Event-Sourced
architecture with an Enterprise Service Bus, will actually harm your project for many use-cases.
Yet we all know that some use-cases are helped (or even saved) by such a set-up.

So why then is it rather controversial to say the same thing about some MVC
architecture? About Rails, or Django? MVC has its strong and weak points. It's
use-cases in which is shines and use-cases in which it harms the project. And
therefore, so does Rails (even if it weren't so damn stubborn -- sorry,
opinioated).

Why is that? One answer could be that MVC applies to a broader set of use-cases.
I'm convinced, though, the answer is that the downsides this architecture aren't
visbible, or applicable in early state of the project. 

Use-cases over another axis, so to say. Not use-cases as in domains, niches, or
even scale, but use-cases over time. A demo for a video-streaming-site proving
you can serve to is an entirely different use-case than a ten-years-old
video-streaming-site serving hundreds of thousands videos to millions of users.
Even if their domain, niche, and scale (albeit probably virtual) are the same.
A decades old bookkeeping app is different from one started today.

I'm convinced that MVC and by extension Rails, applies well for use-cases in
early phase, but much less when it becomes legacy. Below, I'll explain why.

## Startup Speed[4] and Tooling

Rails became famous for (and probably also because of) its "20 minute blog"
demo. In which a developer without any prior knowledge of Rails or even Ruby,
could have a blog up and running in 20 minutes. Back in 2005 that was
mindblowing. Many existing frameworks adopted this Rapid Application Development
paradigm. Many new frameworks in languags other than Ruby, followed suite or
blatantly ported the idea into another language.

Such frameworks offer many tools such as `rails new tinderfordogs`, `rails
generate CreditCard`, or `django admin companies`. Optimizations for very
infrequent tasks . Quick: how often would you run `rails new` in a rails project that lasts
last 15 years? once: even if it saved you a week of work, that optimization is
neglegible (and it saves you at most 10 minutes). And even if you start new Rails
projects every week, its an inneficient optimization.

Such tools are not about making our daily work more efficient they are two other things:

* Documentation through automation
* Marketing for the framework

The latter is an echo of what Uncle Bob Martin, in his famous Rant on Frameworks, calls

> ..... TODO: look up quote about frameworks are for framework developers

The former, while valid, is *in the wrong abstraction*. Instead of
writing a lengthy getting-started-guide explaining what steps to take and what
code to place in what files in order to see Hello World, a script is offered that
does all those steps for us. Instead of a lengthy (and alwyas outdated)
internal developers manual explaining what class to inherit, what methods to
use, what testfiles to add, what indention to use and so forth, we offer linters,
commands, templates and snippets.

This automatiion, however, is a different concern, and belongs in a different
abstraction. A much better place, is within your IDE, or as part of a makefile,
or some scripts/ directory offered by your team. In fact, many IDEs already offer
this. Most editors have snippets (code libraries) and many tools to automate
common tasks while coding exist on their own; outside of frameworks.

## Clear conventions and consistency

That automation above, things like linters or style-checkers in e.g. a CI, or
part of your git workflow, provide these conventions too. And enforce
consistency. In fact, many frameworks simply include these linters or set up
the CI for you. So the only benefit the framework offers, is that it saves you
the time to set up a linter. It saves you maybe an hour (but more
realistically: minutes).

The common linters, in Javascript, Python and Ruby (I don't know about .net or
PHP, sorry), come with language specific defaults. What is better than having
a clear, consistent convention spanning everyone that uses a framework? Having
a clear, consisten convention spanning everyone that uses the language!



Why Rails?

This is not about Rails. Rails is just an example, and used because it's the
most famous in this area. The most telling also.

Rails has been a frontrunner in web-frameworks. It made MVC popular for web, it
made MVC a de-facto standard even. I know Rails best, because it's what I have
most and most recent experience in. Wherever you read Rails, you could fill in
any Rapid Application Development (RAD) or Model-view-controller (MVC)
web-framework: *Swing* (Java), *Django* (Python), *Symfony* (PHP) and so on.[2]

I'm also familiar with Drupal, WordPress, CakePHP (a now mostly dead, almost
exact copy of Rails in PHP) and Sinatra (Ruby) for production applications.

The *production* part is crucial, as my entire argument hinges on
*maintainability over long time*, and not about *having fiddled wwith it*
(proof of concept, demo, hobby and son on).

Testing

https://dzone.com/articles/unit-testing-smells-what-are-your-tests-telling-yo
> Some mocking is an important part of any test suite because it makes testing your code much easier. But excessive mocking usually indicates design problems. You may have too many dependencies in the class under test, or you may be testing at the wrong level of abstraction.

---
[1] We do get more: Jobs for async work, Mailers for sending mail (but no other delivery mechanisms), Validators for more complex input validation, Middleware and so on. Those allow us to place our abstractions for less common -but common enough- concepts. Most are added in later versions, afterthoughts, so to say. Many don't mix particularly well with MVC.

[2] I'm not intricately familiar with all of these, so please correct me, when one
such RAD or MVC framework does it all different and actually fixes the issues
I'm describing.
[3] Allthough, to be honest, that developer is probably familiar with MVC
through Rails. I doubt she sat down and studied MVC for a month and then
applied as a Rails developer. But that would be possible. Unlikely, but possible.
[4] To be clear, I mean startup of getting the project in production, not
startup speed as in booting up the application. This distinction is important,
because in Rails, startup time is a real and often discussed, problem. The
irony is that, while Rails makes it very fast to `rails new facebookforcats` it
is very slow when you make a change to some code to see or test that: that ten
minutes you won, ten years ago when starting, is wasted in a single day,
waiting for restarts, test-re-runs, or code-reloads.
