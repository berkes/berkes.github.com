---
layout: post
title: laatste headline van een RSS feed als email sig.
created: 1141812918
tags:
- Coding Corner
- Ruby
lang: nl
---
Vaak kan het boeiend zijn om de laatste headline van bijvoorbeeld je weblog, of je bedrijfssite in de voet-text (signature) van je mail te zetten. Merk op dat dit uiteraard niet werkt bij online mail zoals hotmail!Dit Ruby scriptje draait dagelijks met mijn [crontab](http://en.wikipedia.org/wiki/Crontab). Het gebruikt [simpleRSS](http://simple-rss.rubyforge.org/) en is in feite mijn eerste helemaal zelfgebrouwen bruikbare ruby 'toepassing' (ahum).Het maakt dus een klein tekstbestandje met daarin iets als: > Sympal draait nu voor het grootste deel al op 4.7: http://help.sympal.nl/sympal_draait_nu_voor_het_grootste_deel_al_op_4_7Dat tekstbestandje kun je met ieder mail-programma als signature instellen.
