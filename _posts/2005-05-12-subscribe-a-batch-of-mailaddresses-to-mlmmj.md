---
layout: post_archive
title: Subscribe a batch of mailaddresses to mlmmj
created: 1115896250
tags:
- ''
lang: en
---
This small and simple perl script will iterate over a textfile with mailaddresses. For each address (one line in that file), it will execute the subscription command.

<pre>
#!/usr/bin/perl -w

$FILE = "list.txt";
open(FILE) or die("Could not open file.");
foreach $line (<FILE>) {
   # do line-by-line processing.
   @command="sudo /usr/bin/mlmmj-sub -L /var/spool/mlmmj/listname/ -a ".$line;
   `@command`;
}
close(FILE);
</pre>

Todo: make it accept arguments for mailinglist-name and for the filenalme to read from; Also make it accept stdin instead of a file.
