---
layout: post_archive
title: ! 'Wat kan wel en niet met Drupal: enkele vuistregels'
created: 1326295999
tags:
- drupal
lang: nl
---

Recent ontving ik weer twee mails met daarin de Gouden Vraag: "Wanneer moet ik Drupal nu gebruiken, en wanneer niet". Van de laatste kreeg ik toestemming om de vraag en mijn antwoorden uit te werken tot deze blogpost; anoniem uiteraard.
> 
...

Ik werk zelf al enige jaren met X [Een bekend ander CMS, of "ons eigen systeem"; BK] en dat systeem ken ik nu redelijk goed.

Door vragen van klanten/ontevredenheid met doorontwikkeling/zoektocht naar meer flexibiliteit ben ik eens naar Drupal gaan kijken.

Ik denk er daarom aan om over te stappen maar daarvoor zou ik _graag willen weten wat niet kan met Drupal._

Wie dat weet, en kan toepassen, heeft goud in handen en kan makkelijkprijzen van boven de $300/uur vragen. Ofwel: dat weet niemand.
> 
Ik ben daarom op zoek naar de concrete restricties/beperkingen van Drupal.

Die zijn er niet!

Voor iedere restrictie die je aanbrengt, brengt iemandanders een oplossing aan. En iedere beperking die ergens is beschreven, wordt door iemand andersbeschreven als ofwel een bewuste keuze (Y kan niet, maar dat is juist goed. Jij zou Y eigenlijk helemaal niet moeten willen) ofwel wordt er een uitbreiding, module of truukje uitgelegd waarmee, met wat werk, deze beperking omzeild wordt. Meestal vind je allebei.

Maar zelf hanteer ik enkele vuistregels, helaas niet erg concreet;
## Drupal is een CMS, geen framework of zelfbouw.

Drupal is een CMS, geen [framework (pdf)](http://www.riehle.org/computer-science/research/dissertation/diss-a4.pdf). Helaas is "[framework](http://stackoverflow.com/questions/301240/whats-a-php-framework-and-whats-a-good-one)" een vage term, daarom enkele stellingen:

Een framework doet geen aannames over het gedrag, de look en de feel van het te bouwen eindproduct.

Een framework heeft een duidelijke doelgroep: de bouwers van applicaties, zoals websites (niet persé programmeurs).

Een framework biedt een technische basis en infrastructuur.

Een framework biedt een technische infrastructuur die het bouwen en/of programmeren efficiënter maakt.

Drupal voldoet hier niet écht aan; het is niet alleen opnionated over hoe je moet ontwikkelen, het is vooral opinionated over hoe het gebouwde resultaat zal werken en er zal uitzien.

Vergeleken met een CMS als Joomla! voldoet Drupal hier wel meer aan. En is daarom meer een framework dan Joomla!Maar vergeleken met Codeignitor, Symfony, Rails of Django is het véél minder een framework. Drupal valt dan veel meer in decategorie bij Joomla! Typo3 en Wordpress, dan bij Symfony of Django.

Omdat een CMS al volledig functioneel is (na installatie kun je meteen aan de slag, is het een werkende site), heeft het vastgestelde "manieren".

Immers, na installatie heb je een werkend CMS. Hoe dat CMS je content benaderd, de workflow heeft bepaald, menusystemen ingeregeld heeft en wat de look en de feel is, liggen vast in de basis van dit systeem.

Drupal heeft dus een eigen wijze. En je moet dus je projectmanagement, wireframes, designs en workflows inrichten volgens hoe Drupal dat "wil". Niet andersom.

Wil je een CMS, Drupal, _exact_ laten gedragen zoals in je functioneel ontwerpen of technisch ontwerpen is vastgelegd, dan moet je twee keer zoveel ontwikkelen en eindig je met een drie keer zo complex systeem. Core doet manier-A. Uitbreiding X wordt ontwikkeld om manier-A ongedaan te maken. Uitbreiding Y wordt ontwikkeld om manier-B te implementeren.

**Ben in je in de positie om de TO's, FO's, wireframes en designs te maken met kennis van Drupal's "eigen wijze", dan zul je vooral mét Drupal kunnen werken, in plaats van tégen Drupal te moet werken.**
## Database-geörienteerd, geen abstractie.

Drupal is zeer [dicht op de Database gebouwd](http://upsitesweb.com/sites/upsites.co/files/drupal7_model_0.png). Dit is in Drupal 7 in theorie verbeterd, de praktijk moet nog uitwijzen of dit ook écht een verbetering is. Helaas is over Drupal 7 nog veel onbekend en zijn er weinig casestudies te vinden.

In de praktijk moet dus alles in een door Drupal bepaalde MySQL Database, volgens een doorDrupal bepaalde Databaseopzet (DBA) opgeslagen worden. Wil je informatie elders vanbetrekken, of elders opslaan (legacy databases, zelfgedefinieerde databasestructuren, webservices, NoSQL, XML-files,etc.) dan zul je een groot deel van je budget/tijd opzij moetenzetten voor complexe synchronisaties, cron-scripts, en diverse hooks. Een centrale API, layer of zelfs een aangeraden design pattern, ontbreekt geheel.

Ook zul je vooraf duidelijk moeten hebben dat zulke koppelingen daarom, in praktijk, altijd uitdraaien op een groot houtje-touwtje ducktape-en-paperclips systeem: het werkt, maar is verre van stabiel en overzichtelijk. Met bijkomende operationele risico's.

**Moet je koppelingen maken met externe systemen, bijvoorbeeld om daaruit content te halen of juist om daar data in te stoppen? Dan zit Drupal zeer waarschijnlijk vooral in de weg. Maak dan een duidelijke afweging of deze extra investering en complexiteit opweegt tegen de voordelen van Drupal.**
## Een module voor alles versus het gevaar van onhandelbare complexiteit.

[There is a module for that](http://isthereamoduleforthat.com).

Voor een middelmatig complexe site heb je al snel over de vijftigmodules nodig. Om bijvoorbeeld de functionaliteit waarmee Wordpressstandaard komt na te bouwen in een Drupalblogsite kun je rekenen opdertig modules of meer. Dat is een enorme payload die mede beheerd,geüpdate en geconfigureerd moet worden. Daargelaten dat een groterehoeveelheid modules bijna altijd een negatief effect op de performanceheeft. Hou hier rekening mee bij het ramen van de lopende kosten: eengrotere server, een tijdrovende upgrade, update en beheerprocedure eneen toenemende complexiteit bij het (door)ontwikkelen.

Uiteraard is de correcte oplossing om simpelweg "niet een exacte Wordpress te willen nabouwen". Waar Drupal standaard mee komt, is al genoeg om te kunnen gaan bloggen.

Ondanks dat dit een bekende vuistregel is, heeft het merendeel van de Drupalsites waar ik inzage in gehad heb veel meer dan die vijftig modules. Eerder rond de 100 modules, dan rond de 10.

Ook hier draait het weer om essentiële keuzes maken: je kunt heel goed bloggen met een Drupal zonder énige extra module. Pas als je allerlei eisen aan je workflow gaat stellen heb je modules nodig. Pas als je allerlei toeters en bellen erbij wilt, moet je enkele tientallen modules integreren, opmaken en doorontwikkelen.

**Ben je in de positie om structurele en functionele keuzes te maken? Dan kun je het functioneel ontwerp goed bijsturen aan hoe Drupal dingen "standaard doet en kan". En zijn weinig extra modules nodig. En wordt het project veel overzichtelijker en makkelijker beheerbaar.**
## Het enorme grijze gebied dat Themen heet.

Een Theme is, in theorie, niet veel werk, maar in de praktijk meestal de grootste klus van het bouwen van een site.

Veel hangt af van je eigen projectmatige inrichting van het enorme grijze gebied dat Drupal heeft tussen de"View"(de eigenlijke theme-files, de code), de configuratie (inregelen vancontenttypes, settings, views, panels, blokken enzovoort) en degebruikte modules. Zo kun je bijvoorbeeld kiezen om de "Posted by" opeen artikel in de configuratie uit te zetten, of om deze in de``node-article.tpl.php`` template file eenvoudigweg niet te renderen. Of om daarvoor een set modules in te zetten die dit op een zeer krachtige manier configureerbaar maken.

Een typisch maatwerk-theme, waarbij het design al rekening houd metDrupal, kost een ervaren themer op zijn minst drie volle werkdagen om tebouwen. Meestal veel meer, omdat behalve het bouwen van het theme, dezethemer continue moet wisselen tussen het inregelen en configureren vanonderdelen van Drupal en het bouwen van het theme en de CSS.

**Beperk je het themen enkel en alleen tot het aanpassen van de code in je theme? Dan ben je welliswaar beperkt in de mogelijkheden, maar is de klus zeer overzichtelijk en weinig werk. Maar betrek je het introduceren van allerlei functionaliteit erbij; of wil je in het theme ook bepalen hoe zaken zich gedragen, dan wordt het veruit de grootste klus van het bouwen van je website.**
## Met een houten kano de oceaan oversteken.

Verder wil ik met nadruk wijzen op het feit dat dit vuistregels zijn, geen wetten van Meden en Perzen.

Ik weet ook wel dat er altijd ergens een voorbeeld te vinden is van eensite die mijn ongelijk "bewijst".

Maar als iemand in een houten kano de Atlantische oceaan overgestoken is,bewijst dat alleen maar dat je met een houten kano die oceaan over kunt steken. Het is geenszins eenbewijs tegen een algemene stelling zoals "een houten kano is geen geschikt vaartuig om de oceaan over te steken".

Meer concreet: uiteraard zijn er mooie Drupalsites gebouwd die externe databases gebruiken voor hun content; maar daarmeeis nog niet gezegd dat _over het algemeen_  het integreren van externe bronnen, een zeer moeilijke klus is, in Drupal.

Heb ik wat vuistregels over het hoofd gezien? Wat zijn jou vuistregels? Zijn er dingen die Drupal volgens jou absoluut niet kan? Of zijn er gebieden of cases waar Drupal juist het allerbeste inzetbaar blijkt?
