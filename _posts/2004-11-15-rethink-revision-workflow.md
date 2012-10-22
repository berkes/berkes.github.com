---
layout: post_archive
title: Rethink revision workflow
created: 1100507000
tags:
- drupal
lang: en
---
<a href="http://drupal.org/user/10681">elias1884</a> Writes: please overthink the revision system default workflow as well. don't look at the revision system as an isolated system but as a part of the whole workflow system!<!--break-->

if you combine revisions with the moderation queue the most logic default workflow would be like that:

auth user creates node (revision #0)
admin approves the node (status = 1, moderation = 0)
=> node publicly available
auth user finds typo and changes node (revision #1, status = 0, moderation = 1)
-------
what happens at that point at the moment is, that the node is not accessible anymore at all until the new revision is approved by admin. of course the new revision should not go online until reviewed and approved, this is absolutely correct, but there is no reason to not take the old revision offline, since it was already approved and should therefore be online until the new revision is approved. it is not practical if a node disappears only because the author corrected a typo.
-------
admin approves the node (status = 1, moderation = 0)

eventhough I first thought a plain boolean active field would not be capable of providing that functionality if finally came to the conclusion, that it can. The only thing to do is to not set that bit, when a new revision is created, but when it is approved (in case moderation is activated under default workflow). Every revision should have its own moderation, status and active field and on approval they are set like this (status=1, moderation=0, active=Y).

When you wanna rollback to an old revision, you can chose between all revisions that already have the moderation bit set back to 0 again and the published to 1. There should be an extra permission for rollback!

another concern that I have about the default workflow is, that users can't see the content, they have just created, when moderation is enabled. Eventhough, there is a big fat "submission accepted" presented after submissions, unexperienced users tend to question the information those stupid tincans give them, if they can't find their content afterwards. Many users are really lazy bastards and they don't even read the status messages. The best feedback about whether his story was submitted successfully or not of course is, if he can find the story somewhere on the site, maybe with a status message on top of it, mentioning, that the content is currently not publicly available since it has not been approved yet. there should be a my content section under my account, like somebody is trying to do with the workspace module I guess.

so my suggestion is to make (status=0, moderation=1) still available for the creator under a my content section somewhere!
