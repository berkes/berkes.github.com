---
title: "My Reasons For Using Rust (as a Ruby developer)"
tags: [rust, ruby, programming]
lang: en
layout: post
---

By now, there are thousands of articles explaining why Rust is a good
option/the fastest/cleanest/nicest/whateverest. While reading about objective
attributes that speak for- or against a programming language, a talk by
[Owen Synge](https://www.youtube.com/watch?v=IYLf8lUqR40) stuck with me.

He explains why *he* likes Rust. Why *he* chose it. And what *he* values in a
language. I took this idea for [my rust presentation](/rre-rust/pres.html). And
now wanted to explain it in some more detail.

I like this perspective, because it shows whether the person *promoting* Rust,
values the same attributes; it shows *why* someone chose a language, framework
or architecture with relevant context.

For me, the three most important attributes of a framework or language are that:

* Software should work for decades.
* A system has Good Defaults™: Being Lazy leads to good software; To make "bad"
  software you must employ extra effort.
* It is Simpler (not necessarily easier) to maintain, host, test, and deliver.

I am, primarily, web-developer. Lot's of backend work, with DevOps and
infrastructure automation and occasionally frontend development. But all the
software that I write is to support mobile- and web-apps. This means that
attributes like *being able to run on this 20 years old ACME controller* or
even the performance, are less important or even irrelevant. For me.

I've been developing [in Ruby and Rails since 2005](/tags.html#ruby-ref) and
full-time [since
2013](https://berk.es/2013/10/06/i-am-a-webdeveloper-using-ruby-rails-and-other-open-source/).

I try not to advertise myself as an "X developer", but use the language that
fits the use-case best. On a typical day, I'll write some Ruby, some Python,
kludge around with JavaScript, do some Typescript and write some Rust. 

While I think it's important to train myself to be a
[Polyglot](https://en.wikipedia.org/wiki/Polyglot_(computing) programmer, I'll
always have *one* [Go-to
language](https://twitter.com/tenderlove/status/1561849944083902464). One
language that I know much deeper, for which my environment is tuned, which I
have much more experience in, and so on. Currently that is Ruby, but I'm
quickly shifting that to Rust.

Because Rust ticks those boxes.

## Software should work for decades

Most of my software, over 90%, is archived, obsolete, unused, dead. But in the
rare 10%, I want to be sure that it can be maintained over longer time.
Yet it is impossible to guess up-front what this 10% is. There is software
running, which I quickly hacked up late-night in an emergency. Which has been
provisioning thousands of WordPress servers for almost 10 years now, it got
improved later, though. Yet a very cleanly architectured ORM for a REST
backend, with all sorts of Design Patterns, has ran for a few months in a
staging environment, and then threw out because we decided PHP/Drupal really wasn't
going to cut that project.

Which is why I at least *try* to architecture all code in a way that it can be
improved upon. It doesn't have to be good at the start, but must be possible to
be *made good* later.

The programming language, a framework and its ecosystem solidify a lot of
options early on. More then *The Architecture*, in my experience. It's relative
easy to re-architecture something: incremental refactoring. But it's not easy
to swap out a framework or language for another. That almost always requires
*big rewrite*, which, as we all probably know, is a
[company-killer](https://www.goodreads.com/book/show/17255186-the-phoenix-project).
A wrong choice of language or framework leads almost inevitably to a *painted
yourself into a corner* problem.

And those solidified options should support maintenance over long time. This
is where *software architecture* plays the biggest role, but language has an
important say in this. As does the culture of the ecosystem.

In Rails, for example, it [is made explicitly
clear](https://rubyonrails.org/doctrine#provide-sharp-knives) that doing
"stupid things" is OK. While I applaud the idea that it *is possible*, I have
seen this lead to problems in every Rails project that I worked on. Where maintaining
some "smart" hack, fancy DSL or full-featured library over time required
recurring, and significant cost. Even grinded entire teams to a halt. Not even
able to react to market. But even when, with great discipline, you manage to keep
your application clean and maintainable, there are technical fundamentals, of
the language that make maintenance harder or easier.

Ruby, like Python, for example, requires complex runtime environments and
versioning. Rbenv, Gems, Bundler, whatnot. All of these move all the time.
Every week at least one of my "shelved" Ruby projects, or JavaScript
dependencies needs some critical security update. 
Any Ruby project that I haven't touched for months, requires significant
effort to *just get running locally*. If at all. I have a [tiny rust
plaything](https://spicy-scarlet-slug-demo.onrender.com/) which I wrote, is
finished, and keeps running without me ever looking at it [for months](. As a Ruby
developer, this is a new experience!

This is less visible when you have a team working on one project day in day out.
But I can assure you, the total time spent on upgrading gems, pips, npm, linter,
CI, tests *just to keep it running month-to-month* is significant.
All this is effort I cannot spend on writing the software (that makes me money).

It is more visible in agencies that have many PHP, WordPress, Drupal, Rails or
Django projects. Where a client comes back after 20 months to ask for that X
integration, which then, most often turns into a full-blown rewrite of the
entire project[1]. 

Rust was built with stability in mind. It's one of the core principles is to be
fully backwards compatible and [support versions
forever](https://blog.rust-lang.org/2014/10/30/Stability.html). 

> The release of Rust 1.0 established "stability without stagnation" as a core
> Rust deliverable. Ever since the 1.0 release, the rule for Rust has been that
> once a feature has been released on stable, we are committed to supporting
> that feature for all future releases.

Rust invented a [smart
combination](https://doc.rust-lang.org/edition-guide/editions/index.html) of
versions, editions and releases, in which it can continue rapid improvement to
avoid stagnation, but to ensure the project you write today, will compile and
run in ten years. And to help you upgrade, if you want, but never force you to.

The *crates* system: libraries, with dependency management, support this idea
too. You'll continue to have access to old libraries, can easily keep them
locally, or even on a self-hosted library-server. But where all ruby-gems,
pips, or npm-packages *must* run on the same environment, with Rust you can mix
and mash old and new libraries just fine.

Any future compiler will compile your old rust code, so you can pick up an old
project work on that, alongside any *now modern* rust projects. You'll miss
features, you might be confused by *how stuff was done back then*, but it will
compile. It will compile any old dependencies alongside any newer. And it will
run.

## A system has Good Defaults™

I'm a lazy programmer, or at least try to be. And working test
driven (TDD), this means cutting corners, writing the quickest hack that works,
before refactoring and cleaning up. But often a rough, hard-coded or duplicated
piece of code will make it to production: I also don't like to waste time on
cleaning up stuff that the customers don't need. And even if I, and my team,
were always diligent, and industrious, there will be a deadline, or emergency,
where corners must be cut. Where code is rushed out.

I want my frameworks and programming languages to acknowledge this.

To make *Doing the Proper Thing* easy, and *doing the bad thing* possible, but
harder. That way, I, the lazy programmer, build secure, clean, maintainable software
when I'm being lazy. Will forget a `private` marker. I will forget to make a
variable immutable. I will make a typo in a filename of a source file. I will
forget to mark a dependency as requirement for this one module.

Rust was built with this in mind. And it trickles down into many of the
frameworks, libraries and working-groups.

The most visible is how all variables are immutable, unless you explicitly
make them mutable. How definitions, attributes and variables are private,
unless you mark them public. How no dependencies are available until explicitly
included. How all code is memory safe unless you explicitly mark a chunk as
unsafe. And so on.

You'll have to write extra keywords, insert deliberate markers and keywords to
"do the worse thing". Not that mutable variables are always *bad*, but
immutable, if possible, is better. So when the software makes me think *hmm, do
I really need this to be mutable? What if instead I just...*.

Slightly less visible is how the Rust compiler forces you to handle all
exceptions and errors explicitly. You'll never see your Rust program crash
because some file could not be read, without first explicitly allowing that
crash in the code. And therefore think about that case. This goes for *anything*
that could go wrong. From parsing a CSV, to missing commandline arguments, to
form-fields being empty: if it crashes, you explicitly allowed that crash
(which is as simple as a `.expect("Reticulating Splines")`-call though).

Cargo, the default Rust toolkit, comes with a formatter that will format my
code according to Community Best Practices. It comes with a test framework and
runner. No need to *set that up one day*. It's there, at the first commit. It
comes with a linter. The rust compiler, famously won't compile if it sees
errors. All that is available on my laptop, CI, build system, without any
configuration, or set-up.

Cargo assumes a well-documented layout of the code, that makes any rust project
recognisable, but mostly avoids me having to spend time on decisions on my
directory and file-layout: it follows the code-layout. It's clear where tests go,
it's clear how modules are split, how to name directories.

I can configure or override all this. I can change the linting and formatting
rules (I know at least two former co-workers who would immediately spend days
tuning all this....). But being lazy, I'd rather leave them at the defaults. And
those happen to be *extremely well thought out*.

## It is Simpler to maintain, host, test, and deliver.

Rust -by default- statically compiles its runtime and dependencies in the
resulting binary. This comes at the cost of rather big binaries, but it means that
I can just plonk the compiled binary for Linux, onto a Linux machine and run it.

All dependency management is done compile time. This makes deployment as easy as 
an rsync or scp and a restart.

It makes a CI workflow ridiculous simply: a mere `cargo check` or `cargo build
--release`. No need to setup rbenv, or compile the right version of node or
python. No need to add test frameworks or set up linters. It's all there.

The built-in test-runner will parallelize your builds, will find the tests
based on naming conventions. Will build the project in test-mode, will report
in one of many popular test-report formats. And so on. All without
configuration or set-up.

In a typical Ruby project, almost half my tests are to catch cases that a
proper type system would catch. Things like *what if the email is null* or
*what to do when the file cannot be read*. With Rust, I trust the compiler for
all this. My tests can then focus *only* on business-logic. I write and run a
lot less tests.

Delivering the software is about as easy as deployment. Just email someone the
binary, or .exe and have them run it. No need to unzip jars, install runtimes,
check for versions, DLLs or .so files. The binary for your architecture will
most likely just run.

And when maintaining software, complexity is the enemy. Simple the antidote,
but getting there, [is not
easy](https://bradapp.blogspot.com/2006/05/simple-aint-easy-myths-and.html).

Rust doesn't offer direct tools to help make software simpler. I'm afraid
that's more of an art. But it does offer a well-designed, large standard
library. Every week I find a chunk of code that I can replace with a single
call to something Rust offers out of the box. Often removing tens or even
hundreds of lines of code. And more often than not, you don't need third party
libraries or even frameworks to build a feature.

Rust promotes *commandline tools* in it's tutorials and books. Rather than
desktop, HTML or GUI applications. It makes it easy to rapidly crank out a new
project, rather than shoehorning a feature into the existing project (make the
"good option" the "easy option"!). 

## Any downsides?

Rust is certainly not perfect for me, though. 

The *lazy* trait, has another perspective, for example. I don't always *want*
to think about a potential error like, say "the CSV file not being UTF8", but
Rust forces me to deal with that edge-case. Even if this is a tool to run over a
single CSV file and then get archived. Developing in Rust is certainly slower
for me, than in Ruby. Part of that to experience. But a large part to how rust
forces me to deal with all sorts of use-cases always, all the time.

While I appreciate that Rust has no class inheritance, and relies only on
composition, Its lack of classes and objects are unfamiliar to me. And require
me to re-learn a lot of design-patterns. To design setups that I commonly write
without even thinking about. I expect this to fade over time, as I gain
experience with traits and structs, but I do miss it often.

I typically try out ideas outside of my codebase. A quick, isolated proof of
concept or mock. Isolation being the key. With python, JavaScript
or Ruby that is a mere `python3`, `node` or `irb` away. Rust has an [online
playground](https://play.rust-lang.org/) but I miss being able to do this
locally. A quick `cargo init trial` works, but I find it to still be a too big
hurdle often, and continue hacking in my actual project. And inevitably get
distracted by some incompatibility or unrelated error, and then fail the PoC.
It doesn't have to be a REPL, just a really fast scratchpad or temporary
workspace. 

But even when I work in Python, or Ruby, Bash, JavaScript, I apply the lessons
that my newest senior peer-programmer has taught me. The lessons that the
Rust-compiler taught me. So even when I don't write Rust, Rust has made me a
better programmer. Or less-bad, maybe?

----

* [1]  I consider this a terrible business model; I know from own experience that
rewrite or upgrades to newer versions are a significant source of Revenue for
Drupal agencies. I dislike this very much.

* [ ] It is perfectly possible, though to compile a binary that dynamically links, or
requires external runtimes or other dependencies. But that requires extra
flags, config and work. Another example of the "good defaults".

