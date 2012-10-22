---
layout: post_archive
title: YUI-grids overwegingen
created: 1221058595
tags:
- YUI
- Yahoo
- Webdesign
- grids
- CSS
lang: nl
---
Toen ik voor het eerst vernam van [Yahoo GRIDS (YUI)](http://developer.yahoo.com/yui/grids/) en later van [Google Blueprint](http://www.blueprintcss.org/) was ik onplezierig verrast. Grids zijn bedoeld om het ontwerpen en layouten van sites veel makkelijker te maken. En daarin slagen ze wonderwel. Maar ik vond dit alles maar niets.

HTML verzorgt de structuur van je site. HTML geeft waarde en oordeel aan je tekst, je data. HTML geeft bijvoorbeeld aan dat een woordje _uitgelicht_ wordt. Dat doe je met een EM tag, die staat voor emphasize (uitlichten). Veel browsers "lichten iets uit" door het schuin te drukken. Met EM geef je dus niet aan dat iets schuin staat, je geeft aan dat het _uitgelicht_ wordt. Dat het gros van de browsers dat doet door het schuin te drukken, is eigenlijk toeval.

De CSS zorgt dan voor de presentatie hiervan. Als jij iets wilt _uitlichten_ door het _markeerstift-achtig_ te maken, doe je dat in je CSS. Tenzij iemand zijn browser dat expliciet niet toestaat (bijvoorbeeld omdat de gebruiker geel-kleurenblind is). Oftewel: de structuur zit in je HTML, maar het design, de weergave, de presentatie in je CSS. YUI en andere grid-raamwerken vragen van je om je HTML aan te passen, en zodoende de layout van je pagina te bepalen.

Een driekoloms layout bepaal je dus door een serie goed-genaamde tags op te nemen in je HTML; de plek die gereserveerd zou moeten zijn voor het structureren van je data.

Maar na een paar proefprojecten begin ik toch overtuigd te raken van het voordeel van deze YUI-grids. Mijn punt over "de verkeerde plek gebruiken voor het layouten" blijft overeind: ik ben daar nog altijd niet over te spreken.

De reden dat ik echter steeds meer overtuigd raak, zelfs overweeg er geheel naar over te stappen voor alle toekomstige projecten, is puur pragmatisch: _YUI grids werken bijzonder goed_. Bovendien zijn ze uitermate goed onderzocht, onderbouwd en ondersteund door alle veelgebruikte browsers. Ze zijn zeer toegankelijk (inzoomen werkt bijzonder goed, bijvoorbeeld) enzovoort enzovoort. Je kunt daadwerkelijk binnen 15 mintuten een complexe layout neerzetten voor een site, die op alle (nouja, 99.9%) van de browsers zal werken, dus ook op linux-konqueror-3.4, die je normaalgesproken nooit zult testen, bijvoorbeeld.

Hetgene dat me echt overtuigde was een heldere ingave die ik had, in de trein nabij Lent, waar ik twee jongetjes in een opblaasboot zag klooien op een watertje:

* In een ideale wereld werken alle internetbrowsers en internetapparaten volgens de officiële standaarden. (en is er geen oorlog en honger, maar dat terzijde). In deze ideale wereld bouwen we mooie layouts binnen het uur, in plaats van weken pixelneuken.
* In een ideale wereld is de functionaliteit en inhoud van alle sites voor iedereen bereikbaar en toegankelijk
* In een ideale wereld was het design van een website altijd ondersteunend voor de functie, communicatie, winst en inhoud van je site. Maar nooit een doel op zich.
Helaas is dit nooit het geval. Ruim driekwart van de gebruikte browsers ondersteunt de meer-dan-tien jaar oude standaard CSS2 nog maar nauwelijks (internet explorer 6, dus). Een grote meerderheid van onze (semi- en overheid) sites zijn moeilijk tot niet toegankelijk voor jan en alleman. Design-voor-de-leuk is nog aan de orde van de dag: nog iedere maand kom ik sites tegen waar ik iets niet (of moeilijk) kan bestellen omdat een of ander design-leukigheidje een anders goede bestelprocedure in de weg zit. En dan heb ik het niet eens over alle andere dingen zoals bijvoorbeeld onleesbare rode links op zwarte achtergronden (zie 10 centimeter naar links voor een voorbeeld :)).

Kortom: we moeten roeien met de riemen die we hebben: twee afgebroken, niet passende riemen. Als dan iemand je twee grote tuinscheppen geeft, kun je wel heel puristisch zijn en roepen: "Nee, tuinscheppen zijn om te graven, roeien moet met échte riemen" (of zoals ik hierboven zei: CSS is voor de weergave, HTML voor de structuur), maar dan zul je in praktijk eeuwig blijven kloten en nauwelijks vooruit komen. Wil je echt vooruit, neem dan die tuinscheppen; ze zijn niet ideaal, ze worden oneigenlijk gebruikt, maar het netto resultaat is dat je komt waar je wezen moet. Kortom: YUI is voor mij de nieuwe manier van layouten.

Nu nog een project aanmaken, en daarop een mooi (ik heb geprobeerd het Drupal project [YUI-framework](http://drupal.org/project/yui-framework) tot leven te wekken, maar de maintainer is te druk of weg) basistheme voor Drupal te beginnen. En wie weet kan ik over een paar weken binnen het uur een layout neerzetten...

Ben je nog niet overtuigd over YUI, maak een kopje koffie, leun achterover en bekijk deze verhelderende [presentatie]( http://video.yahoo.com/watch/1373808/4732784) <div><object width="512" height="322"><param name="movie" value="http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf?ver=2.2.30" /><param name="allowFullScreen" value="true" /><param name="AllowScriptAccess" value="always" /><param name="bgcolor" value="#000000" /><param name="flashVars" value="id=4732784&vid=1373808&lang=en-us&intl=us&thumbUrl=http%3A//us.i1.yimg.com/us.yimg.com/i/us/sch/cn/v/v3/w956/1373808_320_240.jpeg&embed=1" /><embed src="http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf?ver=2.2.30" type="application/x-shockwave-flash" width="512" height="322" allowfullscreen="true" allowscriptaccess="always" bgcolor="#000000" flashvars="id=4732784&vid=1373808&lang=en-us&intl=us&thumbUrl=http%3A//us.i1.yimg.com/us.yimg.com/i/us/sch/cn/v/v3/w956/1373808_320_240.jpeg&embed=1"></embed></object><br />[Nate Koechley: &quot;The YUI CSS Foundation&quot;](http://video.yahoo.com/watch/1373808/4732784) @ [Yahoo! Video](http://video.yahoo.com)</div>
