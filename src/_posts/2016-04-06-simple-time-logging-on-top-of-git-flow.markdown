---
layout: post
title: "Simple time logging on top of git flow"
tags: [git, productivity]
lang: en
---

My current team found out that we should have tracked some time over the last year.
Extracting timelogs in retrosepct is not fun. Git helps a lot, combined with chat-logs from Slack, Google Calendars will give a good basis. A day of grep, sed, and awk, and you have some time-logs.

I decided that from now on, I want to track what I start and finish working on in a basic log. And I am using git with
[git-flow by Peter van der Does](https://github.com/petervanderdoes/gitflow/wiki/Installation), which is what you get when you
`apt-get install git-flow`. This allows special git-flow hooks.

I want this to write logs to a simple textfile. But have a place where I could call external APIs to insert some tracking data into external trackers, when my team uses these.

The result is certainly not a replacement for actual timetracking. But a log that will aide with answering "when did you work on what?".

{% highlight text startinline %}
[2016-04-06T06:43:13Z] /home/ber/Documenten/BLG_blog STARTED article-git-flow-logging
[2016-04-06T06:43:16Z] /home/ber/tmp/flowtest STARTED a-feature
[2016-04-06T06:43:47Z] /home/ber/tmp/flowtest STARTED another-feature
[2016-04-06T07:12:10Z] /home/ber/Documenten/BLG_blog FINISHED article-git-flow-logging
[2016-04-06T07:43:52Z] /home/ber/tmp/flowtest FINISHED another-feature
{% endhighlight %}

These will be written out when using

{% highlight bash startinline %}
git flow feature start some-feature
git flow feature finish branch
## or the short alternative
git flow feature finish
{% endhighlight %}

It requires you to work with git-flow and use feature branches for everything. But you should use topic branches anyway.

Git-flow triggers its own hooks. So just create a simple utility script that is exectuable and logs an activity, or calls an external API or whatever you are using. Then call that script from the git-flow hooks.

Note that, as far as I can tell, the upsteam git-flow by nvie himself, does not
have own git-hooks. [Peter van der Does' fork](https://github.com/petervanderdoes/gitflow)
has this. Which is also the source used for the Debian package (so also for 
Ubuntu).

{% highlight bash startinline %}
#!/bin/bash
set -e

working_dir=$(pwd)
feature=$2
action=$1
now=$(date -u +"%Y-%m-%dT%H:%M:%SZ") # ISO8601

echo "[$now] $working_dir $action $feature" >> ~/.git-flow-feature.log
{% endhighlight %}

Write that to e.g. `~/bin/log-git-flow-feature` and make executable with
`chmod +x ~/bin/log-git-flow-feature`.

Note: when you create scripts with `git-foo`
a subcommand `git foo` is made available. You probably don't want to name this
script `git-flow-log-feature` or so, to prevent `git flow log` from becoming
a command.

Now just add two hooks and make them exectuable. This will add hooks to a specific
git repo:

{% highlight bash startinline %}
echo 'log-git-flow-feature STARTED "$@"' >> /path/to/project/.git/hooks/pre-flow-feature-start
chmod +x /path/to/project/.git/hooks/pre-flow-feature-start
echo 'log-git-flow-feature FINISHED "$@"' >> /path/to/project/.git/hooks/pre-flow-feature-finish
chmod +x /path/to/project/.git/hooks/pre-flow-feature-finish
{% endhighlight %}

When I need to call an external time-tracker, the `~/bin/log-git-flow-feature`
script is the place to do this. An example:

{% highlight bash startinline %}
#...
curl -X POST -D "{ 'note': '$feature in $working_dir' }" http://timetracker.io/api/entry
{% endhighlight %}

I've create [a gist with the contents of the files](https://gist.github.com/berkes/714141a6c131b20496fc00d6e3a90d38) so
if you want to enhance it, feel free to fork it!

There is a lot of room for improvement:

* make this work with "generic" git-hooks instead of relying on git-flow. Should
  probably match against patterns in branches that are created, merged, rebased
  etc.
* map directories with projects, log name of the project.
* don't use "pwd" but determine the actual working copy of git instead, to allow
  this to work with fancy setups or when working from within subdirectories.
* log `git flow feature checkout` as well, to log switching between (long)running branches.
* fall back on generic git-hooks
