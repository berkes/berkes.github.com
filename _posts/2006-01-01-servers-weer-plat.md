---
layout: post_archive
title: servers weer plat
created: 1136131738
tags:
- ''
lang: nl
---
Ongeveer een half jaar geleden besloot ik naar lycos VPS te verhuizen, nadat ik daar positieve verhalen over had gelezen op diverse webhosting fora. Het was toen nog heel nieuw. Lycos biedt goedkope virtuele servers aan. Servers waar je dus volledige root access had en ik alles dues zo kan indelen zoals ik het graag zie. Bovendien een uitermate leuke speeltuin en een leerschool. de hoofdreden waarom ik die flexibiliteit wilde was omdat ik dan aan de slag kon met multisite hosting. Dat is zoiets als heel veel sites die draaien op een codebase.

Heerlijk makkelijk qua onderhoud, mits de goede server instellingen en dergelijke.

Goed Lycos. Ik was aangemeld, het liep inderdaad als een tierelier. 15 sites zonder een eenkel probleem. Dus toen [we](http://www.newmoon.nl/pip/index.php) aan newsphoto begonnen te developen, leek me dat een ideale opstart server. Toen begon gelijk de ellende. Om een of andere reden stond de server van newsphoto wel op een rammelserver, maar stond die blijkbar ook nog eens vooraan in de vuurlinie. De eerste weken ging de server ongeveer dagelijks plat omdat hackers met super brute kracht probeerden in te breken. Daar was gewoon niet tegenop te werken. Niet dat iemand is binnengekomen. Maar hun probeersels waren zo aggressief (vanuit supergrote computers waarschijnlijk) dat ze dat kleine servertje gewoon platwalsten door duizenden gebruikers/paswoorden per minuut te proberen!Toen dat na een tijd afnam, begonnen de problemen bij lycos. Die prutsers hadden maar klanten aangenomen, en aangenomen, en aangenomen, zonder te beseffen dat ze daarvoor ook wel plek hadden. resultaat was een bijna dagelijkse uitval. Nu is dat allemaal opgelost. Voor newsphoto.

En dan begint mijn webschuur server te etteren. Een van de sites op webschuur werd opeens erg populair bij google images. Gevolg was dat heel veel (honderden) van die myspace prutsers een paar plaatjes als hun achtergronden gebruikten! Ik heb dat opgelost met een tijdelijke anti [deeplink redirect](http://www.webschuur.com/misc/imagetheft.png). Ook dat mocht niet baten, mijn bezoekers aantallen zijn in de spanne van twee weken verviervoudigd op de server. Dat trekt die server nu dus absoluut niet meer. Gevolg is dat ik weer bijna dagelijks de boel handmatig moet repareren en herstarten. Mijn excuses. Een [betere Drupal server](http://sympal.nl "Eenvoudige kant en klare websites, met goed onderhoud en ondersteuning") komt er heel snel aan.
