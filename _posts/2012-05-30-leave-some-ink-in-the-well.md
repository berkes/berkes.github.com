---
layout: post
title: "Leave some Ink in the Well"
tags:
- programming
- tips and tricks
lang: en
---


Many writers know Hemingway's tip:

> Leave some water in the well.

From
[Impulse](http://artisticwhim.com/blog/2005/12/leaving-a-little-ink-in-the-well/):

> It’s a great idea: stop work­ing when you’re writing your best and it’s easier to start writing next time.
> You leave the work excited to return. You only face the dreaded Blank Page in the middle of your writing session, fresh from a success.

I found the same goes for Coding, albeit for different reasons. And, as
a coder, I created a silly little script to help me with that.

![Screenshot showing where I left the ink in the
well](/images/inline/ink.png)

## You get disturbed.

*I* get disturbed a lot, during work, anyway. When finally you have mapped the
entire stack of some weird application in your brain, your phone rings,
alarms for some server start blinking, or you get some new twitter reply.
Woosh, the effort is lost; the energy put into mapping everythin in your
brain: wasted.

But even more often you have planned interuptions. Such as the end of
the day, lunch, or some meeting.

## You have many projects intermingling.

Ideally, as a programmer, you work on one problem at a time. Lucky
people work on one technology, in one environment with only one language
and toolset.

Luckily I don't, because that would bore me to death. I love working on
multiple projects simultaneaously. Most of us do, if the average github
commitlog is any proof.

So, you are working on some problem in, say, Drupal. And suddenly your
time is, up, or a more urgent, say, CSS-issue needs solving. Or some
server configuration needs sorting out, because backups or builds are
failing.

What do you do? Commit the unfinished state? `git stash` it? just leave
it as it is?

You could leave some ink in the well. Using a simple `@INK` marker.

For example:

{% highlight ruby %}
def by_ranking
  # @INK: the rank attribute is not updated or filled
  #       in the database, it seems. @TODO: make a 
  #       migration to add this field to the database,
  #       then an after_update hook to actually fill this value.
  sort {|a,b| a.rank.to_f < b.rank.to_f}
end
{% endhighlight %}

A simple '@INK' with a comment. `@INK` is a different marker then
`@FIXME` or `@TODO`. Actually, `@INK` is *also* a TODO.

Then, whenever you pick up a project, you look for the @INK, have your
*aha-moment* and can jump right in where you left.

The only problem I have with this, is when you get disturbed, you often
don't have the time to dump your thoughts and mental-state into such a
comment. But telling the person behind you to "wait a sec till I finish
this sentence" is not too strange.

Some rules apply:

* There can be only one `@INK`. Ever. (A project can have many `@FIXME`'s or
  `@TODO`'s)
* `@INK` marked code may never be pushed to other people's or a central
  repository. They are your private markers.
* Whenever you open a project, you *must* search for the ink first. Then
  either remove it, replace it with a TODO or start where you left.

And with a simple script, you can find your ink in the well:

{% highlight bash %}
#!/bin/bash
echo "-- Last four commits --"
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative -n4
echo "-- Git status --"
git status -s
echo "-- The INK --"
ack-grep -C 4 "@INK" --all
{% endhighlight %}

It gets some context with two git commands, one to render a short,
[pretty git log](http://www.jukie.net/bart/blog/pimping-out-git-log),
to learn what you did last, before you left the project.
The other to show the changes in the repository: uncomitted, changed and
removed files and such. 
And the last shows you where you placed the `@INK` marker, with a few
lines of context.

Instead of [ack-grep](http://betterthangrep.com/), you can use `grep` if
you prefer. I'ts just slower and needs additional "--recursive *"
parameters.

There, it works very `@INK [berkes wo may 30 15:09:51 CEST 2012]: write some catchy finishing line; the postman is ringing at the door`.
