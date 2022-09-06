---
title: "Using a Framework will harm the maintenance of your software"
tags: [maintenance, frameworks, rails, django, symfony, rad,
architecture]
lang: en
layout: post
---

In this article I'm putting together my quotes, thoughts and notes on the idea
that Frameworks harm the maintainability of the software you build in that
framework. I'm proposing that Frameworks:

* are harming maintainability, but not deliberate.
* have different goals than you or your team.
* make trade-offs that harm maintainability of the projects built in them.
* are designed to take your project hostage.
* offer some their benefits, and *don't* harm maintainability, when used
  in a decoupled fashion.

## What is a Framework and what isn't.

In this article when talking about a framework, I mean a narrow
definition. Not just any third party code used, and not
just a methodology or architecture:

> [...] a software framework is an abstraction in which software, providing
> generic functionality, can be selectively changed by **additional
> user-written code**, thus providing application-specific software. [..]
> Frameworks have key distinguishing features that separate them from normal libraries:
>
> * inversion of control: In a framework, unlike in libraries or in standard
>   user applications, the **overall program's flow of control is not dictated by
>   the caller, but by the framework**. This is usually achieved with the
>   Template Method Pattern.
> * [...]
> * extensibility: A user can extend the framework – usually by selective
>   overriding – or programmers can **add specialized user code to provide
>   specific functionality**. [...]
> * non-modifiable framework code: The framework code, in general, is not
>   supposed to be modified, while accepting user-implemented extensions. In
>   other words, **users can extend the framework, but cannot modify its code.**

Emphasis mine, from [wikipedia](https://en.wikipedia.org/wiki/Software_framework)

Frameworks, by definition then, offer functionality, behaviour, flow and
defaults all of which are built in, some of which is unchangeable or dictated.
They allow a user to add code, rather then change the external code.

The maintenance-problems that frameworks can introduce, apply to all
software-frameworks, but my experience is limited to frameworks for *web
services* (API, backends, full-stack), *commandline* and *GUI*. The examples
limit to web-frameworks only. Because in 2022, more and more software is on the
web, or moving there.

People use frameworks, because it is supposed to make software-development more
standardised, faster, easier, more secure, better scaleable, more consistent or
*more fun*. Ironically, the Wikipedia lemma doesn't provide any benefits for
using Frameworks, only downsides.

The idea behind the Standardisation, is that developers are forced to work in a
predefined way. That organisation of code is enforced and that APIs and logic
becomes recognisable across projects that use the same framework. Yet the only
scientific-ish prove I found hints at the opposite. The [State Of the DevOps
report](https://puppet.com/blog/2021-state-of-devops-report/) indicates that
technology such as use of frameworks, matters little for success. And enforcing
those, even less so.

Companies that have..

> A team that defines the standards, processes, practices,
frameworks or architectures that other teams must follow.

...are amongst the lowest performers. Reversed: companies that lack this,
amongst the high performers.

In other words: enforced standardising the tech, doesn't pay off.

This makes sense: if everyone in a company is forced to use, say, Django, for
any project, regardless, there will be a lot of projects where Django is a very
poor choice.

That still allows a framework to offer other benefits within a project or
within a team though. But the *standardisation* (and consistency) benefit
seems to not exist, and even be opposite.

The attributes of speed (of development), *more fun* and ease very much
depend on what phase a project is in. A framework tool that generates the
code for the models saves you writing initial code[1]. I might save . But
on the scale of seven people developing that software for over a decade,
that half an hour is insignificant. Especially because over such a long
period of time maybe hundreds such models can be generated, yet all the
other tens of thousands of hours are spent modifying and maintaining
existing code. Below I'll show how this "speed of development" actually
counters the speed of development over longer periods of time:
harming maintenance.

And the attributes of security and performance are very
context-dependant. Frameworks, by definition, add a lot of code to a
project. Which at best isn't in the way, but at worse offers a very big attack
surface and a giant amount of overhead. Below I will show how these
attributes can be achieved, easier even, by not using a framework.

## What is "harming maintenance."

When we launch our software, and it becomes a success, in the sense that
it is used, we will maintain it (or we should). Maintenance is typically categorized:

* Corrective Software Maintenance - AKA bugfixes
* Preventative Software Maintenance - AKA preventing the bugs, stability
  improvements
* Perfective Software Maintenance - AKA finishing touch.
* Adaptive Software Maintenance - AKA continuous development.

In this article, though, I consider any changes to software after it is
put to used, to be *maintenance*.

Anything that slows down such continued development over any period of
time, I consider *harming it*. So if the use of framework slows down
shipping of new features today, it is causing harm.

And when the use of a framework allows shipping features fast early on, at the
cost of slowing down the shipping of new features or changes later on, that is
harming maintenance.

A third type of harm is when the framework diverts resources into work
that has nothing to do with delivering value to your customers. Work
like upgrading, deprecation, education and information ingestion
(learning about new features, e.g.). Those take away valuable (and often
scarce) resources. All the hours you spend upgrading your stack
are not spent delivering new features that users or market want.

And a last type of harm, is when a framework that was once a good fit for a
project, is no longer a good fit. Because either the framework moved in a
different direction, or because the software built in that framework moved in a
direction that no longer fits the ideas or ideal use-case of the framework.

## Frameworks have different goals than you or your team.

> And yet despite the huge commitment you've made to the framework, the
> framework has made no reciprocal commitment to you at all. That
> framework is free to evolve in any direction that pleases its author.
> When it does, you realize that that you are simply going to have to
> follow along like a faithful puppy.

Here's what [DHH apparently has to
say](https://www.flickr.com/photos/planetargon/127984254/), about your
concerns of the direction he is taking his framework. Most frameworks authors
aren't that hostile, though. They honestly care about their users, I'm certain.
DHH probably does care about how happy you are when using Rails too, even when
he doesn't express that as clear. But then too all these authors care more
about *onboarding people* and *keeping people on board* than that you can still
continue to deliver value in fifteen, twenty years.

When looking at the *marketing* of a series of popular web-frameworks,
we see that of [Django](https://www.djangoproject.com/start/overview/),
[Rails](https://rubyonrails.org/),
[Spring](https://spring.io/why-spring),
[Gatsby](https://www.gatsbyjs.com/), and [Symfony]() only the last
mentions maintenance or Maintainability: (emphasis mine)

> Speed up the creation **and maintenance** of your PHP web applications.
> End repetitive coding tasks and enjoy the power of controlling your
> code.

Though how they provide this, is handwavy:

> and the use of Best Practices guarantees the stability, maintainability and upgrade-ability of the applications you develop.

Slightly less provoking as DHH above, is the more official stance of
Rails on how it supports you over a longer period of time:

> When a release series is no longer supported, it’s your own
> responsibility to deal with bugs and security issues. We may provide
> backports of the fixes and publish them to git, however there will be
> no new versions released. If you are not comfortable maintaining your
> own versions, you should upgrade to a supported version.
 -- https://rubyonrails.org/maintenance

At least it's honest and clear: the framework won't support you over
time. You'll have to divert resources in updating and migrating your
project to keep your project on recent versions of Rails.

But even when the frameworks' goals and yours perfectly align, you cannot
predict the future. Especially at the start of a project, this future is
unsure. Will the product always be a web-app? Are we certain we will only
ever release this application for Windows desktops? Do we know for sure that a
relational-database is the best storage in future? Do we need that
scalability? Are we certain we don't need that scalability? Will there be
javascript PWAs in ten years? Twenty?

Yet, when building your product *in* a framework, you choose, very early on,
to marry it. Forever together. At a moment that you have the least information
to make that commitment, you are making it.

## Frameworks make trade-offs that harm maintainability of the projects built in them.

Like with any software, the authors of Frameworks, must make trade-offs.
For example, reading the payoffs on their websites, we can clearly see that
 all popular frameworks value speed of development and scalability most of all.

Yet, both those traits are perpendicular to maintainability. At worst they
hamper maintainability, at best they don't improve it.

Speed of development is sometimes achieved through code-generation
(boilerplate), but more often through inheritance. When the framework generates
code for you, it creates the code, but doesn't maintain it. E.g. a *framework*
like react-boilerplate or create-react-app work this way. They are really
"just" fancy code-generators. Code that must be maintained or else it will
degrade. Will accumulate duplication, inconsistencies, incompatibilities, etc.
So called "code rot".

The other method is where the framework solves this code-rot problem. By
sticking all that code in superclasses (or reusable functions), it offers such
"code" in a single, often logical place instead of spread out.
As a user (a developer using the framework), you inherit a class, or mix in a
class, module, or function. The framework is injected and through this injection
offers an API for you to use.

E.g. with Rails, the default single inheritance for what is considered "A
model", adds a mind-boggling public surface to your objects. E.g. a Post,
having three fields in the database:

```Ruby
class Post < ActiveRecord::Base; end
```

This gives you no less than 767 public class methods and 487 public
instance methods: you inherit over 1200 methods by subclassing[2]! 

Because your projects' Post class now provides these, **you are
responsible for maintaining them**. After all: *your* class offers them to 
its users. These methods live on your class, your instances.

But they live deep down in the code of the framework. You are responsible, but
lack the ability or power to maintain them. It's in the definition of what
makes it a framework that you cannot change this, cannot own it.

The framework now might decide that at some point a method like
`title_came_from_user?` method may be deprecated or changed. We now offer a
large public interface by mixing framework into our project, we will use that
throughout our code but hold no power over it. We are at the mercy of updates,
backwards-compatibility-guarantees or goodwill and availability of the
framework authors. Some of which may dismiss your worries with an R-rated
slide. Most of which, though, are more friendly but lack the resources to keep
all this API stable forever. Yet a framework such as Drupal (if one may call it
a framework), comes with an upgrade that is so immense, in practice it means a
complete rewrite of the project. Every few years! Others are friendlier and try
to remain backwards compatible, or offer much smaller upgrade steps. But all,
each and every one, has updates. That we must follow. On which we must act.
Which occasionally require us to change existing code.

Many frameworks aren't as extreme as Rails with its public interface of over
1200 methods. But all offer an API, functions, classes, to be used by the 
user of the framework: it's the whole point of the framework to offer this!

We will use this code. We will then, over time, couple our code ever more tightly
to the framework. Up to a point where it is completely dependent on that
framework.

This is also why people generally say that one develops *in a framework*, not
*with a framework*. You build your project *in* the framework.

And the performance or scalability they guarantee is performance *compared to
other similar frameworks*. Software is made more performant and better scalable
through architectural choices, low level optimizations and, above all, less
code. Not more. And it is somewhat of a false-flag operation: frameworks have
often been in the news because they were the source of visible performance
issues for projects built in such frameworks. Rails' became known for its bad
performance through twitters' Fail-Whale and then Twitter announcing it rewrote
its Rails codebase in Java. It's a statement to divert from the fact that most
frameworks add significant performance overhead on a project.

All of the common solutions to scaling and performance-issues: architectural
choices, low-level optimizations, and "less code" require the freedom to change
our code when we find we have performance issues. Choices and optimizations we
can only make later on, when we have information. If anything, frameworks harm
our scalability, because they make it harder to move to other frameworks,
architectures or set-ups that fit our usage-profiles better. When you get
Fail-Whales, you want to optimize problematic code, not rewrite everything in
Java (or Rust, its 2022 after all).

## Frameworks are designed to take your project hostage.

By mixing in framework code, and by using it, a project becomes tightly bound
to that framework. Every time we write a `belongs_to(:author)` in Rails or a
`models.ForeignKey("Band")` in Django we are binding your project more tightly
to the framework.

Good, maintainable binding, is when we have a tiny surface where we
bind our domain to the framework. Bad, hard to maintain binding is when this
surface is big, fuzzy or completely absent. Even worse, even harder to maintain, is
when our domain and businesslogic gets intermixed with framework code. When
high-level business-concepts mix up with low-level delivery mechanisms. When
business-logic gets spread throughout those delivery mechanisms and we must read
through controllers, views, models, factories, services, configuration-files,
libraries, framework code, just to understand why a User may be created in case
A, but not in case B.

Frameworks abstract away many of the technical details. They most often
provide an ORM that abstracts away how we deal with a database,
sometimes to a point that developers don't have to know they are using a
database at all. Just call a `model.save` or a `User.find_by(email:
"example.com")` and it will save or fetch data regardless of whether it
lives in PostgreSQL, sqlite or even MongoDB.
The trade-off here is that you now don't bind to a specific database, but bind
to the ORM and Framework. You get freedom to use any database, at the cost of
the freedom to use another ORM and framework.

Delivery mechanisms like HTTP, storage (like databases), event-buses,
logging, messaging, all of these are details. They are irrelevant to
your business-logic, you domain.

> The architecture of an accounting app should scream "accounting" not Spring & Hibernate.
[@unclebobmartin](https://twitter.com/unclebobmartin/status/118365858581069824)

But frameworks don't just put themselves up front, they encourage mixing up
this logic. They offer their API, classes, functions for us to use throughout
our business-logic. So not only is our code then tightly coupled to framework
code, it gets mixed up. Even worse, they often encourage us to spread this
business-logic all through these "details". In a web-MVC the M is the storage,
the V the template and the C the http layer. There is no single, logical place 
to keep your domain code: the framework actively encourages you to just drop
it wherever it happens to be easiest. Rather than where it will keep your code
most maintainable.

It is not uncommon for a project in a framework to look something like:

```Ruby
def create
  if User.exists?(email: params[:email]) 
    render :new, status: :already_exists 
  elsif user.save
    flash[:success] = flash_message_for(@user, :successfully_created)
    redirect_to edit_admin_user_path(@user)
  else
    render :new, status: :unprocessable_entity
  end
end

def user_params
  params.require(:user).permit(permitted_user_attributes |
                               [:use_billing,
                                role_ids: [],
                                ship_address_attributes: permitted_address_attributes,
                                bill_address_attributes: permitted_address_attributes])
end
```

When we read closely through this, we experience a rollercoaster ride. There is
hardly any cohesion, and we jump from Domain logic, via Framework APIs to
delivery-mechanism-details to security-details, to businesslogic and back. Up
and down the stack. There is quite some business-logic in what should be purely
a HTTP-layer.

In a clean, or screaming, or hexagonal, or any layered architecture, we
separate those concerns and avoid mixing them up, while keeping the
business-logic contained to a single place.

Frameworks don't play an important role there, that's the whole point of a
self-contained, isolated domain area (or layer). Such domain-code
doesn't rely on *details* such as how to deserialize JSON, HTTP-headers,
database-transactions, connection-pools, etc. Such a domain merely cares
about it's domain language: it calls an abstract `posts_repository.create(post)`.

Such systems are far better maintainable, because the role of all code
is clear. It is isolated and has great cohesion. If ever you change
anything about how Posts are stored in the repository (you move away
from that MongoDB, and choose to just write out markdown files on disk)
this change is isolated to the `PostsRepository` and that alone. Nothing in
your business-logic needs to be touched.

When you move such details to the side, into isolated, bound layers only, the
software becomes more maintainable, because changes are isolated. And with such
an architecture, a framework, if used at all, is moved aside as well. It lives
in the fringes of your application. It can be easily replaced one piece at a time.

## Frameworks offer some their benefits, and *don't* harm maintainability, when used in a decoupled fashion.

Many people will argue that *not using a framework* means *write
everything yourself*. This is a false dichotomy. We can use libraries
and frameworks just fine. We should use code. Should avoid writing the same
logic over and over. We should depend on (security)experts for
security-critical code. We should not write our own cryptography, or
password-handling if it can be avoided. We should use off-the-shelve libraries 
for this.

But we should give them a clear, and well-isolated place in our project.
The code that routes HTTP-paths to method-calls (or commands or whatever
your domain offers at its boundary) lives in aside, in a HTTP layer, it's a
detail. And it certainly not ever deals with business-logic. The more
isolation, the better maintainable. 
The code that handles e.g. token authentication should not be written by us, but
be included in a single, well contained, bounded area. One that encapsulates this
and translates it into domain language, preferably. E.g. behind a
`authentication.is_known_as_admin(request.token)` rather than sprinkled throughout
our controllers, commandline-interfaces, scripts, or async jobs.

The code that sends out messages, is called by your domain as a simple
`messenger.deliver(recipent, body)`. Behind that method call might be an entire
message-delivery framework, one that does exponential retries, buffering, smart
routing, can handle both push-notifications and emails, etc.

The code that persists the Expenses, is called by your domain as a simple
`expenses_repository.add(expense)`. And might use the most complex
distributed-database framework on earth. Or it might use a fancy framework to
push expenses into an online accounting tool.

The point is not to never use frameworks, but to isolate them. To call them
from a single place. One that we own. That we are responsible for and that we
limit very much in what it can touch.

Yet most frameworks come with all those details up-front and mixed up. They
often make it very hard, if not impossible, to be isolated. To be contained
to a single interface. And when they do, they stop being a framework and start
becoming a library very fast.

## But why are there no frameworks that offer this?

First, that would defeat the purpose. Because the idea is to have
independence of a framework. And building a framework with the sole
purpose of not using that framework is rather counterproductive.

Secondly, well-maintainable software can evolve over time, to match
changing needs.

When you migrate from HTTP to an event-bus as delivery mechanism, you no
longer have need for an HTTP framework, obviously. When you move from a
web-based service to one using only native mobile apps, you no longer
need all the HTML/CSS/asset stuff, but do need a way to serialize and
handle JSON requests. Maintainability requires your software to evolve
with you. A HTTP-framework will offer HTTP. Some MVC framework will offer
an ORM that uses a relational database. But when your needs change and
you no longer need  all the HTTP, or templating, it is still there. When
you decide it fits the business best to store data in a database, but
rather distribute it as JSON-files an ORM framework will become
obsolete. Yet it is still there.

Third, one often hardly needs a *framework* to do stuff. For
example, an architecture like [CQRS](https://www.martinfowler.com/bliki/CQRS.html)
is really mostly a simple `if(is_command) { command(params) } else {
query(params) }`. You don't need a framework to do an if/else.

And last, maintenance isn't about using specific tools or frameworks.
As Symfony aptly pointed out:

> and the use of Best Practices guarantees the stability, maintainability and upgrade-ability of the applications you develop.

One of those "Best Practices" is to not let a framework rule your
project!


----

* [1] Something that is probably much better left to either standalone tools,
IDEs, or IDEs leveraging those standalone tools. E.g. any editor or IDE worth
its disk-space has some form of "snippets" or "templates" in 2022.
* [2] Ruby, the language Rails is written in, comes with quite a lot of methods
  already. But even if you remove those from this list, you have over a
  thousand methods offered by Rails.
