---
title: "Blog comments on a static site via social networks"
tags: [hackernews, reddit, blog]
lang: en
layout: post
---

Most blogs have a comment section below each article. A relic from the days
that blogs itself were the bulk of "social media". Before Slashdot and Digg,
there simply was no place to discuss the article other than in the comments
below that article. It's still a core feature of Drupal, WordPress, and other
blog-software.

A static site, however, cannot have comments in the same way. The blog-software
generates the HTML, but cannot handle incoming comments or anything dynamic
really. One can add a form and/or embed a service like Disqus or
[isso](https://isso-comments.de/) for that, but aside from privacy concerns, it
somewhat defeats the purpose of a static site.

But also, today, discussions are hardly held on the blog itself anymore, but
rather on platforms such as Reddit, Hackernews or Lobsters. And obviously
Facebook, Twitter, Mastodon and even LinkedIn.

I ditched the common solution to this, Disqus, long ago for privacy concerns.
And never even considered an alternative. The signal to spam ratio was far too
high: for every on-topic comment, I had to moderate tens, sometimes hundreds of
nonsense comments. Even with some solid spam-protection in place[1]. At some
point, I spent more time moderating comments than writing articles.

I found that the discussions on Hackernews and even Reddit, are far better than
what happened in the early days on this blog (back when it was Drupal 3, still)
in the comments. So why not leverage that?

Turns out there is [discu.eu](https://discu.eu), a fantastic service that you
provide with an URL and then gives back results from various social networks.
Places where that URL is discussed. Hackernews, Reddit, and/or Lobsters.

It has an API, that I can call with some JavaScript and then insert in the
page. I've added that to this blog. But also extracted it into it's own
repository:
[github.com/berkes/discueu.js](https://github.com/berkes/discueu.js/). Tried to
make it easy to copy[2] into your own static site or blog.

<strong>Check out [a demo here](https://berkes.github.io/discueu.js/).</strong>

We can then implement this on our site as follows:

<script src="https://gist.github.com/berkes/b6bc1a4c463bd64f653dbdcf245c7912.js"></script>

It consists of four parts: the `Discussion`,  a `DiscussionsRepo`, a `Renderer`
and a set of templates in HTML.

The `Discussion` is the main class: a controller so to say. It gets passed
in (dependency injection) a `Renderer` and a `DiscussionsRepo`. Idea behind
this setup, is that it's easy to test and easy to swap out for other implementation.
Maybe you want a Repo that sorts differently, or has additional filters (only
return stuff with a ranking over 10, e.g.). Or maybe a renderer that builds its
HTML in JavaScript rather than from `<template>` tags[3].

The `discussionsRepo` gets the URL for discussions passed in, a list of
networks to filter by (maybe you only want reddit?) and needs to return either
an empty list (no errors, but nothing found), a list with discussion objects,
or a `null` (an error).

The `Renderer` then is handled this list and builds a DOM from
[`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
pieces found in the HTML. It renders either a list of discussions found around
the web, or the message that nothing was found, or an error.

You will need to register at discu.eu to get a proper API key, but the `test` key
works for testing.

Please let me know at [the repo
issues](https://github.com/berkes/discueu.js/issues) or in a PR, if you see any
improvements (I do!).

And big thanks to the work done by [Alexandru
Cojocaru](https://xojoc.pw/) on discu.eu. I'm merely adding a few lines of code
to his hard work.

---

* [1] One reason for that is that static site blogs, by nature, have fairly
  good SEO, so such blogs are a rewarding target to spam.
* [2] It's not a proper library yet, and I doubt I'll make it one. The
  use-cases are diverse and the actual code so simple, that abstracting this as
  a library that can handle most common use-cases, makes it way more complex
  than needed. Sometimes it's just best to copy the code from a library into
  your project, tweak it, and own it.
* [3] I'm aware this is somewhat a-typical Javascript, but I like Dependency
  Injection, and I like composition and encapsulation, which I find cumbersome
  and hard to achieve in functional JavaScript style.
