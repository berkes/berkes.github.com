---
title: "Test X by Controlling X"
tags: [test, TDD]
lang: en
layout: post
---

Last week I stumbled upon a [StackOverflow
answer](https://stackoverflow.com/questions/35858323/how-can-i-test-rust-methods-that-depend-on-environment-variables), where
*Shepmaster* wrote a great quote about software testing:

> "How do I test X" is almost always answered with "by controlling X"

This is simple, and may sound trivial. But it has some interesting consequences.

## Ability to control X

First, there is the question: "can I control X?". Because if you cannot, testing it
becomes impossible. When `X` is some external service, or tool, for example a payment
provider or email-server, and there is no way to control it, you cannot (, and
therefore should not) test it.

## How to control X

Second is the question "how can I control X". For once, this can be answered
different than with *it depends*.

Because we can control X, by ensuring that X is ours, is simple, does not
depend on external stuff, and relies only on things that we control. That is
not easy. But entire books have been written on architectural patterns that
allow us to **easily control X**: to easily test X.

## Ease of controlling

So third is the question "how easy can I control X". The StackOverflow question
that Shepmaster was answering was about environment variables (env vars). They are
reasonably easy to control in most tests (in most languages and frameworks).
But harder when you run tests in parallel because all running tests will
re-use the same shared env-vars. If test 1 sets env var "URL" to
"http://localhost:3000" and test 2 sets it to "http://example.com", there will
be conflicts. Other difficulties are that a service you are testing, may need
to be restarted to pick up a change to an environment variable, or that
environment variables are enforced or overridden by your OS, CI, or hosting.

Environment variables are harder to control than stuff that we designed to be
controlled by us.

An example of such an architectual pattern would be a
"config-repository-adapter". Some
[adapter](https://alistair.cockburn.us/hexagonal-architecture/) that you can
swap out. In production, dev and CI it may be use the `EnvVarConfig`, and in
test a `MemoryConfig`. Don't let the words "adapter" put you off. This works
just as well for software that isn't following some Java EnterpriseAdapterEnvVarConfigFactoryDecorator-"pattern".

We can easily build `MemoryConfig`  **so that we own it, and can easily control it**.

In the same thread, Simon Whitehead [shows a great example in
rust](https://stackoverflow.com/a/35858566/73673). If you are more familiar
with Ruby, an example would be:

```ruby
class Config
  def get(name)
    raise NotImplementedError
  end
end

class EnvVarConfig < Config
  def get(name)
    ENV[name]
  end
end

class MemoryConfig < Config
  def get(name)
    @config ||= {}
    @config[name]
  end

  def set(name)
    @config || = {}
    @config[name] = name
  end
end
```

Trivial, right? Yet testability goes way up, because we *control X*. Accidental
benefit, is that we can easily swap out EnvVarConfig for a FileConfig,
`EncryptedVaultConfig`, or `CommandlineArgsConfig` if we need. Another example
of the common statement that *easier to test software* is *better software*.

## In unit-tests

Because everybody has a different view of what "units" are, I [too](https://web.archive.org/web/20220823194605/http://www.codingthearchitecture.com/2015/03/08/package_by_component_and_architecturally_aligned_testing.html) prefer the term "class test".

When we test a class X, how do we control the class X?

By sending messages to it (calling methods or functions). Or by passing in
stuff that we control.

We cannot control private methods or private state. So we cannot test that.
This is nothing new, but [somehow too often forgotten](https://stackoverflow.com/search?q=how%20can%20I%20test%20private%20methods).

We often don't control the dependencies of that class, stuff the class X depends on,
and when we cannot control them, we cannot test X. But we can ensure that the
if class X depends on Y, that we control Y. Dependency injection is the most
common solution.

To illustrate:

```ruby
user_repo = MemoryUserRepo.new().insert(username: "berkes", password: "hunter2")
sut = AuthenticationService.new(user_repo: user_repo)
assert_equal(sut.authenticate("berkes", "hunter3").error, "invalid password")
```

AuthenticationService somewhere calls `find(username)` on the `user_repo` it
got passed in, then checks the password using ComplexCryptography that is of no
concern to the outer world. So all `MemoryUserRepo` needs is to provide a
`find` that returns a `user`[1] similar to how a `ActiveDirectoryClusterUserRepo`
would return a user from it's 120-server big active-directory-cluster. Yet
where it's really tough (if not impossible) to control that giant cluster,
controlling a list in memory is trivial. Hell, it could even be hardcoded in
a `HardcodedUser.find()` method if we only ever need it in this test.

Through dependency injection, **when we want to test X, we can control X, because
we control all the dependencies of X.**

## In integration tests

When we test a group of classes within some boundary X, how do we control that boudary X?

First, by ensuring that everything in the boundary stays in that boundary. By
ensuring that classes in the group only interact with eachother, we can easily
control the entire group through its public interface. But when elements
(classes) in that boundary depend on external systems like databases, env-vars,
servers or worse: stuff in boundary Y, we need to control all those.

This is really another way of saying that tight coupling is bad (for testability).

The solution like above, is to ensure that everything inside the boundary
depends on "stuff outside" through simple, easy and controllable interfaces. E.g. a ports-and-adapters style. Or just simple decorators, services or whatever pattern fits best: as long as we can swap it out when testing, its fine.
Obviously: the least we have of those, the better. So "everything within our boundary" should stay within that boundary as much as possible.

To illustrate:

```ruby
mail_handler = MemoryMailQueue.new()
payment_server = StripeMock.new()
sut = Reimbursement.new(order_id: 1337, payment_server: payment_server, mail_handler: mail_handler)
assert(sut.call(), "Reimbursement failed")
assert(payment_server.requests.body.parse().type, "reimburse")
assert_equal(mail_handler.sent.first.subject, "You are reimbursed for order 1337")
```

Again simple dependency injection. We control the mail_handler, so we can test
the mail_handler. We control the payment_server, so we can test the
payment_server.

## In end-to-end tests

In order to test the entire application, we must control our entire application.

This is where things get muddy. Because what our users consider "the entire application" almost certainly includes *things* that we cannot control (in our tests).

For example, we want to ensure that a notification mail is delivered, stripe is called, and what more, when reimbursing.

> As a logged in a admin, when a client paid for order 1337, and on the
> admin-orders page, I hit the reimburse button on order 337. Then the money
> should be reimbursed, and a notification mail sent out to the client.

We cannot control Stripe. Nor can we control the mailserver. But we can replace them with services that act nearly similar and that we *can* control.).
For email-servers, there is e.g. [testmail.app](https://testmail.app/). Many larger mail-delivery services have such features built in, e.g. Sendgrid allows you to check if a mail was delivered by [checking that an email was sent through their API](https://docs.sendgrid.com/api-reference/e-mail-activity/filter-all-messages). Or stripe allows you to [interact with their API in testing mode](https://stripe.com/docs/testing).

This is complex, slow and fragile. But that is expected for end-to-end tests. Which is why the [testing pyramid](https://martinfowler.com/bliki/TestPyramid.html) puts them at the top: you want least of these. You want to depend least on these. Exactly because *Controlling X, when X is the outside world, is tough. And so that makes testing X tough*.

But in this case, not clear from the use-case, another important thing to
control is the application state. *As an admin* implies that there somehow are
admins, and that we are logged as one. *Hitting the reimburse button on order
1337* implies that order 1337 exists, and is in a state that it can be
reimbursed.

When all this is a single database, controlling that isn't *too* hard. We could
just poke around in that database from our tests and generate the correct
records. It becomes harder when this database often changes. It becomes even
harder if some of this state lives externally. The admin in this case mightn't
notice that the authorization is done on an external service or that the order
was filled from some event-stream, rather than a relational database. So I think that
our tests here shouldn't deal with those details either.

I, therefore, prefer to drive all these "state" through the public UI. There
must be some place where we can add admins, or where admins can log in, or where
clients can place orders. "Just" walk through all these screens from the test and
you should end up with a state where you can start testing the actual feature.
It's a quite extreme form of "only use the public interface when testing",
whatever works for you. But, for end-to-end tests, which test the public
interface, the only real public interface is, well, the public interface[4].

If you **must test the entire application, we must control not just the
application, but all its external dependencies**. Which is impossible in
practice. But we can get closer. The fewer of those we have, the easier it
becomes. So if we declare "the database", or "the single-sign-on authentication
service" as not some external application, but as part of the application, we
need not control them directly: we can control them through their public
interface!

## Mocking and stubbing.

Stubbing means that we *control X by replacing parts of it, with something that
we control*.  But subtly different to *dependency injection*: If we stub e.g.
the `random()` in `Math.random()`, we replace only that function with one that we
control (and that always returns 42, for example), we aren't really
controlling `Math`, we are really poking around and replacing behaviour at
runtime (this won't work for many statically typed languages, for good
reasons too). Yet when we inject the subject-under-test with our own implementation of
`Math`, in which we control what the function `random()` does, we use
dependency injecting.[2]

**In order to test X, when that depends on Y, we want to completely control Y,
not just one detail in Y**

Coincidentally, this leads to looser coupling.

Mocking means that we inject our own implementations of Y, which is what the
whole *dependency injection* is about. But mocking comes in many flavours. For one,
it is often misused as alias for stubbing. More correctly, though, it means [creating
objects that simulate the behaviour of a real
object](https://stackoverflow.com/a/2666006/73673). Yet *to simulate* is vague.
Again, *Shepmaster*s' quote can help: A mock is something that **the tests
control, to replace something that the test would otherwise not control**.

The "adapters" mentioned above are therefore very simple mocks. The more complex
mocks need to be, the harder it becomes to control them. This implies another
issue, though: the more complex mocks need to be, the harder it is to test. Which
is a sign that the code we are testing, probably isn't good.

To turn it around: When a *subject under test*, X, depends on Y, and you
*need* complex behaviour to simulate Y, then X is depending too much on Y.
Either Y should be part of the "unit" (bounded context, module, whatever you
name your compartments), *or* Y and X should be decoupled more.[3]

Coincidentally, this leads to the software design principle of [increased
cohesion and looser coupling](https://wiki.c2.com/?CouplingAndCohesion).

## Conclusion

The phrase

> "How do I test X" is almost always answered with "by controlling X"

is provoking, simple and has some interesting consequences. But I think it's not
entirely complete. I miss the dependencies. My version would therefore be;

> "How do I test X" is almost always answered with "by controlling X and
> everything that X depends on"

---
* [1] Turtles-all-the-way-down, though: this `user`, obviously, should not depend 
  on a specific database implementation, ideally it would be an immutable, flat, simple
  struct (e.g. a value-object). But certainly not some *model* that itself
  relies on availability of database-servers, event-streams, or other
  subsystems to fill itself. Or more precise: the adapter that our tests control
  should return such a simple version. If the "actual" adapter returns some
  complex, wired-up object: fine. As long as our AuthenticationService does not
  rely on all that complexity and wiring, we are fine: we reward ourselves with
  loose-coupling by being lazy!
* [2] A stub, however, can be a mock. I know... I use `stub` here in the sense it is
  commonly used in testing: to replace a single method. Not to replace a
  module, class or subsystem with one that we control: that would be *mocking*.
* [3] Which I why I, and many people with me, often say we dislike *mocking*. I
  *like* dependency injection. And the things I inject *can* be mocks, but I
  prefer them to be the real thing. Yet when *the real dependency* cannot be
  controlled easily, then that is a sign of trouble. In other words: if you
  need to mock, you probably have a deeper problem. Maybe that cannot be
  solved, in which case a mock is a band-aid. And when you consider "test
  adapters" as *mocks*, then sure, mocking is proper. But only in certain
  layers and use-cases.
* [4] Or I sincerely do hope that clients in your e-commerce system cannot
  place orders by writing records to your database directly...
  There are many downsides to this setup. But also many upsides. A topic for another post.
