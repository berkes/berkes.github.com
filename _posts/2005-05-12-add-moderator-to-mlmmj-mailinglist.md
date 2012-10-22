---
layout: post_archive
title: Add moderator to mlmmj mailinglist
created: 1115893473
tags:

lang: en
---
the quick command to add a moderator to an existing mailinlist in mlmmj

<pre>
sudo echo "email@example.com" | sudo tee -a /etc/mlmmj/lists/listname/control/moderators
</pre>
