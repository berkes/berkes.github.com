---
title: "Making a case for JavaScript, in-browser Mining"
tags: [cryptocurrency, mining, monero, brave, coinhive]
layout: post
lang: en
---

So, today, [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich)
spoke up against mining on your browser.

Eich is the founder of Mozilla, Inventor or JavaScript, and current CEO of the ground-breaking browser [Brave](https://brave.com/).

On [twitter, he says](https://twitter.com/BrendanEich/status/963845740077314048):

> Brave now blocks the abusive-even-when-opt-in (1.75 cores on my MBP
> which became too hot to call a laptop) 1st party Monero mining script
> at Salon, thanks to fast work by @lukemulks.

I have several problems with this tweet, and this this new
block-them-all feature in the Brave browser and most adblockers.
Which I'll explain below.

First, some background on Brave: Brave has its own cryptocurrency, BAT,
which is a payment system that allows you, the user of Brave, to pay a
website or publisher. A very nice alternative for ads, so to say.

I love this idea, on a high level: to let me, a user, decide
to pay a site that I peruse. I've ran Brave ever since they came with
this idea and a built-in Bitcoin Wallet, to leverage this same idea 
(which they now moved to a BAT system).

Now, some background on browser-mining. Quite some cryptocurrencies use
[a mining algorithm](https://en.bitcoin.it/wiki/CryptoNight) for which making specialised hardware is impossible
(currently infeasible, actually). [Monero](https://getmonero.org/) is one of them, the most
famous. So, Monero, for example, is mined on "normal" CPU's. In order to
mine more Monero, you need more CPU's. And because of how the mining
works, it can be done in your browser, using a miner that is written in
JavaScript: a browser miner.
And when I want to "mine more Monero", where can I "obtain" more CPU? Right: by running that miner on the
visitors of a website.

I've spent 3 hours writing this article, spent ฿130 on
coffee (That is Thai Baht, not Bitcoin) and considerable research on
monero and coinhive to get this to you. If you like my work, consider
pressing the button below, to run a miner on your computer, and pay me
with a few Watts of your electricity. Or to see how it works, without
paying me, see the [demo on Coinhive](https://coinhive.com).

<script src="https://authedmine.com/lib/simple-ui.min.js" async></script>
<div class="coinhive-miner" 
	style="width: 638; height: 110px"
	data-key="VIdRYiFeVMnRF81dydg1ey4MTdHKE4xq"
	data-autostart="false"
	data-whitelabel="false"
	data-background="#000000"
	data-text="#eeeeee"
	data-action="#00ff00"
	data-graph="#555555"
	data-threads="2"
	data-throttle="0.5">
	<em>Loading...</em>
</div>

Note that there's is a big chance that your adblocker is blocking it, so
[head over to a standalone page
instead](https://authedmine.com/media/miner.html?key=VIdRYiFeVMnRF81dydg1ey4MTdHKE4xq),
if you wish. Or disable the adblocker, I'm running nothing but my own
piwik - pinky promise.

The first problem with Brave's implementation, is that it is default-on
and an all-or-nothing thing. An alternative would be a popup like
"Google Maps want's to access your location. [Allow] [Never]". You've
probably seen it. Below is an example from Chrome (in Dutch, sorry):

![Confirmation dialog example](/images/inline/confirmation.png)

```
berk.es wants to
  mine Cryptocurrency on your laptop.

                     [Block] [Allow]
```

Brave could have gone for this established UI-pattern, but instead they
chose to "block it all". A pity. A missed opportunity.

Imagine the possibilities:

* Donate to Wikipedia by mining a few minutes, instead of dealing with their annoying beggar-popups
* Use Netflix for free, by running a miner on one CPU core when watching
    series.
* Avoid the privacy-abusive advertising industry by running JavaScript
    on your computer, rather than tracking users all over the place.
* CAPTCHA's, DDoS protection, all by running a few seconds of a miner on
    your laptop.
* Have "outgoing affiliate links" that don't work in secret behind the
    scenes with trackers, cookies and whatnot, but a clear `[Mine and
    Redirect] or [skip mining]`-page URLs. A step-up from a [link like
    this](https://cnhv.co/1ma5t) (NOTE: following that link does pay me a few
    grains of coffee actually, thanks!)

The second problem I have with Brave is the fact that "mining
cryptocurrencies to donate to a website" is a direct competitor of their
own platform, where you donate to a website by obtaining their own
currency and paying with that.

Competition is always good, don't get me wrong.  It's just that this
direct competition gives Brave incentive to block their competitors in
their browser. Or to present the competition as "inherently evil" and so
on. All under the pretence of "protecting the users". Which, in some
way, they actually do.

I'm not pretending to know the  that Brave or Brendan Eich are
implementing their "mining blocking" because of this. But I do know that
their own incentives are perpendicular to those of incentives like
Coinhive. That should make you at least wary of what they say about
each other: a competitor will never say about their competition that it is
a good alternative.

This could be a reason that the Brave developers chose to not
white-list "JavaScript mining initiatives" which try to implement an
actual friendly, opt-in system. Or to work together with those that try
to be friendly, honest and clear about the mining on a website".

The third problem I have is how this "block all mining" and the noise
around it, drowns out any proper discussion about it. The
current stance, fueled by brave and Brendan Eich is that "Browser Mining
Equals Evil". I fear the discussion is closed and an otherwise
interesting technology is killed off.

This certainly is the fault of all the "Evil" miners our there, though.
They are abusing ad-networks, hacking websites, routers and CDNs,
for some free Monero. The overwhelming majority of browser-mining is evil and done
without your consent. That *is* bad. And should be blocked.

But the solution to work towards would be to block the evil ones and work
together with companies like Coinhive, to improve the initiatives for
honest and friendly-use-cases.

As a sidenote: One of the biggest "threats" for CPU-mined cryptocurrency
like Monero, currently, are all these evil players. The miners
operating botnets, hacking CDNs to inject Browser miners, stealing AWS
credentials, are rewarded much higher, while honest miners, with a
laptop (and some cheap solar energy) stand no chance. I would not be
surprised to learn that a vast majority of mining power in Monero comes from
"stolen" CPU-cycles. But that is a different discussion.

Which brings me to the "energy use of cryptocurrency"-debate. A lot of
people dislike all cryptocurrency because it is "uselessly" burning up
electricity. A stance that I find just as strange as someone being
against neon-ads, or public television screens. All these screens on
city-streets, all these huge Coca-Cola signs on top of buildings
combined -a wild guess, I could not find any proper figures to back this
up- probably use far more energy than Bitcoin or Monero does. And it is
just as "useless".

But even if true: a proper, opt-in, consensual miner on a website allows
someone who dislikes this whole crypto-crap to just ignore it. If you
don't like it: don't participate. If you do see the value in it, think
it is not "useless", then it is a nice way to make a micro-payment to
that site.

But, back to that evil network of JavaScript miners: they have
messed up an otherwise fantastic opportunity.

You can see this opportunity in action above: a single click of a button and
you can pay me for writing this (again, I need to stress this to make
the point clear: you can simply also ignore it!)

Clicked it? You just paid me!

You did not need to register with PayPal, or pay fees to a
credit card-company. You did not have to buy some token or currency on an
exchange. Did not have to install a special browser to donate, there
were wallets to top-up, no copies of ID-cards to send to some server
(that will be hacked in some future) because of KYC-money-laundering-regulations. No
secret keys to back-up, no wallets that can get hacked, or
twelve-words-backup-phrases to securely store away in that safe you
still need to buy.

Just a press of a button and you are rewarding my work. And
paying for another coffee.

**It is privacy-friendly**: had I embedded some ads from Bing or Google,
they, and hundreds of other data-miners out there would be tracking you,
my precious visitor (the only tracking this site has, is my self-ran,
self-hosted, privacy-enhanced Piwik analytics). Ads are the really very
evil, deceptive and abusive alternative here: they mine your data, sell
it, trade with it, and use it to present more ads. Most of the time all
this "stealing of your data" happens without your consent and without
you knowing: that is why I tend to call them thieves: they steal data
from you that you never agreed on giving away.

**It is very clear and honest, when opt-in**: I'm *not* running anything
on your computer. I'm not selling your data to trackers or ad-networks.
I'm offering you a choice to donate to me. Had I ran ads, I would be
selling the privacy of you, my visitors, without your consent, to large
companies that live of gathering (stealing) and mining that data. Which
is far worse. Of all the alternatives, an opt-in JavaScript miner is the
most honest one, since it's abundantly clear what I'm offering. And you
are in your full rights to simply ignore my request.

Now, if you don't feel like clicking that mining-thing above, feel free
to "pay" me, by sharing this story, or dropping me [a line on @berkes,
my twitter feed](https://twitter.com/berkes/).
