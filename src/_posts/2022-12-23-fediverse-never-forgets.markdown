---
title: "The Fediverse never Forgets"
tags: [mastodon, fediverse]
lang: en
layout: post
---

Deleting content, reliably, from a decentralised network is just not possible.
The fediverse (Mastodon, Pleroma, PixelFed, etc.) in theory, never forgets. The
internet never forgets either. 

When I helped design a decentralized application[1], and later again an
Event-Sourced setup, we applied cryptography to solve this: encrypt all data that
should be deletable, then throw away the key(s) to "delete" the data.
ActivityPub relies very little on cryptography and certainly not as a way to
"delete" stuff. The common solution to removing stuff from a distributed network,
isn't possible, on the Fediverse.

So, any content that has been published, should, in theory, be considered out
of your hands: with no way to remove it. In that sense, the fediverse adds
nothing new. People can (and will) have screenshots, proxies can (and will) keep copies.
Archivers have copies, search engines have it indexed, data-collectors have it
collected, AI embedded in their models, and so on.

Deleting content from a centralized service (i.e. a tweet from Twitter) doesn't
guarantee that it is deleted from all those places; at most, it will prevent
distribution (forwarding, copying) of stuff that hasn't been distributed
(forwarded, copied) yet. Same with deleting a blog-post on medium, a repository
on Github, an image on Instagram, or a comment on Reddit. If your data hit the
internet, anyone might have stored a copy. But since there's only one central
authority that has the content, and everyone else must ask *them* for that
content in all other cases.

The *fediverse*, however, amplifies the distribution. Where a centralized
service operates on the idea of "at any time, just ask us, and we'll send you a
copy if you have access" (on-demand), the fediverse operates on the idea "we'll
send you a copy because you have access" (push). "Storing copies" is the modus
operandi of the fediverse.

In order for your Mastodon-post to reach hundreds of people, it is copied many
times[3]. Aside from this being [rather
inefficient](https://berk.es/https://berk.es/2022/11/08/fediverse-inefficiencies/),
it means your [Right to be forgotten
(GDPR)](https://gdpr.eu/right-to-be-forgotten/) is technically impossible to
uphold on the fediverse. For a privacy-touting network, this is a problem. Or
at least something to be very aware of. In practice, it is not a very big
problem, though.

Mastodon implements ActivityPub rather well. This is what [ActivityPub says
about deleting](https://www.w3.org/TR/activitypub/#delete-activity-outbox)
(Emphasis mine):

> 6.4 Delete Activity
> 
> The Delete activity is used to delete an already existing object. The side
> effect of this is that the server **MAY** replace the object with a Tombstone of
> the object that will be displayed in activities which reference the deleted
> object. 

For those unfamiliar with the words MAY, MUST etc [in RFCs](https://www.rfc-editor.org/rfc/rfc2119): 

> MAY This word, or the adjective "OPTIONAL", mean that an item is truly
> optional.  One vendor may choose to include the item because a particular
> marketplace requires it or because the vendor feels that it enhances the
> product while another vendor may omit the same item.

So even those that implement ActivityPub good-willing and properly, could omit
deleting entirely. Essentially, the ActivityPub standard does not adhere to the
GDPRs' right to be forgotten (IANAL).

And that leaves out all those that aren't good-willing, or deliberately
careless. Those that index the fediverse to mine advertising data, to build
indexes for bullying, or those that collect security-sensitive data for
phishing or whatnot. Malicious participants will most likely not adhere to the
standard anyway. Instances that oppose the GDPR for ideological reasons, or
live by the idea that nothing should ever be "(self-)sensored". So even if the
standard would enforce deleting, anyone can just choose to not follow the
standard.

While this may sound paranoid, it's not very far-fetched. Especially because on
this fediverse, many minorities and privacy-sensitive people congregate; those
with a higher risk of being bullied, phished, stalked, tracked and so on. It's
for that reason that Mastodon has [automatic deletion built right
in!](https://www.bentasker.co.uk/posts/blog/opinion/arguments-for-and-against-auto-deleting-mastodon-toots.html)

This "delete your content to increase privacy" is an often heard mantra, it
even gets it's own feature in Mastodon, the most used software. But this feature
promises much more than it can ever deliver.

What happens under the hood, when you delete a post, is that it sends out a
*Delete* request for that post to all servers that this post *has reached*
[code
here](https://github.com/mastodon/mastodon/blob/main/app/lib/status_reach_finder.rb).
This is a best effort action. Your instance cannot know for certain who really
received the content: a boost will have distributed it further, as will a reply
with a mention, or even a relay passing it along. It tries, though. It tries to
follow all the boosts, mentions, relays. But obviously only knows about those
that reported this boost, mention or forwarding successfully. And this ignores
an actual issue: if your post was distributed to instance-foo, and that
instance then block yours, or your instance now blocks them[2], the delete
request won't be delivered. You could see this as someone sending a second
email in which the sender asks everyone to please delete the previous
embarrasing email: not a great privacy model.

All the servers that then receive that *Delete* **may** chose to remove the
content (or replace it with a placeholder: a so called Tombstone). But even the
good-willing may fail: a glitch might prevent this: maybe the server is
overloaded, maybe it is down, maybe it hits an error, anything, really. In a
centralized service, such an even would probably be noticed and re-handled
later. In a distributed setup, we cannot ever know if the Delete request was
honored. And even if this is handled, it only gets removed from that instance's
database (and potentially from its ElasticSearch cluster): but not from its
backups or logs. Your instance does have backups, right? Right?

The same goes for deleting your profile. Or for editing a post. Or editing your
profile. Any data, any images, thoughts, biographies, links, names or avatars
that you put out there publicly should be considered distributed, and therefore
out of your hands: impossible to delete.

On the fediverse, it is best to consider anything that you published, to be
out there. Forever.

But that is also where the good news is: you can protect yourself, your data,
and your content from "getting out there" in the first place.

* [You can set a profile to protected](https://allthings.how/how-to-lock-your-mastodon-account/). This means only people that you
  grant access, will be able to read your profile's details and, more
  importantly, the content you write. Only your followers will get a copy of
  your posts. Though any follower (or their server) might still choose to keep
  the data; so keep that in mind when granting follow-requests.
* [You can limit the reach of a post](https://docs.joinmastodon.org/user/posting/#privacy). This means only a selected group
  will get a copy. And they -at least in theory- aren't able to copy it to
  other people: boosting should be disabled (by their server). The only threat
  is now very similar to centralised social media: a receiver taking a screenshot,
  or copying it from screen.

Content that hasn't been made public, hasn't distributed beyond your reach. So
even *if* any of those you sent it to, cannot or will not delete it, at least
you know who might still have it (and whether or not you trust them to keep it
safe). It's like sending an email to a limited amount of people. I know not to
include that gossipy aunt. And I know that if any of the recipients uses Gmail,
Google might mine my email for advertisers, eventhough I, the sender, am not
using Gmail, Google still gets a copy. But I can control this: If I truly
distrust Gmail I could choose to never send emails to anyone on Gmail. I'ts in
*my* hands. With Mastodon, you can, if you want, choose to never deliver your
content to certain servers and it's far *easier* than it would be for that
hypothetic gmail-avoider.

The "threat" (if it can be called that at all - maybe limitation is a better
word?), is at the moment mostly theoretical. And while that might change, it
hasn't yet. 

Mastodon, and, as far as I know, also Pleroma, PixelFed, PeerTube and
probably others, do try their best to actually delete your content when you
request it to be deleted, you cannot be certain that a recipient is running an
(unmodified) Mastodon. Or that they secure their servers, or that their
instance won't be sold to some advertising company. Or that they run into technical
problems and fail to follow up on such a delete request.

Right now, a delete request, in practice, will get through and will be
followed up. Your deleted content is unlikely to end up in public places. And
you have the tools to protect yourself from actors that don't follow up on
deletion requests. Deleting content will, quite certainly, reduce the places
where a copy is kept. Maybe even reduce it to zero!

But, as I posted earlier:

> In the #fediverse, deleting content is really just a suggestion. Servers can,
> and will ignore it entirely. Keeping the content that you deleted.

[@berkes@bitcoinhackers.org](https://bitcoinhackers.org/@berkes/109556281027022788)

---

* [1] Blockchain stuff. Defi and all. Obviously never went anywhere.
* [2] I'm not entirely sure of this. Reading through the code makes me think
  that a mastodon instance will actually still deliver delete-requests to
  instances it blocks. But that seems weird, and it does leak information (though
  only the fact that a post with id X has ever existed). I might be wrong.
* [3] The ActivityPub protocol allows two modi here: the email-concept, where a
  server will copy it to the final recipient, and so might hold on to hundred
  identical copies if a message was delivered to hundred users on their server.
  The other is where the server just keeps one version and serves that to each
  recipient.
