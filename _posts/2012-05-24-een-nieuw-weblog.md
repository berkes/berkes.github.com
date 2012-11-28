---
layout: post_medium
title: "Een nieuw weblog"
tags: [drupal, jekyll]
lang: nl
---


Zo. Eindelijk. Een nieuw weblog. Mijn oude blog stond op
_bler.webschuur.com_ en op _webschuur.com_. Zo heet ook mijn bedrijf:
_webschuur.com_.

Al diverse malen heb ik geprobeerd om alles om te gooien, om na 80% van
het werk erachter te komen dat ik verkeerd bezig was.

> 't is bij de loodgieter dat het kraantje lekt.

Mijn blogs _bler_ en _webschuur.com_, respectievelijk mijn persoonlijke,
Nederlandse en zakelijke Engelse blog, moesten samengevoegd. Waar ze op
draaiden, Drupal moest geheel vernieuwd. En het design moest hoognodig
op de schop. Oh. En ik had een veel cooler domein: berk.es.

Alle content is gemigreerd, maar nog niet alles is gerepareerd: er
zitten duizenden artikelen die teruggaan tot 2001 in de database. In
allerhande formats, met allerhande extra content, en veel artikelen
bleken al jaren kapot. Dat moet met de hand aangepast gaan worden. Dat
is een klus voor de komende weken.
Alle reacties zijn nog niet gemigreerd. De spam moet er eerst helemaal
uitgefilterd worden en dan moet alles geconverteerd en gemigreerd worden
naar [disqus](https://disqus.com/admin/moderate/). Een hels karwij, 
ook voor de komende weken.

## Jekyll 

Deze blog draait op [Jekyll](http://jekyllrb.com/). Jekyll is
supereenvoudig: het gebruikt een tekstbestandje per artikel en genereert
van al deze bestandjes een site. Die upload je dan. Klinkt ouderwets,
maar is vooral supereffectief: geen CMS, geen database, geen complexe
serversoftware, geen veiligheidsupgrades, mogelijke inbraken in je CMS,
enzovoort. Sneller dan zo een site kun je niet krijgen; veiliger dan zo
een CMS bestaat zelfs in theorie niet; en de eenvoud is onvoorstelbaar.
En het hosten is zelfs op een professionele omgeving zo goed als
gratis.

Althans, als je tekstbestandjes bewerken makkelijk vind. 
Wat technischer: je schrijft de tekst in HTML of in markdown. Dat wordt
dan omgezet naar schone HTML. Je beheert alle tekstbestandjes met een
revisiebeheersysteem (git, in mijn geval) en dat revisiebeheersysteem
zorgt ook voor de deployment; het genereren en uploaden van de site.

## Waarom geen Drupal?
Allebei de sites draaiden Drupal. Beide waren FUBAR: totall loss.
Upgraden ging niet (meer) en oplossen van problemen leverde alleen nog
maar meer problemen op:

* Spam: Ik heb alle spam-oplossingen voor Drupal geprobeerd, maar met
  soms miljoenen (!) spam-posts per dag slippen er altijd een paar
doorheen. 1% van 1miljoen is nog altijd 10000. Als ik soms een weekje
niet keek, had ik honderduizenden spams die toch doorgesijpeld waren:
een versterkend effect: want gepubliceerde spam trekt spammers aan.
  **Oplossing**: een nieuw commentsysteem: Disqus. Dat vergt een
moeilijke migratie.
* Oude modules, oude content: In de loop van de tijd heb ik Drupal
  honderden keren geüpdate en iets van zeven keer geüpgrade. Altijd ging
er wel iets kleins mis, of was er voor een module geen upgrade. Het
resultaat is een kapotte database, veel kapotte content en enorm veel
achtergebleven puin. De **oplossing** is een volledige herbouw. En een
volledige export en import van alle oude artikelen.
*  Drupal is enorm zwaar geworden. Veel te zwaar voor een klein blogje.
   Dat merk je extra goed als je een miljoen hits van spammers krijgt.
Maar dat merk je ook als het heel eventjes wat drukker is. Mijn
[servertje](https://www.linode.com/) kan vijf drupalsitejes aan. Echt
niet meer. Dat is belachelijk: één dedicated VPS voor vijf piepkleine
sites. Upgraden naar Drupal7 van alle vijf zou betekenen dat ik een
grotere of tweede VPS erbij moet bestellen: belachelijk. Of dat ik met
proxies, memcache enzovoort in de weer moet. Voor vijf kleine sites:
belachelijk. 
  **Oplossing** bij de oude, beter performende Drupal blijven, of een
ander CMS.

Bovendien had ik wat kleine, simpele eisen aan een nieuw Blog:

* HTML5 (en CSS3) voor de layout.
* Mobielvriendelijk.
* Schone HTML.
* Geen/nauwelijks beheer en veiligheidupdates.
* Tweetalige content.

Drupal7 kan met veel pijn en moeite enigszins schone HTML5 uitserveren.
Maar na 80% van mijn design geïmplementeerd te hebben (en daarvoor een
heel nieuwe theme engine geschreven te hebben) besloot ik dat dit
onzinnig is. Ik kon beter naar iets op zoek dat mij meer controle over
de layout enzo gaf.

## Rails?
Ik heb mijn hele site omgebouwd naar [Ruby on Rails](http://rubyonrails.org/). 
De content-migratie was klaar, een mooi spamveilig commenting systeem
was af. En het zat vol met leuke gadgets (zoals een twitter, reddit en
facebook scraper: plaatst reacties aldaar op mijn blog). En het performde bijna net zo
goed als Drupal7. Met wat tweaken zelfs nog beter. Nog even de laatste
20% afronden en klaar. 

Totdat ik wat stappen achteruit deed en nog eens goed naar het project
keek: een vrij groot, zelfgeschreven CMS, op Rails, om een supersimpel
blogje te publiceren. Ik ben gek ook: zelfs die laatste 20% is
waarschijnlijk nog meer werk dan even wat aan Jekyll hacken.

## Vandaar. Jekyll.
En nu weer wat vaker bloggen.

