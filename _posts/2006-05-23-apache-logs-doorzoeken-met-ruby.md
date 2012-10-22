---
layout: post_archive
title: Apache logs doorzoeken met Ruby
created: 1148408291
tags:
- coding corner
- ruby
lang: nl
---
Op mijn pad naar het [Ruby](http://nl.wikipedia.org/wiki/Ruby_(programmeertaal)) Meesterschap moet ik vele bergen overwinnen. Een van de eerste is uiteraard om [reguliere expressies](http://nl.wikipedia.org/wiki/Regular_expression) onder de knie te krijgen. En wat is beter daarvoor dan de webserverlogs?En  eens de reguliere expressie goed is, is het een eitje met Ruby. <pre>#!/usr/bin/rubydatafile = open(ARGV[0])reg = Regexp.new('^([^\s]*).*\] "GET[\s](/[\S]*)[\s]HTTP/[\d]\.[\d]"[\s]404[\s][\d]{3,3}.*$')datafile.readlines.each {|line|  if line =~ reg then    puts "#$1 could not find #$2"  end}</pre>Als er een 404 gevonden wordt, dan wordt er een regeltje afgedrukt met de host of het IP adres van de bezoeker en de pagina die niet werd gevonden.
