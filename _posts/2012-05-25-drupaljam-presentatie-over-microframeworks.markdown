---
layout: post_short
title: "DrupalJam presentatie over Microframeworks"
tags: [Drupal, Microframeworks, Presentatie, Sinatra]
lang: nl
---
{% include JB/setup %}

Voor [DrupalJam 2012](http://drupaljam.nl/) werd mij gevraagd een sessievoorstel in te
dienen. Het leek me passend om een aan Drupal-gerelateerd onderwerp te
zoeken; welke niet direct over Drupal zélf gaat.

Vandaar: [Microframeworks](http://drupaljam.nl/sessie/microframeworks-queen-drupal-en-haar-onderdanen). En hoe je deze in een Drupalomgeving of -project kunt inzetten.

## Update: resources

* [De presentatie](http://berk.es/microframeworks/#/this-qr) ([source](https://github.com/berkes/microframeworks/tree/develop))
* [De voorbeeld applicatie, "questions"](https://github.com/berkes/microframeworks-questions)
* [Overzicht van frameworks voor PHP, Python en Ruby](http://berk.es/microframeworks/#/voorbeelden).

# Microframenworks: Queen Drupal en haar onderdanen #

> "MobileFooWizards heeft voor ons een iphone-app gemaakt, of we op de
> Drupalsite even een JSON-feed kunnen aanbieden van de nieuwsberichten 
> met de data zoals in dit mailtje staat"

Klinkt als een eitje. Toch? Beetje views klikken, klaar! Maar dan komt
het: hoe bied je mobielvriendelijke plaatjes in die content aan? Hoe
zorg je dat toekomstige versies van de app andere JSON kunnen lezen? Hoe
scherm je het af? Schaalt het wel? Voor je het weet is het een enorm
project, met allerhande afhankelijkheden, deployments enzovoort. 

## Het microframework: eenvoud ##

> Een goede ontwikkelaar kan niet zozeer alle problemen oplossen, maar kan
> ieder probleem opdelen in makkelijk oplosbare, kleine probleempjes. 
>  - Ik, zojuist

Microframeworks zijn gereedschappen waarmee je enorm simpele, piepkleine
webapplicaties bouwt.

Zo een web-applicatie kan perfect met Drupal samenwerken: Het kan Drupal
werk uit handen nemen, voorgekauwde informatie aanbieden enzovoort. Een
ideale onderdaan voor je Drupalsite.

Door een piepkleine website te bouwen naast Drupal dat bijvoorbeeld één 
enkele JSON-feed aanbied kun je Drupal veel werk uit handen nemen. Je
verdeelt je project in onafhankelijke, losse componenten, die allemaal één ding doen en
dat heel goed kunnen.

## Sessie ##
In deze sessie laat ik verschillende scenario's zien waar een
microframework samen met Drupal een gouden combinatie blijkt. 

We kijken naar het iPhone-app-probleem, maar ook naar hoe we informatie
Drupal ín kunnen krijgen. En we kijken hoe we Drupal kunnen koppelen aan
externe informatie en diensten door er een microframework tussen te
plaatsen. 

In de sessie zal hier en daar wat code voorbijkomen, maar dat is slechts ter illustratie. Uiteraard zul je moeten
programmeren om een microframework in te kunnen gaan zetten; maar in
deze sessie kijken we meer op een afstandje hiernaar. 
