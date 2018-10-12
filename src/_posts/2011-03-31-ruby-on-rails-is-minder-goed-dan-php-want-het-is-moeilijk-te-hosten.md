---
layout: post_archive
title: ! '"Ruby-on-rails is minder goed dan PHP want het is moeilijk te hosten"'
created: 1301563367
tags:
- ruby
lang: nl
---
Op mijn diverse artikelen over de geschikheid van Drupal ook veel reacties van mensen die de plank helemaal misslaan. Zoals "Kan wel zijn, dat je in Rails makkelijker kan bouwen, maar Rails is moeilijk te hosten". Sidenote: Ik heb slechts heel weinig ervaring met Python-hosting (enkel trac projectmanagement), dus durft hoogstens te zeggen dat ik verwacht dat onderstaand daar ook voor geldt.

Ten eerste: Ja! Voor je Ruby on Rails project is minder hosting te vinden.

Ten tweede: Dat is volledig irrelevant voor de projecten waar we het over hadden.<!--break-->We praten niet over een site van de bakker op de hoek, maar over sites en projecten waar best een werkdag voor hosting uitgetrokken kan worden. Waar meestal zelfs gewoon professionele hostingpartijen betrokken zijn. Met hosting van enkele duizenden euro's per jaar. De 1-eurohost.biz hoster ondersteunt trouwens meestal ook gewoon Rails, want dat komt al jaren standaard met plesk mee. Dus die bakker op de hoek kan ook heel goed een site in Rails opgeleverd krijgen.

De grootste uitdaging zit bij organisaties en bedrijven die al hostingomgevingen hebben ingeregeld. Meestal voor Java en/of PHP+MySQL. Zelden voor Ruby of Python. Vooral als de beheerders van die omgeving inflexibel zijn, kunnen ze Ruby of Python nogal eens buiten de deur houden. Afhankelijk van de situatie (zoals windows-only hosting), volgens mij overigens volledig terecht, vaak; maar dat is een heel andere discussie. Voor een intranet kan het dan heel goed zijn, dat vanwege deze beperkingen Ruby of Python al direct afvallen. Terzijde: daarmee is de geschiktheid voor ontwikkelen in "een framework" niet minder, alleen de keuze aan frameworks is kleiner. Aan de andere kant heeft de Rubygemeenschap bijvoorbeeld een omgeving als [heroku](http://heroku.com/). Voor Drupalmensen: stel je voor:   - "drush hosting create bakkerophoek"
 - "git push hosting"
 - "drush hosting online"
 - "drush hosting domains add bakkerophoek.nl"
 - de factuur volgt enkele minuten later per mail
(patent pending... :) )Op heroku zet je voor een paar euro een SOLR aan bij je site (stel je voor dat "drush hosting solr enable" alles is dat je moet doen voor SOLR!). Voor een paar euro per maand wat extra CPU-power of draai je voor enkele tientjes per jaar volledige master-slave database omgevingen achter je site. En deploy je met enkele commando's, geïntegreerd in je revisiebeheersysteem. Hosting is nog nooit zo makkelijk en betaalbaar geweest. Ik wou dat dit [voor PHP zo makkelijk kon](https://phpfog.com/).

Wanneer mensen dus roepen dat bijvoorbeeld [Diaspora](https://joindiaspora.com/) nooit iets kan worden, omdat het in Ruby gebouwd is en dus moeilijk de deployen, klopt dat maar deels. Het soort mensen dat Diaspora zal deployen, is bekend met hosting en servers. Dat zijn niet de mensen die al vastlopen op het installeren van FileZilla, maar de geeks die het leuk vinden om met ngix of apache-proxies te prutsen. Diaspora is eigenlijk eerder gericht op "kleine" lokale community-sites dan op "iedereen en zijn moeder" een eigen Diaspora: Eerder Hyves die op Diaspora haar community bouwt, dan op "je neefje en zijn twee vrienden van de Geheime Piratenclub". Het probleem is inderdaad dat een Ruby-project als [rstat.us](http://rstat.us/) daarmee een nadeel heeft ten opzichte van het op PHP en MySQL gebaseerde [status.net](http://status.net). Die laatste is op iedere 1-eurohost te installeren, door iedereen met een basiskennis webmastering of webdevelopment. Een grotere doelgroep, maar mogelijk niet de juiste doelgroep. Het bereik door het aantal installaties is groter, maar dat zegt (vooralsnog) niets over het bereik van gebruikers ervan.

Die Railsprojecten vereisen op zijn minst enige ervaring met de commandline. Maar eigenlijk gewoon kennis van (web)serverbeheer. Dat hoeft geen dure zeldzame ontwikkelaar te zijn, maar kan iedereen zijn die op een zondagmiddag een vps kan inregelen, voor enkele tientjes. Of iemand die bij een hoster werkt en voor jou de goede omgeving klaarzet.

Teruggrijpend op mijn eerdere betogen: een professioneel project heeft zo iemand erbij betrokken. Óók voor PHP-projecten, anders, zo durf ik te stellen, is het simpelweg geen professioneel of groot project.

Iemand die met moeite een goede Drupal- of wordpress-omgeving kan inrichten zal inderdaad erg teleurgesteld zijn in wat vereist wordt om een Django- of Rails- product uit te rollen. Maar zo iemand is nooit maatgevend voor de geschiktheid van die producten in een professioneel, groter project: zo iemand huurt dan iemand in die kennis van het uitrollen van servers heeft.
