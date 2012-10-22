---
layout: post_archive
title: Buma/Stemra Blocker voor Drupal
created: 1254864022
tags:
- politics
- module
- drupal
- buma
lang: nl
---
De [BS blocker](http://github.com/berkes/BS-Blocker) is een enorm eenvoudige [Drupal](drupal.nl)module. De module zet bij installatie de IP adressen van Teezir in de Access-rules van Drupal: Teezir wordt dan van uw site geweerd.[Download hem hier](http://github.com/berkes/BS-Blocker/downloads)UPDATE: de laastste **versie, 0.3**, haalt online nieuwe te blokkeren adressen op. Hiervoor moet je a Drupal site cron draaien, en moet je server toestaan dat externe bestanden geöpend kunnen worden. Kan dat niet, dan kun je zelf het bestandje ip-adresses.txt vervangen en zal dat door de cron opgepakt worden.

Ga naar _admin › settings › bs_blocker_ om de interval in te stellen. De lijst met te blokkeren IP-adressen staat <ha href="http://github.com/berkes/BS-Blocker/tree/ip-list">op github.

Teezir is het bedrijf dat een Bot bouwde waarmee Buma/Stemra het internet afzoekt naar auteursrechtelijk beschermd materiaal. De module werkt (ze draait hier) maar is helemaal niet bedoeld om een valide blokkade te zijn voor deze bot. Het is ook zeker geen vrijbrief om maar wat te gaan jatten en muziek te gaan verspreiden. Het is bedoeld als tegengeluid tegen het [bericht dat Buma ons allen wil gaan laten betalen voor het embedden van multimedia.](http://www.marcoraaphorst.nl/2009/10/01/buma-gaat-je-laten-betalen-voor-youtube-embedding/)Zoals ook al in de readme staat, verzoek ik iedereen met meer informatie over de bot van Teezir mij daarover te pingen.<pre>Please contact me at twitter:[@berkes](http://twitter.com/berkes), IM:berkes@jabber.org.uk or on bler.webschuur.com/bs_blocker if you know more patterns for the Teezir bot.        Initial information on the bot can be found at [http://www.teezir.com/?tabid=81](http://www.teezir.com/?tabid=81)        Info on the IPs behind the domain teezir.com here [http://www.robtex.com/ip/77.243.161.175.html](http://www.robtex.com/ip/77.243.161.175.html)Info on Drupal's blocking system in the handbook: [http://drupal.org/getting-started/6/admin/user/rules](http://drupal.org/getting-started/6/admin/user/rules)</pre>Uit de README nog enkele opmerkingen:<pre>NOTE: The teezir bot can probably switch to other IP addresses really easy.       So untill we find a more complete list of IP addresses or patterns,       this module will probably not help at all.

NOTE: You block an entire company, not just one bot. They run more bots, so installing      this blocker, may break your business if any other of the teezir servers need to       have access to you site.

NOTE: Do not rely on this module to protect you from copyright issues. Even íf,       this module would block the bot entirely (and it will most probably not)      people can still visit your site manually.

NOTE: You should not steal and distribute copyrighted material. You should       actually try some Creative Commons works, instead: [http://creativecommons.org](http://creativecommons.org).      Or any other "alternatively" licenced work.</pre></ha>
