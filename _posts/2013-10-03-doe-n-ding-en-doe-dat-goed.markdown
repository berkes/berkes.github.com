---
layout: post_medium
title: "Doe één ding en doe dat goed"
tags: [savvii, rails, architecture]
lang: nl
---
**Dit artikel verscheen eerder op de [blog van Savvii](http://www.savvii.nl/blog/savvii-systeem-architectuur/), de Wordpreshoster waar ik momenteel werk.**

Als hoster willen we natuurlijk zoveel mogelijk automatiseren, hiervoor moeten we allerhande onderdelen ontwikkelen: van het afhandelen van bestellingen tot het updaten van de wordpress-sites.
Voor ons is dan van belang dat dit <em>backend</em>:
<ul>
	<li>snel aan te passen is aan nieuwe eisen, wensen en inzichten</li>
	<li>goed overweg kan met fouten en storingen</li>
	<li>heel veilig is</li>
</ul>
We hebben er daarom al heel vroeg voor gekozen om alles als heel kleine, gefocuste, losse onderdelen te maken. Waarbij we veel inspiratie halen bij <a href="http://www.faqs.org/docs/artu/ch01s06.html">the Unix Philosophy</a>:
<blockquote cite="http://www.faqs.org/docs/artu/ch01s06.html">This is the Unix philosophy: Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface.</blockquote>
<!--more-->
<h3>Rule of Modularity: Write simple parts connected by clean interfaces.</h3>
In ons geval willen we daarbij ook volledig onafhankelijk zijn van de locatie waarop iets draait. We kiezen ervoor om alle communicatie tussen alle componenten met <a href="https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm">RESTfull</a> JSON te laten communiceren. Dat betekent dat we alle communicatie over HTTP doen, waarbij we JSON rondsturen.
<h3>Rule of Extensibility: Design for the future, because it will be here sooner than you think.</h3>
We hebben een paar concrete uitgangspunten:

* Alle componenten zullen doorontwikkeld of vervangen worden.
* Alle componenten zullen op een moment falen, uitgaan of fouten vertonen.
* De markt en de community rondom WordPress is heel veranderlijk.

Het mooie aan een modulair ontwerp met een standaard-communicatie, is dat we iedere component ten alle tijden kunnen vervangen door een andere. Als bijvoorbeeld de backup-oplossing niet meer meeschaalt, vervangen we het door een andere zonder dat het hele systeem daarvoor plat hoeft te gaan!

Omdat alle componenten ook onafhankelijk zijn van elkaars beschikbaarheid kunnen ze ten alle tijden falen of kapot gaan, zonder dat de rest van het systeem daardoor mee omvalt. Als bijvoorbeeld de facturatieomgeving plat-gaat (vanwege een upgrade, bijvoorbeeld), heeft dat geen enkel effect op het waar bijvoorbeeld de backups gemaakt worden. Bij een zogenaamd <em>monolithische</em> opzet zit alles in één grote applicatie en valt bij een storing altijd de hele applicatie uit.

En omdat we parallel aan de verschillende onderdelen kunnen werken, kunnen we veel sneller anticiperen op veranderingen of nieuwe inzichten: wanneer bijvoorbeeld een nieuwe WordPress-versie een heel nieuw upgrade-mechanisme heeft, schakelen we eenvoudigweg een nieuwe update-robot in!

Hoe we zorgen dat we continu en supersnel kunnen releasen, is voor een volgende blogpost.
<h3>Rule of Simplicity: Design for simplicity; add complexity only where you must.</h3>
Om alle componenten zo dom en simpel mogelijk te kunnen houden zit in het "midden" <em>Evvii,</em> onze API. Dit is een applicatie die opdrachten en informatieverzoeken ontvangt (over RESTful HTTP, dus), en deze informatie weer teruggeeft in JSON.

De buitenwereld kan niet bij Evvii, maar bijvoorbeeld de <em>admin-omgeving</em> waarin jij onder meer je sites beheert, kan er wel bij. Deze admin-omgeving (we noemen hem Wallii), kan dus communiceren met Evvii, maar hoeft zelf helemaal niets aan business-logic te hebben: Dat doet Evvii.

Een bijkomend voordeel is dat de veiligheid hierdoor verhoogd wordt: de diensten die "publiek" op het internet draaien zijn héél simpel en alleen daardoor al makkelijker te beveiligen. Maar deze webdiensten kunnen zelf helemaal nergens bij, behalve dan bij Evvii. Waardoor we als het ware een tussenlaag hebben die ook weer extra te beveiligen is. Uiteraard is beveiliging veel meer dan dit, en zullen we ook hieraan nog uitgebreid aandacht besteden in toekomstige blogposts.

Evvii stuurt alle losse componenten aan en voorziet in alle informatieverzoeken. De losse componenten weten verder niets af van de andere componenten. Dit maakt het makkelijker voor ons om componenten te vervangen, verwijderen of aan te passen. Evvii is daarmee wel het kritieke deel: de bottleneck. Hoe we dat oplossen is voor een volgende blogpost.

Evvii is daarmee wel het meest complexe deel, maar op zich nog altijd vrij eenvoudig: Evvii weet niet <strong>hoe</strong> een backup gemaakt wordt, enkel <strong>wie</strong> ze de opdracht kan geven dat te doen! Daarmee kan Evvii nog altijd vrij simpel gehouden worden: ze hoeft enkel te weten wanneer ze wie welke vraag hoeft te stellen, niets meer. Hoe we al deze taken uitvoeren en alles schaalbaar én snel proberen te houden is ook voor een latere blogpost.
<h3>Rule of Composition: Design programs to be connected with other programs.</h3>
Een ander voordeel van het op deze manier opbouwen is dat we allerhande <em>tools</em> en programmeertalen kunnen inzetten. Ze communiceren immers over een protocol in een formaat dat vrijwel iedere taal en heel veel diensten gewoon begrijpen. De gereedschappen die dat niet doen krijgen een eenvoudige wrapper waardoor ze via een webservice bediend kunnen worden. Jullie WordPress sites, bijvoorbeeld, zijn niet altijd over het web met JSON te besturen: dat zou ook onveilig zijn. Dus besturen we ze op de server met <a href="http://wp-cli.org/">wp-cli</a>. Maar dat is ook een commandline tool en geen webservice: we moeten daar dus een webservice voor maken. Wanneer we die stabiel en veilig hebben, zullen we deze uiteraard releasen als Open Source Software.

We bouwen dus overal kleine webservices omheen. En we doen dat vooral in <a href="http://rubyonrails.org/">Rails</a>, <a href="http://www.sinatrarb.com/">Sinatra</a> en <a href="http://slimframework.com/">Slim</a>. En de tools die we zelf bouwen zijn al allemaal webservices vanaf het begin.
