---
layout: post
title: "Statische websites beheren anno 2012"
tags: [git, jekyll, blog, webdevelopment]
lang: nl
---
Statische sites, bijvoorbeeld weblogs gemaakt met simpele HTML-bestandjes, maken een terugkomst. Gereedschappen als [Jekyll](http://jekyllrb.com/) samen met moderne revisiebeheersystemen als `git`, maken het opzetten van een simpele, statische site, vaak vele malen makkelijker dan het inregelen van een CMS. In dit artikel leg ik kort uit hoe een CMS zich dat verhoudt tot een statische site. Daarna bekijk ik een rijtje voor- en nadelen, mogelijkheden en onmogelijkheden. En als laatste beschrijf ik kort, hoe je in drie simpele (voor programmeurs, hackers en meer ervaren computergebruikers, althans) stappen, een site met Jekyll kunt opzetten.

Een CMS genereert de pagina's wanneer ze opgevraagd worden. Voor élke pagina, voor iedere persoon, wordt telkens, eenmalig, een pagina opgebouwd. Dit blogartikeltje bijvoorbeeld, verandert niet meer tussen het moment dat jij en die ene andere lezer het lezen; dus waarom voor jou en die andere lezer een op maat gemaakte pagina opbouwen?  Waarom is het nodig dat ik voor jou en de personen die voor en na jou komen telkens opnieuw in een database ga graven om daaruit de laatste updates te zoeken en daarmee een pagina opbouw?

Een Static Site Generator (SSG), genereert eenmalig, bijvoorbeeld bij een update, alle bestanden en pagina's. Het idee is niet nieuw, vroeger waren gereedschappen die dit voor je deden, zoals Dreamweaver, de norm. Tegenwoordig zijn complexe, CMS-gebaseerde, of dynamische sites de norm. Maar eigenlijk meestal overbodig. Voorbeelden van moderne Static Site Genergators zijn:

* [Jekyll](http://jekyllrb.com), in Ruby, gebruikt door onder meer
Github.
* [Hyde](http://ringce.com/hyde), in python, [vergelijkbaar](http://philipm.at/2011/0507/) met Jekyll.
* [Phrozn](http://www.phrozn.info/en/), in PHP, probeert Jekyll en Hyde
te benaderen. 

We zien dan ook een opleving van Static Site Generators, hoofdzakelijk aangedreven door git. Git is een revisiebeheersysteem waarmee je makkelijk kunt [releasen](http://berk.es/2012/08/03/git-deploy-or-how-i-learned-to-stop-worrying-and-love-deployment/), en makkelijk heel veel bestanden kunt beheren. 
Deze generatie static site generators, gebruiken geen databases of complexe en dure pakketten, maar, heel eenvoudig, tekstbestandjes.  Gewoon een tekstbestand voor iedere pagina en artikeltje. Dit tekstbestandjes beheer je met git, een revisiebeheersysteem. Met wat scripts maak je van de tekstbestandjes daadwerkelijke webpagina's en die zet je online.

Een Static Site Generator heeft enkele nadelen, maar ook enorme voordelen ten opzichte van
dynamische sites:

### Dynamische en interactieve functionaliteit.
Een statische site heeft simpelweg geen toegang tot een database. Het plaatsen en opslaan van bijvoorbeeld reacties is daarom simpelweg onmogelijk; dat maakt een en ander enorm veilig, maar maakt veel sites en concepten onmogelijk met statische sites. Sites waarbij mensen inloggen, berichten, artikelen, producten of wat dan ook, plaatsen, kun je gewoon niet uitvoeren met een statische site.
Voor reacties op artikelen kune je nog wat trucjes met bijvoorbeeld facebook of [disqus](http://disqus.com/) uitvoeren. Maar verder dan dat: zo goed als onmogelijk. Als je interactie nodig hebt, registraties, insturen van zaken door gebruikers, dan is een statische site gewoon geen optie.
Maar voor de meeste redactioneel gedreven sites (ook als die redactie slechts één persoon is) is het een uitermate geschikte tool.

### Performance
Op een gemiddeld webservertje, kun je met een gemiddelde Wordpress of Drupal-site (twee veelgebruikte CMSen) vaak minder dan tien gebruikers per minuut aan. Pagina's laden duurt tussen de halve en enkele seconden.
En je moet voor bijna iedere site, groot of klein, ingewikkelde caching-, proxy of databases tunen. Gewoon om een paar pagina's te tonen. Een statische pagina is om en nabij de honderduizend keer zo snel als de meest eenvoudige Drupal-pagina.

Veel CMSen vallen dan ook terug op allerhande caching-servers en lagen. Het is niet ongebruikelijk om een volledige server (reken vanaf €300/jaar) voor caching in te zetten. Caching is in feite niets meer dan eenmalig de gegenereerde pagina (of onderdelen ervan) ergens op te slaan zodat ze voor de volgende bezoeker niet opnieuw gegenereerd hoeven te worden. Veelal nogal onzinnig: een volledig, op de server draaiend CMS, om statische pagina's mee te maken. Dat kan slimmer (hint: dat CMS elders neerzetten, bijvoorbeeld op je eigen computer en de gegenereerde pagina's zelf op de server plaatsen). Caching is voor de meeste CMSen onontbeerlijk en maakt een groot deel van de dynamiek en interactie weer ongedaan. Veelal blijkt het voor sites eigenlijk goed mogelijk om die vier jaar oude archiefpagina niet telkens opnieuw uit een database op te bouwen, maar gewoon eenmalig weg te schrijven als een statisch bestand en nooit meer naar om te kijken. 

### Piekperformance
Zelfs wanneer je een goed getunede server hebt met een mooi ingeregeld CMS, dan [gaat](http://www.destentor.nl/nieuws/algemeen/binnenland/12002326/Website-Omroep-Gelderland-weer-in-de-lucht.ece) het [bij](http://webwereld.nl/nieuws/105305/crisis-nl-blundert-zichzelf-offline.html) piekbelasting [vaak mis](http://www.it-executive.nl/dossiers/dossier/programmeerfout_haalde_website_ns_onderuit). 
Meestal is de onderlinge oorzaak de complexiteit van het geheel.
Allerhande gekoppelde redactionele systemen, advertentieservers en vele onderling gekoppelde servers. Wanneer je enkel statische files serveert is de opzet zó eenvoudig dat bij piekbelasting de site gewoon online gehouden kan worden, in heel extreme gevallen bijvoorbeeld door wat extra servers bij te schakelen. Iets wat met de meeste dynamische systemen gewoon niet kan. Terwijl juist bij piekbelasting de bereikbaarheid belangrijk is. Is het niet voor de kritieke communicatie en informatie bij calamtiteiten, dan op zijn minst omdat je tijdens een piek lekker veel advertentieinkomsten binnenharkt. 

Je ziet dan ook bij extreme situaties dat (grote) sites overschakelen op statische files, of zelfs altijd statische files hebben klaarstaan om het over te nemen als het CMS het niet langer trekt. De CNN tijdens 9/11 was een prachtig voorbeeld daarvan: een simpele pagina waarop de redacteuren telkens nieuwe informatie toevoegden of herschreven; hun CMS was allang daarvoor gestorven aan overbelasting.

### Security
Omdat je het meest complexe en tevens meest blootgelegde deel uit je applicatiestapel (stack) haalt, is beveiligen heel makkelijk.
Geen databases, administratieomgevingen en interactieve delen die opengebroken kunnen worden. De enige die zaken op de server kan plaatsen is de applicatie of persoon die de statische files erop zet; dus dat is enorm sterk te beveiligen. In een HTML-bestand kun je (welhaast) niet inbreken. In diezelfde pagina van een CMS eigenlijk altijd wel (alleen is nu nog niet bekend hoe).

Om deze reden kun je ook enorm besparen op onderhoud; je hoeft immers enkel nog de webserver(s) te onderhouden; iets wat sowieso bijna niemand meer zelf doet. Bij een update-frequentie van eens per paar weken voor Wordpress, of eens per week voor Drupal, met een paar modules, scheelt dit al snel tien of meer uur aan duurbetaalde ontwikkelaars, per maand.

### Hosting en serverkosten
De hosting kan enorm simpel worden uitgevoerd. Vanwege de duizenden malen hogere performance, kun je in theorie duizenden malen zoveel sites hosten op dezelfde hardware. Meestal kun je een statische site met enkele duizenden bezoekers per week heel makkelijk gratis en toch redelijk professioneel hosten. Meestal hoef je voor veel grotere sites slechts één server op te tuigen, in plaats van een hele boom van servers. Grote hosters zoals de NPO hebben vaak vele tientallen malen zoveel applicatieservers (de servers die de CMSen draaien) dan statsiche content-servers; gewoon omdat die laatste zoveel makkelijker tot onvoorstelbare performance op te schalen zijn.

Het web, en daarmee de bekendste servers en alle protocollen waren ook gewoon ontworpen voor statische content. Pas nu, 2012, komen webservers en protocollen beschikbaar die eigenlijk technisch geschikt zijn voor interactieve sites. Alles wat we tot nu toe deden was knutselen en rommelen in de marge. Als je dus teruggaat naar die basis, statische paginas, worden zaken vele malen gemakkelijker.

### Hackability
Je hele stapel aan serversoftware kun je terugbrengen naar één lokaal draaiend stukje gereedschap; geen `mod_php`, `cgi`, `databases`, `caching proxies` enzovoort.  En zelfs dat lokale stukje software is meestal erg simpel. Jekyll zelf bestaat uit een paar klasses en enkele tientallen files, niet meer. Met wat knutselwerk kun je ook met vier PHP-scriptjes HTML-bestanden maken uit tekstfiletjes. 
Bovendien draait de applicatie niet op de (productie-)server, dus is uitproberen van kleine wijzingingen heel makkelijk. Pas als je tevreden bent, kopieer je alles naar online. 
Het is daarom zeer, zeer hackable (hackable als in: aanpasbaar, niet als in _inbraakgevoelig_). Met een klein beetje programmeerervaring kun je zo heel grote sites optuigen. Veel makkelijker en overzichtelijker dan in de code van een of ander CMS te gaan rondsleutelen; iets wat bovendien vaak sterk wordt [afgeraden](http://wordpress.stackexchange.com/questions/1639/what-are-some-reasons-why-you-should-not-hack-wordpress-core-files#1671). Maar bij statische-site-generators juist de norm en bedoeling is!

Deze aanpasbaarheid zorgt ook dat je een stuk vrijer bent dan wanneer je alles volgens de structuur of standaarden van het gekozen framework of CMS doet.

### SEO
De eenvoud en hackability van statische-sites laat het toe om tot op zeer gedetailleerd niveau aanpassingen te maken: superschone HTML, goede -tags, nette doorverwijzingen enzovoort. De snelheid zorgt er bovendien voor dat de robots van zoekmachines in enkele seconden je hele site kunnen inlezen en indexeren; bij veel CMSen duurt dit weken; vooral omdat robots je site niet willen platleggen en ze, wanneer ze zien dat je een CMS hebt, wat rustiger gaan indexeren.

### Hogere drempel
Het aanpassen van tekstbestandjes op je schijf geeft een hogere drempel; hoger voor onervaren gebruikers om te gaan schrijven aan tekst voor een site, en hoger voor jezelf, omdat het plaatsen van een artikel net even een grotere taak lijkt dan op een CMS.

Dit maakt dat veel blogs die met statische sites gemaakt zijn, veelal langere artikelen bevatten, met minder hoge frequentie. Het is minder geschikt voor iemand die viermaal daags een update wil plaatsen, liefst vanaf haar mobiele telefoon. Maar meer voor iemand die dagen schaaft aan een stukje.

### Integratie van allerhande gadgets
De meeste CMSen integreren twitter, facebook, en wat dies meer zij, ook gewoon via zogenaamde "embedcodes". Dat kan op een statische site dus precies zo makkelijk.
Maar als de integratie iets verder gaat, zoals het automatisch koppelen van comments aan facebook; of het vanzelf plaatsen van links van nieuwe artikelen op twitter, dan is wat meer kunst- en vliegwerk vereist.

### Grotere organisaties.
De huidige statische sites gaan ervanuit dat je op je PC een lijstje met bestanden hebt die bij publicatie omgezet worden naar HTML. 
Met meer mensen samenwerken is wat moeilijk. Tenzij die mensen dit met een revisiebeheersysteem doen. Daaronder valt ook bijvoorbeeld een gedeelde Dropbox waarin enkele mensen tegelijk tekstbestandjes plaatsen.

Maar een standaard redactioneel team met (online) workflows die via vele teams, eindredacteurs enzovoort naar online gaat, is het waarschijnlijk wat minder geschikt. Althans, je kunt ook gewoon elkaar tekstbestandjes mailen.

## Jekyll opzetten

Hieronder een korte howto van een site met Jekyll. Zo een site is heel simpel en plat. Wil je wat sneller vooruitkomen, dan kun je met bijvoorbeeld [octopress](http://octopress.org/) of [Jekyllbootstrap](http://jekyllbootstrap.com/).  Maar die zijn meteen veel complexer en vereisen waarschijnlijk weer een heleboel opruimwerk. Ik begon zelf met Jekyll Bootstrap, maar heb erg veel tijd moeten steken in het weghalen van vanalles. Achteraf bezien was het veel sneller geweest om met een standaard Jekyll te beginnen en gewoon zelf alles op te zetten.

Daarom de drie stappen om je site te maken:

### 1. Installatie
Installeer de Gem (of eerst ruby, rubygems en dan Jekyll, op Linux soms nodig, op Mac heb je deze al):

{% highlight bash %}
$ sudo apt-get ruby rubygems # op Mac niet nodig dus, op Linux soms.
$ sudo gem install jekyll
{% endhighlight %}

Of installeer Jekyll vanuit je packagemanger in Ubuntu. Beter is via gems, want de deb packages in Ubuntu willen nogal eens achterlopen op de gems, wat Ruby's eigen pakettensysteem is.

{% highlight bash %}
$ sudo apt-get install jekyll.
{% endhighlight %}

### 2. Mappen en bestanden aanmaken
Maak mappen aan waarin je je statische site en de layout enzo gaat bouwen.

<pre>
    .
    |-- _config.yml
    |-- _includes
    |-- _layouts
    |   |-- default.html
    |   `-- post.html
    |-- _posts
    |   |-- 2012-12-30-mijn-eerste-blogartikel.markdown
    |   `-- 2012-12-31-het-was-een-goed-jaar.markdown
    |-- _site
    `-- index.html
</pre>

`default.html` bevat de HTML waarmee je jou site opmaakt, `post.html` de opmaakt van een enkel artikel binnen deze standaard opmaakt. Hierin zet je waarschijnlijk [enkele variabelen](https://github.com/mojombo/jekyll/wiki/Template-Data) om bij het maken van de HTML, de titels, datums enzovoort te plaatsen. De posts schrijf je als simpel tekstbestandje, maar wat extra informatie (zoals tags, auteur enzovoort) kun je [bovenaan in het bestandje kwijt](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter).

`index.html` vul je met wat tekst voor je voorpagina [en code](https://github.com/shopify/liquid/wiki/liquid-for-designers) om een lijstje met artikelen te plaatsen, bijvoorbeeld:

    {{ "{% for posts in site.posts limit:10 " }}%}
      {{ "{{ post.date | date_to_string" }}}}: <a href="{{ "{{ BASE_PATH " }}}}{{ "{{ post.url " }}}}">{{ "{{ post.title " }}}}</a><br />
    {{ "{% endfor " }}%}

Gerenderd als: 

    30 Dec 2012: Mijn Eerste Blogartikel
    31 Dec 2012: Het was een Goed Jaar


### 3. Omzetten naar HTML: de site genereren.
Roep `jekyll --server` aan. Open een browser op [localhost:4000](http://localhost:4000). En viola, je site. 

Met `jekyll generate`, vul je de `_site` map met de statische versie
van je site; deze kun je op vrijwel iedere host plaatsen. Hosten (gratis) op
Github kan ook, maar vereist wat [kennis van git en github's hosting](https://help.github.com/articles/using-jekyll-with-pages).
Uiteraard kun je het plaatsen van de statische content helemaal
automatiseren, bijvoorbeeld met git, of een van de vele [andere manieren](https://github.com/mojombo/jekyll/wiki/Deployment).
