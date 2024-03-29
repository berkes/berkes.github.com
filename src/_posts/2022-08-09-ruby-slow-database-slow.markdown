---
title: "It's not Ruby that's slow, it's your database"
tags: [ruby, performance]
layout: post
lang: en
---

Many people keep repeating that Ruby is slow. It is. But that doesn't matter,
because your database is so much slower that it is the bottleneck. So, an
alternative title would be "Ruby is slow, but that doesn't matter for you."

While writing a gem that [offers key-value storage in your existing Postgresql
database](https://github.com/berkes/postgres_key_value), and benchmarking it,
my old mantra kept popping up: Ruby isn't slow, the database is slow. So much
that I decided to collect the benchmarks and backup that mantra for myself.

In the industry, this is called
[I/O-bound](https://en.m.wikipedia.org/wiki/I/O_bound), and is opposed by
[CPU-Bound](https://en.wikipedia.org/wiki/CPU-bound) performance. Most Ruby
performance issues that I helped solve, fell in the first. The slowness of Ruby
wasn't causing any problems.

## Ruby is slow, but...

Let's be clear: ruby is slow. The garbage collector, JIT compiler,
its highly dynamic nature, the ability to change the code runtime and so on,
all add up to a sluggish language.

However, when People say "Ruby is slow," when diving deeper, this critique
often falls in one of three categories:

1. Yes, Ruby is slow, and that is a problem for our use-case.
2. Yes, Ruby is slow, but in practice this does not matter for us.
3. Yes, the Ruby application is slow, but really, its the stack, not just the language.

I want to dive deeper into the last one, but let's get the first two out of the
way, first.

Ruby is becoming faster year over year, and while that is very welcome, it
probably won't matter in the bigger picture:

> I also think that speed isn't a major factor slowing down Ruby adoption. Most
> people who use Ruby don’t need it to be faster. They like the extra free
> speed, sure. But they weren't avoiding Ruby for speed reasons.
> -- https://www.fastruby.io/blog/ruby/performance/why-wasnt-ruby-3-faster.html

Because performance really is very dependant on context:

> [...] how fast does your system need to be? And how fast is it
> now? If you can test its current performance and know what good performance
> looks like, then you should feel confident in making a change. Sometimes
> making one thing slower in exchange for other things is the right thing to
> do, especially if slower is still perfectly acceptable.
> -- [Sam Newman in Building Microservices](https://www.goodreads.com/book/show/22512931-building-microservices)

So, often it hardly matters that it is slow, because your use-case does not
need the scale, speed, or throughput that Ruby chokes on. Or because the
trade-offs are worth it: Often the quicker development, cheaper development,
faster time-to-market etc is worth the extra resources (servers, hardware,
SAAS) you must throw at your app to keep it performing acceptable.

Not always, but often.

### A quick benchmark

To re-confirm how bad Ruby performs, I made a quick benchmark comparing Ruby
and Rust for a (simplified) real-world job that I recently ran into: parse a
CSV, grab a number from a column, then bucket-count the
results. The simplified version does this for a (My actual version did this for
a CSV ten times as big as the example used here). The example counts how many
votes a movie has and groups those counts: between 0 and 10 votes, between 10
and 100 votes etc.

To compare somewhat honestly, I tried to create a version in Rust and Ruby that
are internally as similar as possible. The result is both ugly Ruby and ugly
Rust. Buggy even. And none are optimized for performance. I'm certain the Ruby
and Rust version can be improved (but even as Ruby-expert, and Rust-novice, I
already know the Rust version is easier to optimize further then the Ruby
version).

All benchmark code is found in [an accompanying GitHub repo](https://github.com/berkes/ruby-slow-database-slow).

This is not Proper Science, but it shows the obvious: Ruby is slower[1].
Rust:

```
ber@berkes:db_benchmarks ⌁ time ./target/release/movie_ratings 
Some(0..=10): ###################### - 445
Some(10..=100): ############################################################ - 1208
Some(100..=1000): ############################################################################################################### - 2229
Some(1000..=10000): ############################################# - 914
Some(10000..=18446744073709551615):  - 7

real	0m0,162s
user	0m0,146s
sys	0m0,016s
```
Ruby

```
ber@berkes:db_benchmarks ⌁ time ruby movie_ratings.rb 
10000..:  - 7
1000..10000: ############################################# - 914
100..1000: ############################################################################################################### - 2229
10..100: ############################################################ - 1208
0..10: ###################### - 445

real	0m1,491s
user	0m1,389s
sys	0m0,103s
```

The Rust version is about 10x as fast as the Ruby version. Relative, this is
huge! With larger files this speed difference does not increase linear, though,
but janky. A large part of this time is startup time (hard to measure in this
use-case) and the JIT compiler. Another part is the GC in Ruby "arbitrarily
kicking in" and halting all progress until it is finished: dealing with large
datasets, makes this a real and annoying problem.

But how about the absolute difference here? The Ruby version is just over 1.2
second slower. Enough to be a little annoying while testing and developing.
When you run this over-and-over (in automated tests, I hope!) this gobbles up
mere minutes in a day, though: A total of 1.2 seconds on a script that is ran
about 20 times while developing and then maybe weekly in a cron? Not at all:
You wasted half a minute and just under 5 seconds per month.

I'm only focusing on CPU here, but Memory is just as big an issue, yet far less
visible in the typical use-case of modern software: customers, interacting with
server software, will experience slowness, but won't directly experience memory
use. The main reason, however, not to dive to deep into this, is that
benchmarking memory is rather complicated.

**So, yes. Ruby is slow and using a lot of resources. It makes trade-offs, so
maybe the overall costs, including development, is less. It depends on your
case, is never an absolute.**

## It's the stack, that makes it slow, not just the language.

Now, let's address the elephant in the room: Rails. While there
are some Ruby projects that don't deal with Rails, the majority of Ruby-code
running in production is running Ruby on Rails. I personally write most of my
code in Ruby, but hardly ever write Rails (I don't like Rails very much; another
post, another time), but I'm also aware that I'm an exception that
to the rule: Ruby development is almost always "web-development in Rails."

One issue with Rails (or, arguably, a benefit?) is that it is highly
coupled to the database. Rails is all about The Sacred Dictating Database.
Without a database, Rails is pretty useless, and gets in your way more than it
helps[2]. Furthermore, Rails is about the web. You can do non-web-stuff in Rails,
but that really makes no sense at all: Rails is for HTTP. And Rails is *big*,
massively so[3]. And often chooses ergonomics (developer friendliness) over
performance, as does Ruby, the language. This is fine! But this means that in
Rails, even more than in Ruby, performance *is* a problem.

So, the "stack" means "Ruby on Rails using a database." And because Rails
is web, doing only[4] HTTP request-responses we'll be looking at Ruby in
context of web-services only.

To dissect the issue, I'll be comparing some non-rails, non-http, ruby scripts. 

Ruby isn't particular good at juggling significant amounts of data, yet this is
what, deep down, webservices are all about.
To illustrate the relative performance, we compare writing, and reading a
million records to various sources: Memory, a SQLite database in memory and a
Postgresql database.

Obviously, and unsurprisingly, memory is magnitudes faster than anything else[7].
Postgresql, here, is a docker container that gets only only CPU, and isn't tuned
at all. This is not about the absolute numbers, so it doesn't matter that much
what the exact Postgresql setup is. What matters is the magnitute of difference.


```text
ber@berkes:db_benchmarks ⌁ ruby ruby_slow.rb 
                           user     system      total        real
Mem write              0.005277   0.000000   0.005277 (  0.005271)
Sqlite mem write       0.080462   0.000000   0.080462 (  0.080464)
Postgres write         0.665662   0.151700   0.817362 (  3.068891)
Mem read               0.002772   0.000000   0.002772 (  0.002767)
Sqlite mem read       10.323161   0.021355  10.344516 ( 10.345039)
Postgres read          8.296689   0.041118   8.337807 (  8.682667)
```

**Writing into a database is *slow*. And it gets slower even when you have tuned
the database for read-speed, with indexes, and/or that database is under load.**

The above timings do need more dissecting, though. They don't tell what makes
it slow. And, surprisingly, this is another part of the stack the ORM. I used
sequel, because it is simpler, so we can dissect easier.

Looking at two flamegraphs, we see that when inserting, Postgresql really is the
bottleneck there. This makes sense, because a database has quite some work to do
on insert. Our table is simple and has only one, and then of the lightest type, index.

**Writing to a database is slow. So slow that all other timings become insignificant**.

![flamegraph of the Postgresql insertion variant](/images/inline/out_flamegraph_pg_read.svg)

![flamegraph of the Postgresql read variant](/images/inline/out_flamegraph_pg_write.svg)

On reading, Postgresql is less of a bottleneck. This is partly due to the
extremely simple lookup (no joins, using one index, very little data to fetch, etc). 
The parsing (juggling of data) takes the majority of time: `DateTime::parse`.
Or, reversed: the `DateTime::parse` is such a performance-hog, that it makes the
time spent in the database insignificant.

**We have now identified two performance-problems in our stack: Postgresql, and the ORM**.

To be clear: this isn't to show that sequel is slow, or that DateTime::parse is
problematic[8]. This is to show that the more tooling we add to our stack, the worse
the performance becomes. Again: obvious and unsurprising. But worth reiterating.

Before pulling entire Rails into the benchmarks, lets isolate ORM in Rails:
ActiveRecord. Again, very much simplified and again, the queries don't fetch
anything complex, so the time spent in the database is very little.

```
                           user     system      total        real
Postgres Sequel write  0.679423   0.112094   0.791517 (  2.963639)
Postgres Sequel read   8.798584   0.011155   8.809739 (  9.194935)
Postgres AR write      1.741980   0.189130   1.931110 (  4.404335)
Postgres AR read       1.551020   0.040676   1.591696 (  1.922000)
```

Writing Through ActiveRecord:
![Flamegraph AR Write](/images/inline/flamegraph_ar_write.svg)

Reading Through ActiveRecord:
![Flamegraph AR Read](/images/inline/flamegraph_ar_read.svg)

Reading Through Sequel:
![Flamegraph Sequel Read](/images/inline/flamegraph_sequel_read.svg)

Writing Through Sequel:
![Flamegraph Sequel Write](/images/inline/flamegraph_sequel_write.svg)

We can clearly see that the `DateTime::parse` from sequel remains a problem. I
suspect, ActiveRecord uses a much better performing method to hoist the
datetime from Postgresql to a native DateTime.

Yet relatively speaking, this poor performance of Ruby hardly matters. It
hardly matters that Ruby halts all code for 15ms to do garbage collection, if
the fastest database-query takes 150ms. The entire overhead of JIT, all the
bazillion layers of Rack and Rails HTTP parsing and forwarding, is nothing
besides a 190ms insert query writing to the database. 

The example fetches a single record from a single table: no things that a
relational database is so good for, but which also causes actual performance
issues in that database: no joins, sorting, filtering, calculations etc.

**So, even with a very poor performing ORM, the Database remains the primary time consumer.**

## Scaling Up

We've all been there: our Ruby/Rails code grows so convoluted becomes so poorly
set-up that the stack (or your custom code) really is the bottleneck: this
is easy to solve! Just add extra servers. A single request won't become much
faster, but at least the load on the server no longer brings down the
performance for all other users. Your app won't become faster, but will be able
to grow to more users.

You can easily do this, until the database becomes the bottleneck again.
Writing to a relational database is always a centralised problem: we can only
scale that up vertically: larger database-server. For the query (read) side, we
can add complexity to solve it: read-copies (formerly known as "slaves").
Almost all common relational database servers allow this. It's not trivial,
because it introduces "eventual consistency" to a setup/framework that was never
designed to be eventual consistent but it's doable. Writing (create, insert,
update, delete etc) isn't: the database will, at some point, be your
bottleneck. Unless it isn't ever: but then performance never was a problem to
begin with.

**Solving performance issues in Ruby code is easy: just throw more servers at
it. Solving database performance issues isn't that easy because scaling up a
relational database is hard or even impossible at some point.**

Another conclusion here would be that to keep your code scalable you should
keep as much logic, transformations, etc in code[9]. By pushing business logic,
constraints, validations and calculations into the database, you lose the
simplest, and often cheapest, means of performance gains: "Throw More Servers
At It."

## Rails

As mentioned several times, Rails' complexity does cause real and hard to solve
performance-issues. So we need to look at that too.

To throw a quote by DHH back at Rails:

> “All of the fancy optimizations are optimizations to get you closer to the
> performance you would’ve gotten if you just hadn’t used so much technology” ☝️
> https://macwright.com/2020/05/10/spa-fatigue.html

https://twitter.com/dhh/status/1259644085322670080

Rails' internal complexity has two profound effects on performance. One is that
it has tons of abstractions, critically referred to as "Black Magick."
The other is that your data passes through all these layers and all this
complexity before the request-response of a typical HTTP cycle is finished.

With Ruby being a relatively slow language when handling data (see below),
the more code your data has to pass through, the slower the result becomes.
This is true for all software, but amplified with Ruby. Rails' 163500 lines of
Ruby (dd 01-04-2022) certainly don't help speed this up.

"Lines of code" are not a metric for performance, but they are an indication.
Don't forget that even the smallest rails project still boots hundreds of
thousands of lines of code, even if your data passes through only a fraction
thereof.

Benchmarking Rails' has been done over and over. Instead of continuing with the
"benchmarks" and flamegraphs for the entire stack, including Rails, I'll now
get a bit more meta. Less on numbers, more conceptual. Because with Rails, I'm
convinced the performance problems are conceptual. Technical performance problems,
as showed above, are caused by Ruby, not Rails.

ActiveRecord (the implementation in Rails, not the pattern per-sé) is an
abstraction over a system (a relational database) that requires a lot of
detailed knowledge to keep performant. ActiveRecord (the pattern) not only is a
leaky abstraction, it mostly is an abstraction that hides details that cannot
be hidden and should not be hidden.

More practically: That one `User.active.includes(:roles)` I threw in to fix an
N+1 query years ago, [dynamically chooses what it thinks you
need](https://axiomq.com/blog/better-performance-for-rails-app-with-joins-and-eager-loading/).
It may "suddenly, magically, dynamically" start to build other JOINS and
queries and degrade your performance. (Okay, not runtime from one minute to the
next, but over small changes).

I've had a database server cluster go down on a multi-million-users app,
because of this: a simple, unrelated change in an unrelated controller 
caused Rails to switch over to an outer join with an humongous materialized
view that was never meant to be joined this way (it was for reporting). But
Rails' magic decided that from now on, it was going to use that. Every pageload suddenly did a ~2s
database query, gobbling all CPU and IO up on the database server. Ouch.

A stupid mistake, certainly. One that we did not see because in development and
test, the performance never decreased. But one that we should've noticed. 

I do, however, blame "Rails" for making it so easy to make that mistake. In
this specific case, we found and solved it fast. But I've worked on
codebases that were riddled with such mistakes. The only reason those projects
kept running was because of the huge Heroku server (@$1200/month) keeping it
afloat for a few hundred visitors. A day. Where such mistakes don't bring down
database clusters, but incrementally accumulate to an expensive, and terrible
performing app. A 20ms slowdown is hardly measurable. Hundred 20ms slowdowns,
one by one added over months, does make the response unacceptably (it
depends...I know) slow. And, worst of all, where these "mistakes" were labelled
as "Done The Rails Way" by the team.

Rails is full of such footguns (Which Rails calls [sharp
knives](https://rubyonrails.org/doctrine#provide-sharp-knives)). Most of which are
harmless on their own. But which compound. It
is easy to join up tables in suboptimal ways, to sort or filter on un-indexed
columns. Active-record is filled with tools that make it easy to abuse the
database horrendously, without warnings. The amount of Rails apps that I worked
on, whith some form of `.sort(params[:sort_by])` is astounding: in 2021 alone,
I worked on three separate rails apps, all of which could DOS the database by
firing requests with `?sort=some_unindexed_field`. While this example is
extreme and may count as security issue, it illustrates how easy it is to make
your apps performance horrible.

The sorting-by-un-indexed-field example illustrates how Rails'
coupling to the database makes many of its performance issues database
issues.

In my experience, performance issues in Rails are always:

1. N+1 queries. Easy to detect. Hard to fix (without introducing massive coupling issues).
2. Unoptimized joins. It's far too easy to add simple `has_many` which allows
   developers to fire queries at the database that are way too heavy. This is
   near impossible to fix once introduced and spread through the app. There's
   always code that, in the end runs something like
   `User.with_access_to(project).notifications.last.sent_to`. And which
   happens to query over five join tables and joins on at least one index that
   wasn't meant for this. Causing some 800ms query. On each pageload.
3. Unoptimized `where`, `group` and `order` calls. Using columns that are hard
   or poorly optimized to filter, group, or order on. Using non-indexed columns.

My rule of thumb is that each added or removed `where`, `has_many`, `group` or any such
active-record method *must be accompanied by a database migration*. 
Because the only times you don't need to optimize the database for this new way of querying it,
is if you already had indexes that you weren't using before (meaning it was poorly optimized before).
The other time is when you re-use existing indices, in which case you most
probably should refactor to move the querying to a single-responsibility (e.g.
a named scope).

With Rails' human-friendly active-record API, it is easy to forget that you are
still just querying a complex relational database. One that needs
nudging and [tuning and
tweaking](https://dba.stackexchange.com/questions/tagged/query-performance)
just to keep serving you the data within reasonable time.

**With Rails it is easy to stack up many tiny mistakes that make your
Database the bottleneck. But even if you have all that under control, a high
performing database-call is still a magnitude slower than many other calls.**

**It is still a factor thousand or more faster to fill some array from memory and
code, then to fill that array from a database. As I showed in the first paragraph.**

## So? What should I do about it?

Some rules of thumb that I employ are:

* Don't use the database when avoidable. Which is always more often than I
  think. I don't need to store the 195 countries of the world in a database and
  join when showing a country- dropdown. Just hardcode it or put in config read
  on boot. Hell, maybe your entire product catalogue of the e-commerce site can
  be a single YAML read on boot? This goes for *many* more objects than I often think.
* Keep all logic out of the database. It already is the slowest point. And
  hardest to scale up.
* Be vigilant of any `sort()`, `where()`, `joins()`, etc calls. They *must* be
  accompanied by a migration to tune at least the indexes, if added (or removed).
* Keep all database-calls simple. As few joins as possible, as few filters and
  sorts as possible. Databases in general can optimize much easier for this.
  This also keeps the app decoupled from the actual database details.
* N+1 Queries are not always bad. Sometimes even preferred. Because they enable
  business-logic to remain in code. And keep the logic of what to fetch in a
  single place, allowing performance optimization there.
* Remain aware of where the actual performance issues fall. Proactively scale up
  according to whether the performance is IO-bound or computational. And pray
  for it to be computational.

---

[1] To push the counterpoint though: as a Rust noob, I spent over an hour
writing the Rust version and as a Ruby senior (10+ years), less than 10
minutes. I'd need to run both versions way over 2000 times before the extra
time I spent developing the Rust version starts paying off in extra time
waiting for it to run.

[2] I am certain that you can show me a project where you run Rails without a
Database and where that makes sense. They cases are there. Some that I came
across, are: "I already know Rails, but not Sinatra," or "management requires
us to run everything on a similar codebase." Actually, scratch that last one.
Most are valid reasons, except the last one: that is a horrible reason to
choose Rails.

[3] A quick grep: Over 9000 classes, over 33000 methods; excluding all the
magic dynamic methods like the ones that wrap around your database model. This
excludes the 70-something dependencies that rails itself comes with.

[4] A common Rails app will be sending email, probably generating PDFs,
ingesting CSVs of exporting CSVs, but all interaction, typically, goes through
HTTP. I'm aware of the exceptions (I worked on them) where Rails is used only
for running cron-jobs, ETL-pipelines or even media-encoding, but those are
really that: exceptions.

[5] Ironically, the performance issue becomes less articulated in this
non-http, non-rails context, yet in these cases people generally dismiss ruby
as option, for its performance-issues. Which, catch-22, is one of the reasons
Ruby is hardly used outside of Rails (and/or Web).

[7] What might be surprising, is that lookups from the SQLite in memory are
slower than lookups from the database. But this illustrates another important
issue: the database runs in a separate thread, maybe even on separate hardware.
So load gets distributed: with SQLite, and our memory example, one singe Ruby
thread is doing all the filtering, fetching and hoisting. With an external
database, this is offset. Depending on your setup, the Ruby thread might even
continue work while the database does its lookups. In this case, Postgresql,
which is optimized to filter and fetch data, can do this faster than
SQLite-inside-ruby. In a typical production setup, the Postgresql is even better
suited at this.

[8] Please do note that while `DateTime::parse` is slow, this function is
written in C. The slowness is not because it's written in Ruby, but probably
because parsing such complex texts is slow. It would probably be just as slow
for a feature-comparable version in Rust.

[9] There are many more reasons why this is a better idea. The most obvious one
being that you can never put all business-logic in the database, even if you
wanted. So you will have business-logic in multiple places without any
structure of what goes where. So the obvious solution to keep it in one place,
is... to keep in one place. The only place where it all can be kept: your
application.
