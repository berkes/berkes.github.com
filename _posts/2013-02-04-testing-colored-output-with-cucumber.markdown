---
layout: post_short
title: "Testing colored output with Cucumber"
tags: [cucumber, BDD, Aruba, Rainbow, Thor]
lang: en
---

I am improving a Command line app to [manage my todos](https://github.com/berkes/todotxt). I am developing it entirely 'Behaviour Driven', using [Cucumber and Aruba](https://github.com/cucumber/aruba).

All is pretty straightforward, but I had a hard time testing the colors in
the output. Colors are made with
[Rainbow](http://rubydoc.info/gems/rainbow/1.1.4/frames); which is
really neat, but sometimes a little too smart. Rainbow detects when it
outputs to something that cannot handle colors and turns them off. The
solution turned out to be really simple though.

Lets start with a simple script that outputs some Rastafari
{%highlight ruby %}
#!/usr/bin/env ruby

require "thor"
require "rainbow"

class Example < Thor
  desc "example", "an example task"
  def example
    puts "Yah!".color(:red)
    puts "...".color(:black).bright
    puts "Rasta-".color(:yellow)
    puts "fari".color(:green)
  end
end
Example.start()
{% endhighlight %}

Running this, results in:

![Example output](/images/inline/rasta_cli.png)

But piping this into a file, or for example less, shows no colors;
This is a useful feature built into Rainbow.
When testing with cucumber, the colors are gone too:

{%highlight cucumber%}
Feature: Example
  Scenario: Yah!
    When I run `example example`
    Then it should pass with:
      """
      Yah!
      ...
      """
{%endhighlight%}

This passes, but does not test any colors. First thing is to tell
Aruba/Cucumber to not strip the colors, ansi-codes, with an `@ansi` tag.

Next thing is to tell Rainbow to output colors regardless of where it
outputs to. We need to do do this in the application itself, by making
the application a little more testable. However, Aruba strips the colors
for a reason: it is really hard to test when all your output is littered
with ANSI escape codes. You really only want to force Rainbow to output
them when you are testing for colors.

{%highlight ruby%}
#...
class Example < Thor
  def initialize(*args)
    super
    Sickill::Rainbow.enabled = true if ENV["FORCE_COLORS"] == "TRUE"
  end
  #....
end
{%endhighlight %}

This allows you to force coloring when testing or running by setting the
variable, like so `export FORCE_COLORS=TRUE; ./bin/example example`. A step could
them look like "When I run `export FORCE_COLORS=TRUE; ./bin/example example`".

More usefull however, is that we can set this variable in cucumber for
all the `@ansi`-tagged scenario's. In a support-file
`features/support/ansi.rb`:

{%highlight ruby %}
Before('@ansi') do
  ENV["FORCE_COLORS"] = "TRUE"
end
{%endhighlight %}

With the scenario tagged @ansi, it fails: `expected
"\e[31mYah!\e[0m\n\e[30m\e[1m...\e[0m\n\e[33mRasta-\e[0m\n\e[32mfari\e[0m\n"
to include "Yah! ...`. Good.

Testing against strings like "\e[31m", however, is both error-prone and
unreadable. A simple new step definition, in which we add the
ansi-escape codes, using Rainbow, to the to-be-tested string. Which allows us to test colors really
easy.

The `features/support/ansi.rb` should include "rainbow".

{%highlight ruby %}
Then /^it should output "([^"]*)" in "([^"]*)"$/ do |string, color|
  assert_partial_output(string.color(color.to_sym), all_output)
end
{%endhighlight %}

{%highlight cucumber %}
Feature: Example

  @ansi
  Scenario: Yah!
    When I run `example example`
    Then it should output "Yah!" in "red"
{%endhighlight%}

Readable, easy testing of your colored output!

