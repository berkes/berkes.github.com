---
layout: post_archive
title: written while listening to
created: 1150216821
tags:
- Coding Corner
- Music
- KDE
- Ruby
- Open Source
lang: nl
---
Leuk ruby scriptje dat onder al mijn mails een regeltje voegt met wat ik op dat moment aan het luisteren was. Het gbruikt DCOP om de info uit [amarok](http://amarok.kde.org/) op te vragen. Omdat het DCOP gebruikt moet je uiteraard wel KDE en dus Linux hebben.Om te gebruiken: knip en plak onderstaande code in een tekstfile, sla deze op op je schijf en stel in je mailprogramma in dat voor de signature de uitvoer van een programma gebruikt moet worden. In Kmail kan dit heel makkelijk.<pre>#!/usr/local/bin/rubyisplaying = `dcop amarok player isPlaying`if isplaying  title = `dcop amarok player title`.chop!  artist = `dcop amarok player artist`.chop!  album = `dcop amarok player album`.chop!  puts "\nWritten while listening to #{title} by #{artist} on #{album}"end</pre>-- Written while listening to Club de Ville by Project 2000 on It's about Time
