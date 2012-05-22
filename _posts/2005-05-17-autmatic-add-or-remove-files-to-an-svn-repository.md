---
layout: post
title: Autmatic add or remove files to an SVN repository
created: 1116348368
tags:
- Library
lang: en
---
When you have added or removed a lot of fiels and directories in a local reopsitory, it can be a hard task to add them all by hand. These two small scripts help with adding or removing any files that were added or removed in the local repository. But use with care.

Add all local added files and directories from the repository.
<pre>
#!/bin/bash
svn add  `svn st | grep '^?.*' | tr -d '? ' | sort -n | tr '\n' ' '`
</pre>

Remove all local deleted files and directories from the repository.
<pre>
#!/bin/bash
svn rm `svn st | grep '^!.*' | tr -d '! ' | sort -n | tr '\n' ' '`
</pre>

After that you still need to run 
<pre>
svn commit
</pre>
though.
