---
layout: post_archive
title: Load Rubygems environment variables on startup (requie 'gemname' gives 'not
  found')
created: 1271233037
tags:
- ''
lang: en
---
Small note to self (When I blog about something, I tend to remember it better). 

On my new testing environment, I spent over twenty minutes figuring out why some <a href="http://api.rubyonrails.org/classes/ActiveResource/">gem</a> would not be available. 
Once I figured out that somehow I needed to add <em>require 'rubygems'</em> I came to realize that on the new machine, I did not add a certain line to my bashrc, an environment variable was not set. Since my development and production machines have this set, I forgot about it alltogether (when something "just works", why  bother more mental effort on the matter?).

Here is the line to be added to your <em>~/.bashrc</em>:
<code>export RUBYOPT=rubygems</code>

After that, in all your ruby environments, gems are automatically available when 'require'ing them. 
More on the matter at <a href="http://stackoverflow.com/questions/132867/i-have-a-gem-installed-but-require-gemname-does-not-work-why">stackoverflow</a>.
