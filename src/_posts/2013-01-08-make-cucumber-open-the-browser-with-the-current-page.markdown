---
layout: post
title: "Make cucumber open the browser with the current page"
tags: [cucumber, bdd, rails, ruby]
lang: en
date: 2013-01-08
---

[The Cucumber Book](http://pragprog.com/book/hwcuc/the-cucumber-book)
describes a really nifty trick when testing web-pages: open the browser
when a step fails. This is a feature provided by cucumber itself.

Add a support file `features/support/debugging.rb`:

```ruby

After do |scenario|
  save_and_open_page if scenario.failed?
end
```

And add [launchy](https://github.com/copiousfreetime/launchy) to your gemfile, and `bundle install`. (or install it with whatever else
you use).

```ruby

group :test do
   #...
   gem "launchy", "~> 2.1.2"
end
```

This will save the page that cucumber is looking at, then open it in
your browser. Works fine, untill you have a large suite of features and
some refactoring breaks many features. Having to close twenty tabs in
your browser after each run is counterproductive and often really
frustrating.

I solved this with a flag that allows me to fire this debugging-trick
only when I need it.
When I have a failing scenario, and I want to investigate it by
inspecting the page, I run my cucumber with an additional
environment-variable:

```bash

$ cucumber debug=open
```

```ruby

After do |scenario|
  save_and_open_page if scenario.failed? and (ENV["debug"] == "open")
end
```

The `debug=` syntax allows for more simple tricks too. Like `debug=pp`:

```ruby

require "pp"
After do |scenario|
  save_and_open_page if scenario.failed? and (ENV["debug"] == "open")
  pp(page) if ENV["debug"] == "pp"
end
```

Simple trick, works like a charm.
