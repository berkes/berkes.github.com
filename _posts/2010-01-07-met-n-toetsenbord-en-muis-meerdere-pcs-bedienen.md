---
layout: post_archive
title: Met één toetsenbord en muis meerdere PC's bedienen
created: 1262887978
tags:
- x2x
- linux
- ubuntu
- open source
- ssh
- kvm.
lang: nl
---
Met één toetsenbord en muis meerdere PC's bedienen is heel makkelijk met [x2x](http://x2x.dottedmag.net/).

Dit werkt ongeveer als een [KVM switch](http://nl.wikipedia.org/wiki/KVM-switch), maar vereist géén extra draden, aansluitingen, of hardware.

Je gebruikt de schermen van de desbetreffende computers, dit is dus niet geschikt om vanuit je werkt even de desktop thuis te openen. Daarvoor gebruik je een heel andere techniek, [desktop sharing](http://www.ubuntugeek.com/share-your-ubuntu-desktop-using-remote-desktop.html). Het goede nieuws is dat dit laatste in Ubuntu heel makkelijk is; alle software is al aanwezig hiervoor. De case waar ik dit vaak voor gebruik, is als ik met mijn laptop naast mijn desktop ga zitten en beide computers wil gebruiken, zonder de hele tijd te wisselen van toetsenbord en muis.

Het enige dat nodig is, is [SSH](http://doc.nl.linux.org/HOWTO/Ssh-Getting-Started-NL.html). Op de PC waarop de muis en toetsenborden zijn aangesloten moet een ssh-client staan. Op de PC die je wilt gaan bedienen, moet een ssh-server draaien en moet het programma X2X geïnstalleerd zijn. Ik ga uit van Ubuntu, op beide machines, maar met OSX (mac) moet het ook heel makkelijk kunnen. Eerst moet je op de computer waarmee je wilt verbinden, ssh en x2x installeren. Die eerste is meestal al voorgeïnstalleerd op ubuntu, maar voor de zekerheid (geen ervaring met commando's? kijk [in deze handleiding](https://help.ubuntu.com/community/UsingTheTerminal)) ``sudo apt-get install ssh x2x``Ga nu terug naar de computer van waaruit je zometeen wilt verbinden. En typ op een terminal of commandline het volgende in:   ``ssh -X _remote_machinename_or_ip_address_ x2x _-direction_of_the_remote_display_ -to :0``hierin is:  - _remote_machinename_or_ip_address_ het IP-adres of de netwerknaam van de andere machine. In een intern (thuis)netwerk vaak iets als 192.168.

X.

Y
  - _-direction_of_the_remote_display_ de positie waar het scherm staat ten opzichte van je hoofdssyteem. -west plaatst het nieuwe scherm rechts, -east links
  Op mijn buro staat mijn laptop links van mijn desktop-pc. Ik wil vanuit mijn laptop de desktop-pc (deze heet emanuela en heeft het netwerkadres emanuela.fritz.box) aansturen. Dus typ ik op mijn laptop in:  ``ssh -X ber@emanuela.fritz.box x2x -east -to :0``Hiermee log ik op emanuela in als 'ber', en stel het scherm van emanuela in, zodat het rechts van mijn laptop verschijnt. Als ik de muis rechts uit het scherm van mijn laptop laat lopen, komt de muisaanwijzer het scherm van emanuela binnenwandelen. Het toetsenbord van mijn laptop werkt vanaf dan op het scherm van emanuela. Ook mooi, is dat dingen die ik op emanuela knip of copieer (control-c) later binnen mijn laptop te plakken zijn (en vice versa). Uiteraard kan ik geen schermen van links naar rechts verplaatsen. Meer details zijn te vinden in een inleiding op [linux.com](http://www.linux.com/archive/feature/148824).

Een alternatief is [synergy](http://synergy2.sourceforge.net/). Hiermee kun je makkelijk verschillende OSsen mengen, en het heeft grafische tools om dingen in te stellen. Voot mij doet X2X het echter perfect. Simpel, snel en makkelijk te gebruiken. 
