---
layout: post_archive
title: Eenvoudige backup en restore van geïnstalleerde paketten in Ubuntu.
created: 1240500297
tags:
- ubuntu
- opensource
- dpkg
- debian
- backup-manager
- backup
- apt
- administratie
lang: nl
---
Als je net als ik vaak pakketten installeert of verwijdert op je ubuntu-machine hou je dat meestal niet bij. Dat bijhouden is ook een probleem als je met meerdere mensen een server beheert, bijvoorbeeld. Met een paar hele simpele commando's kun je een backup maken van de lijst met geïnstalleerde software en deze op een andere machine opnieuw installeren. <pre>dpkg --get-selections > packagelist.txt</pre>Dit maakt een complete lijst van alle geïnstalleerde software en zet deze in het tekstfiletje debianlist.txt.

Deze tekstfile is later te gebruiken om alles te installeren: <pre>dpkg --set-selections < packagelist.txt</pre>Merk op dat de instellingen van de betreffende software _niet_ opgeslagen of geïnstalleerd word. Hiervoor moet je een volledige backup maken van de _/etc/_ map. Ook worden handmatig geïnstalleerde of gecompileerde softwarepaketten ook niet mee-geïnstalleerd. Maar volgens mij ben je sowiezo verkeerd bezig als je buiten de pakketinstaller van ubuntu (of welke Linux dan ook) om gaat installeren. Dat is een garantie voor zooi. Om de paketten nu daadwerkelijk te installeren:<pre>apt-get -u dselect-upgrade</pre>Het is verstandig om een wekelijkse (of dagelijkse of maandelijkse, afhankelijk van de mate waarin je paketten (de)installeert. Voeg daarom een regel aan je [crontab](https://help.ubuntu.com/community/CronHowto) to. Dit soort systeemtaken voeg ik liefst aan de crontab van de root-gebruiker toe: <pre>sudo crontab -e</pre>Daar voer je een nieuwe regel in:<pre>0 0 1 * * dpkg --get-selections > /var/archives/packagelist.`hostname`.`date +%F`.txt</pre>Deze maakt iedere eerste dag van de maand een bestandje aan in de vorm "packagelist._naam-van-je-systeem_._2009-05-01 (datum vandaag in sorteerbare volorde)_.txt"(Vrij vertaald van [een artikel door hanckmann](http://www.hanckmann.net/?q=node/27))
