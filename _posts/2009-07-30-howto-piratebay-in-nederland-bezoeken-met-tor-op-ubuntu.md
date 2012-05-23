---
layout: post_archive
title: HOWTO Piratebay in Nederland bezoeken met TOR (op ubuntu)
created: 1248972804
tags:
- tor
- Proxy
- piratebay
lang: nl
---
Wanneer [piratebay in Nederland verboden word](http://www.scribd.com/doc/17846197/Vonnis-rechter-The-Pirate-Bay) blijven er genoeg mogelijkheden om de site toch te bezoeken. Hieronder leg ik uit hoe je met TOR en privoxy straks de Piratebay nog gewoon vanuit Nederland kunt bezoeken.<!--break-->Naast de tips op [NRC next](http://www.nrcnext.nl/blog/tag/proxy/), kunt je ook "gewoon" een [TOR]() proxy gebruiken. Maar voordat we TOR installeren eerst een beetje achtergrondinformatie. Wat Piratebay doet, is niets meer dan verwijzingen naar een download plaatsen. Je download de bestanden niet van de piratebay, maar van "peers", mensen zoals jij en ik. Die een film downloaden. Tijdens dat downloaden upload je ook altijd. Naar mensen zoals jij en ik. Jij upload de stukje die je al hebt. Ik kan die dan downloaden. En ze dan weer uploaden naar mensen die ze nog niet hebben. Dat blijft gewoon mogelijk. Wat de rechter verbood, is die verwijzing naar jou en mij en alle andere up- en downloaders vanaf Piratebay.org op te halen. Je hoeft dus alleen maar bij piratebay te komen, daarna gaat alles als vanouds. En dat kan met TOR. Meer informatie over wat TOR doet en is heb ik [al eerder beschreven](http://bler.webschuur.com/websites_veiliger_maken_met_privoxy).TOR instellen op Ubuntu1. Voeg TOR-repositories toe aan je installatieomgeving. <br />Ga naar Systeem >> Beheer >> Softwarebronnen. Voeg daar in de tab "software van derden" een nieuwe repository toe, gebruik onderstaande regel.   ``deb     http://mirror.noreply.org/pub/tor jaunty main``Sla op en sluit af. Bij de vraag herladen? kies, "Sluiten". [AVUC heeft de sleutels en meer informatie](http://www.avuc.nl/2009/05/04/tor-on-ubuntu-904/).
. 2. Voeg de keys toe:``gpg --keyserver subkeys.pgp.net --recv 94C09C7Fgpg --fingerprint 94C09C7Fgpg --export 94C09C7F | sudo apt-key add -``
3. Installeer TOR en [Privoxy](http://nl.wikipedia.org/wiki/Privoxy).  ``sudo apt-get updatesudo apt-get install tor privoxy``
4. Voeg een regel toe aan de configuratie van privoxy. Open het bestand /etc/privoxy/config:``$ sudo gedit /etc/privoxy/config``En plaats de regel ergens bovenaan (vergeet de afsluitende punt niet!)``forward-socks4a / localhost:9050 . ``
5. Start tor en privoxy.``sudo /etc/init.d/tor startsudo /etc/init.d/privoxy start``
6. Voeg aan je browser [localhost:8118](http://localhost:8118) als proxy in. vanaf waar je naar the piratebay kunt surfen.In Firefox doe je dat met: Bewerken >> Voorkeuren >> Geavanceerd. Knop "instellingen" bij Verbinding. Kies daar "Handmatige proxyconfiguratie" en kies als HTTP-Proxy:localhost en poort 8118 in.
7. Optioneel kun je de firefox addon [TOR Button](https://addons.mozilla.org/nl/firefox/addon/2275) installeren. Daarmee kun je heel snel en makkelijk in firefox schakelen tussen anoniem (TOR) en gewoon internetten.
Heb je betere tips? Of makkelijkere manieren? Weet je een goede HOWTO voor windows of Mac? Laat het achter in de reachties.(EDIT) ingevoerd dat je de proxysettings van je browser moet wijzigen.
