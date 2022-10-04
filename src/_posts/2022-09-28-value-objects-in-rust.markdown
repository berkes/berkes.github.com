---
title: "Value Objects in Rust"
tags: [rust, architecture]
lang: en
layout: post
---

When writing software in an OOP language, Value Objects are an invaluable (pun
intended) tool in my toolbelt.

The idea of Value Objects arose from [Domain Driven
Design](https://www.dddcommunity.org/book/evans_2003/), but are useful in and
on itself, so outside of DDD. 

> Examples of Value Objects are things like numbers, dates, monies and strings.
> Usually, they are small objects which are used quite widely. Their identity
> is based on their state rather than on their object identity. This way, you
> can have multiple copies of the same conceptual Value Object. Every $5 note
> has its own identity (thanks to its serial number), but the cash economy
> relies on every $5 note having the same value as every other $5 note.

[C2 Wiki](http://wiki.c2.com/?ValueObject)

Value Objects must adhere to three rules. I like to add two.

* It has no identity.
* It is immutable.
* It is comparable.
* It has meaning to the business.
* It is guaranteed to be valid according to the business.

Usually, only [the first
three](https://medium.com/swlh/value-objects-to-the-rescue-28c563ad97c6) are
mentioned. I always add the last two, to include *why* we want this. In other
words: if there is no need for a business meaning, or there is no validation,
a Value Object may be overkill. Sometimes something really is
just an integer or string.

In most software, we use Primitives all over the place. Need a URL? Just
pass a string. A price? Decimal, or Int (or, heaven forbid: a float). A from-
and to date for some report? Send in two Dates. And so on. This is also known
as the *[Primitive
Obsession](https://refactoring.guru/smells/primitive-obsession) Code-smell*.

This causes a lot of issues. Most important issue being: it [spreads your
business
rules](https://blog.ploeh.dk/2015/01/19/from-primitive-obsession-to-domain-modelling/)
all over the place. Or simply leaves you with no business rules at all. And
secondly: Meaning is lost. A price as decimal may be unambiguous enough, but a
*let weight = 3.76;* certainly is ambiguous.

Also, primitives aren't immutable by definition (but in Rust at least they are
by default) and while often they can be compared, and lack identity, they most
certainly lack any meaning to the business. And we cannot guarantee their
validity. They have no place in the *Domain model*. So they tick some boxes,
but not all.

An contrived example of "software" that emails your boss some report of recent
requests to a website. This uses primitives: strings, integers, vectors etc.

<script src="https://gist.github.com/berkes/2dce2ce11198caa6ddb502ade17fc7de.js"></script>

Our *API* is both `PageRequest` and `make_and_send_report`. Aside from the
obvious issue that the function has multiple responsibilities, this API leaves
a lot to desire. The users (colleagues, future-me, today-me, contractors etc) need
additional information that the code does not convey.

* Our business logic of what is a valid email is encapsulated: good! But we
  must now remember to use that encapsulated rule everywhere we want to do
  stuff with an email-address[1].
* What is the `size`? Apparently when diving deep into the code, it represents kilobytes.
* Can a size be negative? 18 quintillion kilobytes? Zero?
* What is the `response_code`? Maybe a HTTP code? If so, what is zero? Or 65000?

## Value Objects to the rescue

First, a Value Object wraps one, or multiple *things*. An example of
multiple-things [would be a 2D
coordinate](https://www.martinfowler.com/bliki/ValueObject.html) or a "list of things".
My contrived example lacks such a Value Object, but I'll touch on this later.

For now, let's turn the email address into a Value Object:

<script src="https://gist.github.com/berkes/8b450fedc2fd85ae6312512d6225f812.js"></script>

A HttpResponseCode and PageSize would follow the same pattern.

We then use them as:

<script src="https://gist.github.com/berkes/347adbb0fda1bd20eb447bc9b0feca0e.js"></script>

An intermediate version where all this is implemented can be found [in this playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=072423a39857793d25aadfe87deac190).

This pattern is:
* We define a simple struct. It wraps the value.
* We implement a constructor. In that constructor, we place any business rules. So that we can be *sure* that any such Value Object created through this constructor is valid, by our business-rules.
* When the constructor gets an invalid value, it will return an error *in runtime*.
* We implement the Display trait, so that our users can display it.

This is far from ideal, still. But we already have a few boxes ticked:

* It has no identity.
* It is immutable.
* It has meaning to the business.

Still missing:

* It is guaranteed to be valid according to the business.
* It is comparable.

For the first, we need to enforce that users' go through our constructors.
For the second, we can implement the [`PartialEq` trait](https://doc.rust-lang.org/std/cmp/trait.PartialEq.html).

And for the impatient: yes, we will clean up the API and make it ergonomic later on. The code, with its Results, Displays and whatnots has arguably become worse now. But first some other issues to solve.

In order to avoid someone from simply calling `EmailAddress { value: String::from("invalid-email") }` we can place our [Value Objects in a module and only make the struct and constructor public.](https://stackoverflow.com/questions/73882769/force-use-of-a-constructor-in-rust/73882994).

<script src="https://gist.github.com/berkes/f0964debed38d8809297fc3dcf5be231.js"></script>

Implementing the `PartialEq` trait is trivial too. Or, even simpler, with derive:
<script src="https://gist.github.com/berkes/480c233fc70f98e40f1576bbd906d061.js"></script>
Most value-objects will be simple enough for `derive`.

Which we can then use throughout our code when checking equality. E.g. a
business rule that ensures we never ever email john:

<script src="https://gist.github.com/berkes/793359fc7890fd58bb6c532a5919c4cf.js"></script>

Whether or not to use the derive or the impl version depends mostly on the
business needs. Typically, Value Objects are simple, so the derive version will
almost always be good: our value *struct*s hardly ever will have fields that
aren't relevant to the comparison.

But maybe our business says: "bob+one@example.com and bob+two@example.com are
the same". Or maybe our HttpResponseCode 488 should be the same as 400. 

Now everything is ticked:

* It has no identity. - Simply don't add some id: field.
* It is immutable. - Default in Rust
* It is comparable. - Derive or implement PartialEq
* It has meaning to the business. - Give them proper names
* It is guaranteed to be valid according to the business. - Enforce constructors.

But we can improve a lot still. I won't go through all the improvements that
make it *more proper rust-ish* but will discuss some improvements are specific
for the Value Objects. And one makes them a lot nicer to work with.

Most important, is an issue with our `PageSize`. It is still unclear in what
unit this is. We could rename it to `PageSizeBytes`, implement some `From` traits
to convert between `PageSizeBytes`, `PageSizeKiloBytes` and so on. Or we could
improve the API of this object. E.g. a `::new_from_kilobytes()` constructor,
and then some fancy `.as_megabytes()`, etc. getters.

When to choose what, depends on the domain and requirements.

We can lean on the type checker for cases where a specific unit is a
requirement. E.g. maybe a function *must* operate on bytes, so binding the
function parameter to *PageSizeBytes* then helps: `fn is_outlier(size:
PageSizeBytes)`. 
We can use contracts (traits) for cases where we want to be sure that we can
read a specific unit from the Value Object, with, say a `as_kilobytes()`. In that
case, a generic over a trait `fn bw_used<T: DataSize>(size: T)` might work
best, where `trait DataSize` enforces a `as_kilobytes()` interface and the type
system ensures that whatever we pass in, has this method.
And in cases where all this doesn't matter, where only the business meaning
and validation is of importance, we can bind to a more generic Value Object type.
In our example, the `HttpResponseCode` or `EmailAddress`.

In the example, I would go for a PageSize, but clarify the unit in the
constructor and a reader:

<script src="https://gist.github.com/berkes/69d1b785d2e98ea05c912fd0e51ce8cb.js"></script>

This shows another benefit of Value Objects: they can be unit-tested, and
unit-testing them is dead-easy.

In the first version, had I wanted to test anything related to converting kilo-
mega etc bytes, I would probably have had to test that the email being sent,
contains the correct strings. But now, I can unit-test the getters and setters
on `PageSize`, which is the most easy (and fastest) kind of test.

A last improvement is to make the Value Objects easier to use. In the
intermediate version, we see that all our Value Objects must get the `impl
Display` so that we can display them. The usize, or String we had before, can
easily be displayed. Whats worse: we cannot do all the common operators on our
Value Objects: they cannot be added, summed, divided, etc. What if we want to
add "average page size" to our report? We then need to extract the value. In
this we're lucky, because we already have the `as_kilobytes()` getters. But
another example could be a `ViewCount` which we may want to sum up. This then
needs another getter. More boilerplate code, more calls:

<script src="https://gist.github.com/berkes/5bebce03c9d6aa2da01e831af9f5fd95.js"></script>

Sometimes this isn't an issue. Like when our getters are already there and
required to disambiguate. Or when operations values don't make sense: what
would it even mean to have the average HTTP status code? Or to sum them up?
Yet in the new example above, we'd be helped if we could forward any method calls,
or operators, to the wrapped value. [`Deref`](https://doc.rust-lang.org/std/ops/trait.Deref.html) can be of help:

<script src="https://gist.github.com/berkes/67d8d6dc1dc7a8d143682fa3cc61f9ec.js"></script>

We still have to deref any value before using it, but that is rather simple. In
the example these are the`*vc` and the `*report_title`. This [is considered an
antipattern](https://rust-unofficial.github.io/patterns/anti_patterns/deref.html)
though. But, like always, "it depends". With a very simple value object, deref
makes sense: it may not be 100% semantic correct: deref is meant for custom
pointer types and simple value objects can be considered such a pointer, but
not entirely. For value objects that wrap multiple primitives, deref won't work. And when
we add semantics, like the `as_kilobytes()` it isn't needed, and would add only
confusion. So use with care and be aware of the downsides. Such as:

> Using this pattern gives subtly different semantics from most OO languages
> with regards to self. Usually it remains a reference to the sub-class, with
> this pattern it will be the 'class' where the method is defined.

I personally don't use `deref` that often. Only early on, but I find that when
a value object improves and solidifies over time, I almost always remove the
deref at some point in favor of semantic getters[2].

So, to sum up:

* If the wrapped value makes sense as primitive, and we want to allow any
  operations or methods to be called directly on it, `Deref` can be of help.
* If the wrapped value is ambiguous, named getters rather than a generic one, allow
  us to return a Primitive on which we can operate as we want.
* If the wrapped value make no business sense as Primitive (e.g. our status code),
  we should prohibit getting to this primitive.
* If the wrapped value is made up of multiple primitives, operations don't make
  sense: getting to the underlying primitives should be prohibited.

The last one needs some extra attention:

## Multiple values

Often a Value Object is made up from multiple values. An example would be a
`Point`, coordinates in a 2d plane:

<script src="https://gist.github.com/berkes/2807159461d50c9d893c30b71539807c.js"></script>

This is another great example where Value Objects make sense. We certainly don't want to
pass the two `lat: usize` and `lon: usize` around all over the place. Not only is that [a codesmell](https://refactoring.guru/smells/data-clumps), it is prone to errors (you *will* swap lat and lon somewhere, you will set one but not the other if you make them `Option`al. etc.) 

A use-case that I come across more often, though, is a `from: DateTime, to: DateTime`. There
is some obvious `DateRange` waiting to be implemented. This `DateRange` can ensure the from is never later than the to. It can get extra fancy helpers so that a user can ask `date_range.intersects(other_range)`, `date_range.includes(date)` or `date_range.length_in_seconds()` or such.

A third value object would be a collection. A list, queue, vector, array, etc.
Most collections are fine as primitive. But quite often they lack the
business-validation. E.g. a list of "todo tasks" cannot ever contain a Task
that is "done". Or a top-5 `Songs` cannot ever contain 6 entries. But how to
wrap collections ergonomically, is an entire post on itself.


## Usage of Libraries

In the first example, way above, we have a `url: String`. A URL is not a
String, just as a date isn't a string, or a credit-card number isn't a string.
It's a value with meaning, validation, helpers and so on. `My name is Bèr` is
not a valid URL, yet our program accepted this as URL just fine. When dealing
with URLS, you often need to extract a hostname, path, protocol and so on, also
lacking in our example.

And rather than writing our own `Url` Value Object, we can leverage one of the
many crates. For example [`url`](https://docs.rs/url/latest/url/).

We could use such struct provided by a library directly. Which is often Good
Enough. But to limit our coupling, we could wrap it in our own struct; Value
Objects are a great place to do this. They double as *Anti Corruption Layer* in
a convenient place. 

In addition, wrapping it with our own version, allows different business rules.
Maybe what `url`, the crate deems valid, isn't for our domain. Maybe we can
only accept URLs that are https, or only ever for our own `example.com`
hostname. In that case wrapping ,and then `Deref`ing an `url` in our own value
object, is simple and makes the API (and errors and such) consistent.

That leaves us with the final implementation of the Value Objects:
<script src="https://gist.github.com/berkes/551a9b453a6d21f59671a7d17c5d9677.js"></script>

[You can play around with this here](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=b4215d207f16be4c3c79941eedf37772)

This leaves a lot to be desired and improved, still. But a lot of implicit
errors that were in the first version were fixed. And it clearly shows some of
the neat tricks that Rust allows us to employ. Even though [Rust isn't Object
Oriented](https://doc.rust-lang.org/book/ch17-00-oop.html) in the traditional
sense, doesn't have *objects*, we can still use the Value Object Pattern (if
you may call it that) to put business rules, -logic and meaning in our Rust
programs.
## Conclusion

Value Objects are a great tool to bring business-meaning and -rules into our
code. They allow us to fix a lot of common code-smells. And they remove ambiguity
and often make our code much better readable and therefore much easier to maintain.
Value Objects are a great place to add some nifty helpers and converters.

In Rust, even though there are no *Objects* we can leverage structs, methods,
traits, modules and the type checker to get Value Objects that make business sense, 
are valid within our domain, are ergonomic and require rather little boilerplate.

---

* [1] And, yes, this isn't any sort of email-validation. It's an example!
* [2] In Ruby, where I use Value Objects a lot too, and which is fully OOP, I find
  the same goes. I never just blanket forward all calls to the wrapped
  primitive. Because that leads to coupling with the primitive, which is one of 
  the reasons for using value objects in the first place. Primitives also come
  with a very large interface (at least in Rust and Ruby they do), many of which
  don't make sense in the domain meaning. What is `status_code.is_odd()` or
  `status_code.len()`?
