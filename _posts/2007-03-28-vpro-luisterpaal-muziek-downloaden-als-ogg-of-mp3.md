---
layout: post_archive
title: VPRO Luisterpaal muziek downloaden (als ogg of mp3)
created: 1175096312
tags:
- Music
- VPRO
- stout
- OGG
- download
lang: nl
---
Goed. Het mag niet. Stelen ist Verboten. Maar aangezien je voor deze kleine truck linux nodig hebt (en wat andere tooltjes die standaard voor Linux te krijgen zijn) Kan toch niemand er iets mee. Een scriptje om de luisterpaal van de VPRO leeg te slurpen en als ogg-tjes op je harde schijf te zetten. (Overigens hoef je alleen maar het .ogg in .mp3 te veranderen als je ze als mp3 wilt hebben).

Sla onderstaand op in een bestandje luisterpaal.sh, en voer dat uit met de argumenten id en aantal tracks. Id vind je door het adres van een liusterpaalalbum te bekijken. Het laatste nummer is het ID: http://3voor12.vpro.nl/speler/luisterpaal/**33873122** geeft ID 33873122Het aantal tracks is, juist, het aantal tracks.<pre>#!/bin/bashif [ ! $# == 2 ]then  echo "usage: luisterpaal.sh id aantal-tracks"  exit 1fiCOUNTER=1TMPFILE=`tempfile`touch $TMPFILEwhile [  $COUNTER -lt $2 ]; do  if [ $COUNTER -lt 10 ]    then    NATURAL="0$COUNTER"  else    NATURAL=$COUNTER  fi  echo "Download track $COUNTER ($NATURAL)"  mplayer -dumpstream http://download.omroep.nl/vpro/luisterpaal/albums/$1/data$NATURAL.swf -dumpfile $TMPFILE  echo "Creeëeeëeëert OGG van track $COUNTER"  ffmpeg -i $TMPFILE "$1_track_$COUNTER.ogg"  let COUNTER=COUNTER+1done# en opruimen als je klaar bent! Zei mam altijdrm $TMPFILE</pre>Je hebt mplayer en ffmpeg nodig ([Nederlandse instructies voor Ubuntu hier](http://www.ubuntu-forums.nl/kb.php?mode=article&k=48))Weer een reden, dus, om snel die lelijke afgerondde vista doos weg te knikkeren en [ubuntu](http://ubuntu.com) op je machine te zetten.

Want "ze" zeggen dan wel heel vaak "maar op Linux is Dit en Dat heel moeilijk". Zal best, maar op linux zijn heel veel zaken, heel veel makkelijk. Een scriptje schrijven om een luisterpaal van de VPRO leeg te zuigen, (en ik heb de ballen verstand van de taal Bash waar ik het in schreef, het kan dus veel sneller als je goed bent) kost minder dan 10 minuten. En eens je zo'n scriptje hebt, en het ene beetje uitbreid (drie regeltjes extra) kunnen zelfs de Wijs-en-Klik lutsers het gebruiken. Aan jou de eer een front-endje eraan te knopen dus (Firefox plugin, iemand?)**update 08-02-2008**. Iemand van de VPRO heeft mij vriendelijk verzocht deze pagina te verwijderen. Ik verwijder geen pagina's, dus mijn antwoord was "nee", met een uitleg waarom, hoe en wat enzovoort.

Wel heb ik beloofd een paar opmerkingen op te nemen:- Het bovenstaande script werkt al een tijdje niet meer. Ik heb geen plannen het te updaten, want het was vooral een proof of concept.
* Ik wil nogmaals benadrukken dat muziek stelen niet netjes is. Dat het **niet aan jou is om te bepalen of iemand zijn werk gratis moet weggeven**. Als je vind dat muziek gratis moet zijn, zoek dan naar artiesten die er wel voor kozen hun muziek gratis weg te geven. Daarvan zijn er genoeg

