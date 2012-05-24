---
layout: post_archive
title: Meeloper of vasthoudend, fluid of fixed
created: 1169480958
tags:
- Design
- CSS
- ontwerp
lang: nl
---
![fixed width screenshots in a compilation](/sites/bler.webschuur.com/files/fluid_vs_fixed_compilation.jpg)Dit artikel is al lange tijd te lezen als onderdeel van [het help.sympal.nl ontwerpkeuze handboek](http://help.sympal.nl/meeloper_of_vasthoudend_fluid_of_fixed). Het ligt daar echter een beetje weg te stoffen, vandaar dat ik besloot een grote opruiming te houden en wat artikelen naar mijn blog te verhuizen. **Vandaag over Fluid versus Fixed.**Fluid betekend dat je layout mee-schaalt met de grootte van het venster waarin hij weergegeven wordt. We spreken hierin eigenlijk alleen over de breedte. Op een heel klein scherm (of venster), zal de site heel smal weergegeven worden, op een groot scherm (bijvoorbeeld een breed venster) wordt de site heel breed weergeven.Fixed betekent, dat onafhankelijk van de grootte van het scherm van de gebruiker, de site een vooraf ingestelde breedte heeft. Soms neemt zij dus maar een klein deel van het scherm in beslag (op een groot scherm) en soms loopt zij in de breedte van het scherm af (op een klein scherm).De voor en nadelen zijn eenvoudig in een lijst op te nemen:<!--break-->- Voordelen fluid
<ul><li>de ruimte wordt optimaal gebruikt. Gebruikers met grote schermen kunnen hun scherm ook goed gebruiken.</li><li>geen "horizontaal scrollen". Op kleine schermen wordt nog steeds alles weergegeven.</li></ul>- Voordelen fixed
<ul><li>in het design is er maximale controle over hoe zaken er komen uit te zien.</li><li>elementen die fixed moeten zijn (zoals afbeeldingen die nooit mee kunnen schalen) komen altijd goed tot hun recht.</li><li>het designen is aanzienlijk makkelijker (de reden ook dat veel ontwerp-bureaus u ook fixed zullen voorstellen!).</li></ul>- Nadelen fluid
<ul><li>heel grote schermen, of heel kleine schermen kunnen het design "verpesten" omdat elementen bijvoorbeeld onder elkaar willen gaan staan (op een klein scherm is er gewoon geen ruimte om alles langs elkaar te laten staan)</li><li>het designen is moeilijker omdat rekening moet worden gehouden met allerlei schermgroottes en verhoudingen.</li></ul>- Nadelen fixed
<ul><li>Op grote schermen is de tekst meestal onleesbaar (zij staat immers op een vastte grootte).</li><li>Op kleine schermen kan de tekst overkomen als "koeien-letters". Zelfde reden als hierboven.</li><li>Op kleine schermen kunnen er dingen buiten het zichtbare venster zitten. Als er bijvoorbeeld advertenties rechts staan, kan het zijn dat een aanzienlijk deel van de gebruikers deze niet ziet zonder horizontaal te scrollen (iets wat uit onderzoek blijkt, dat haast niemand doet). Of nog erger: het einde van elke zin staat net buiten beeld!</li><li>Op grote schermen is er heel veel ongebruikte ruimte over. Als de gebruiker tevens ziet dat de lettertjes haast niet te lezen zijn, kan dit heel irriterend zijn.</li></ul>Het is al een tijd niet meer makkelijk te zeggen welke soorten schermen mensen "het meeste" hebben. Flatscreens en de grote populariteit van goedkopere PC systemen (standaard met kleine schermen) hebben tot gevolg dat er nauwelijks "een meerderheid" is.**Heel in het kort is het volgende te stellen:** Als functionaliteit, gebruiksvriendelijkheid en inhoud van de site belangrijkste is, is fluid de betere optie. Als echter het ontwerp een dusdanig belangrijke factor is, kan het beste worden gekozen voor fixed.[![De volkskrant te klein](/sites/bler.webschuur.com/files/fixed_too_small.png)<br />![De volkskrant te groot](/sites/bler.webschuur.com/files/fixed_too_big2.png)](http://www.volkskrant.nl)<br />De volkskrant gebruikt een soort fixed width, wat ertoe leidt dat op sommige schermen veel ruimte ongebruikt is terwijl op andere schermen inhoud van het scherm afloopt.