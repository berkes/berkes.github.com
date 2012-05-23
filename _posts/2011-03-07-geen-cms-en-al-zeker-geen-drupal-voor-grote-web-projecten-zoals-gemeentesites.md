---
layout: post_archive
title: Geen CMS en al zeker geen Drupal voor grote web-projecten zoals gemeentesites.
created: 1299510460
tags:
- Overheden
- Projectmanagement
- Drupal
- Ruby-on-rails
- frameworks
lang: nl
---

Gemeentes en overheden zouden hun sites niet met Drupal moeten bouwen.
## Achtergrond.

Ik ben een fan van Drupal, ontwikkel er al jaren mee en heb veel ervaring met succesvolle en evenzovele gefaalde Drupalprojecten. Dat laatste vooral door mijn functie als "probleemoplosser" bij Drupalprojecten. Mensen huren mij vooral in om hun vastgelopen, of uitlopende Drupalprojecten te redden. Ik ben (misschien juist daardóór) ook een Drupal-scepticus. Drupal wordt teveel en te vaak ingezet voor projecten waar het helemaal niet geschikt voor is. Drupal mist ook zo ongeveer alles wat een goede "architectuur" vraagt. Het ontbeert een uitgekristalliseerd veiligheidsmodel, abstractie is geheel afwezig, rommel en broddelwerk in de community (de modules) zijn eerder regel dan uitzondering, enzovoort.

Ik ben ook pragmatist; werk moet af (binnen de deadline). Sites moeten mooi zijn (en niet te duur). Software moet gewoon werken (voor de eindgebruiker) enzovoort. Goede academische opzet is leuk, maar nooit het doel: een goed opgezet project is juist zo goed opgezet omdat daarmee bovenstaande doelen gehaald kunnen worden! En nooit om het "goed opzetten" an Sich. Drupal moet dus ingezet worden waar het succesvol kan zijn. Waar het goed tot zijn recht komt. En het moet vooral niet ingezet worden voor projecten waar het ongeschikt voor is.
## CMSen en hun alternatieven.

Grofweg zijn er drie groepen software waarmee sites gemaakt kunnen worden: CMS, Framework of Barebones.

Een CMS is een kant-en klaar pakket, welke zonder programmeerwerk ingezet kan worden om content te beheren. Voor het gemak wordt de C van Content meestal zeer breed gerekt: ook software om een webwinkel mee te draaien of pakketten om klanten in te beheren worden onder deze groep geschaard: zo lang het maar inzetbaar is zonder programmeerwerk.

Een framework is een omgeving, of platform, of softwarepakket, waarmee programmeurs sites kunnen bouwen. Vaak hebben frameworks allerlei complexe zaken al voor de programmeurs geabstraheerd en is programmeren nauwelijks meer dan het correct instellen van allerlei instellingen, en het verder uitwerken van voorgebakken code.Het is een enorm brede categorie, dus beperk ik, vanaf hier, tot enkele moderne, veelgebruikte frameworks: Symfony, Django en Ruby on Rails.

Een barebone is eigenlijk geen systeem, platform of omgeving, maar juist het ontbreken ervan. Gewoon van de grond af, iets zelf bouwen. Welhaast ieder "webdesignburo" heeft zo zijn eigen CMS gebouwd. Bijna alle grote "enterpriceomgevingen" zijn op deze manier gebouwd.
## Open Source

«Gemeente Grootezee heeft nu DuurBetaaldCMS X, dus Drupal is Open Source, dus beter.» Is een veelgehoord argument. Laat vooropstaan dat juist voor publieke diensten zoals gemeentesites twee dingen enorm belangrijk zijn:
- Voor bezoekers en gebruikers: Toegankelijkheid en voldoen aan standaarden.
- Voor overheden: Onafhankelijk zijn van bedrijven, contracten en licenties.

Maar Drupal is zeker niet de enige oplossing die [hieraan kan voldoen](http://isoc.nl/consultatie/resultaten.odt). Open Source betekent ook niet, dat iets als Open Source ingekocht moet worden. Een gemeente kan best een bestaand closed source pakket opkopen of iets geheel van de grond af aan laten ontwikkelen en het dan Open Source vrijgeven!Ik zie zelfs veel overheidsprojecten waar men Drupal modules heeft laten ontwikkelen die niet vrijgegeven zijn!Gelukkig blijken ook enkele projecten [wel](http://drupal.org/project/rijkshuisstijl) het [geval](https://drupal.org/project/digid). In elk geval is het gebruiken van Open Source nog geen garantie dat de investering ook bij de gemeenschap terugkomt.

Bij het gebruik van een framework is dat precies zo: het gebruiken van Open Source technologie garandeert niet dat het eindproduct ook aan de gemeenschap teruggegeven wordt. Maar dat kan wel, zie het voor Deventer op maat gemaakte CMS [devCMS](http://www.devcms.nl/).
## Return on Investment: Effectief bouwen van een site.

Het belangrijkste argument blijft echter dat Drupal, als CMS, nauwelijks geschikt is om grote complexe maatwerk-projecten mee te bouwen. Dat heeft grotendeels met de technische opzet van deze CMSen te maken.Daarvoor zijn hieronder enkele grafieken opgenomen. Ze geven een globaal inzicht van hoeveel offert men moet steken in ontwikkeling van een site na een X-tal uren.

De y-as geeft de "effectiviteit" aan. Het aantal uren dat met per delivery nodig heeft. 100% effectief betekent géén effort en toch iets opgeleverd (en bestaat dus niet). De onderkant is 0%: enorm veel werk gedaan en niets kunnen leveren. De grafieken gaan uit van ervaren ontwikkelaars. Dus de initiële leertijd (om een taal, of raamwerk te leren gebruiken is buiten beschouwing gelaten).De X-as geeft het aantal uren dat besteed is aan het gehele project. Bijvoorbeeld: na 100 uur Drupal-ontwikkelen wordt dóórontwikkelen steeds duurder. De ontwikkelaar geraakt dan in een domein waar hij of zij alles zelf moet doen, zelf modules moet bouwen en steeds minder makkelijk toegankelijke kennis nodig heeft (bij ontwikkelaars bekend als: de hele broncode van Views moeten lezen om dat stomme cartesiaans product op te lossen).
![Grafiek van effectiviteit uitgezet tegen investering](http://bler.webschuur.com/sites/bler.webschuur.com/files/Drupal_vs_frameworks_0.png)
Overigens blijkt hier ook al meteen een ander veelgemaakte denkfout uit: een groot project is een project met lange doorlooptijd, veel manuren en grote budgetten. Het zegt niks over het uiteindelijke gebruik van een site. Drupal kan goed ingezet worden voor een site met miljoenen bezoekers. Precies andersom, kan een intranetomgeving voor slechts enkele tientallen onderzoekers mogelijk duizenden manuren opslorpen en daarmee een heel groot project zijn.
### Wordpress, of de hypergefocuste CMSen

Wordpress is een CMS dat ontwikkeld werd voor één doel: Bloggen. Het is daarmee super geoptimaliseerd voor deze taak: gebruiksvriendelijk, doelgericht, afgestemd op de doelgroep enzovoort. Daarmee is ook meteen aangegeven wat het allemaal niet kan: namelijk: al het andere. Dit geldt uiteraard ook voor ontwikkelaars: zij bouwen met Wordpress altijd blog-achtige sites. Iets anders kán gewoon niet. Deze vorm van software opzetten heet ook wel [opinionated software](http://gettingreal.37signals.com/ch04_Make_Opinionated_Software.php). Andere voorbeelden zijn PHPBB, het bekende forumsysteem, mediaWiki (software achter onder meer Wikipedia) of Status.net (je eigen twitter-community opzetten).

In enkele uurtjes heb je een site draaien, maar écht maatwerk aanpassingen buiten het duidelijke kader en doel van het CMS kosten enorm veel werk.
### Drupal, of de blokkendozen.

Drupal wordt vaak, ten onrechte, een content management framework genoemd, waarmee men probeert aan te geven dat Drupal best aardig kan meekomen als framework. De oorzaak van deze verwarring is dat Drupal eigenlijk meer een soort blokkendoos is. In tegenstelling tot een CMS als Wordpress met maar één doel, heeft Drupal die focus juist helemaal niet. Drupal is daarmee niet gebruiksvriendelijk (vriendelijk te gebruiken waarvóór?) niet geöptimaliseerd en niet afgestemd op een doelgroep. Dat geeft flexibiliteit en vrijheid. Ontwikkelaars kunnen er veel meer mee bouwen dan alleen datgene waarvoor het ooit bedoeld werd.Maar het is met nadruk géén framework, omdat het juist voor programmeurs weinig biedt: het is niet Object Georiënteerd, kent nauwelijks abstractie, vereist enorm veel duplicaatcode voor simpele aanpassingen, ontbeert iedere vorm van een ontwikkelomgeving, kent nauwelijks een migratiesysteem (Uitrollen van een site via een testomgeving naar de live omgeving). Enzovoort.Voor de oorspronkelijke doelgroep is dat ook helemaal niet erg: Een kleine site heeft helemaal geen OTAP straat nodig. Mijn persoonlijke blog via een ISO9002, ITIL-gecertificeerde workflow prubliceren? Kom nou!Maar als je dit juist wél wilt? Als je juist je systeem wilt koppelen aan andere processen, tools of systemen?Dan moet je alles zelf bouwen, met nauwelijks enige technische infrastructuur. De effectiviteit van al dat extra werk is dan meestal nog lager dan wanneer alles "barebone" van scratch gebouwd werd. Drupal blijkt dan vaak meer "in de weg" te lopen dan dat het "meehelpt". Dit is onafhankelijk van de ervaring en kennis van Drupal: iemand met veel ervaring spendeert net zo goed 100+ uren aan een eenvoudige Create Read Update Delete omgeving van custom "dingen" zoals, zeg, betalingen. Drupal biedt hier nauwelijks tools voor: alle pagina's, lijstweergaves, workflows moeten met de hand geprogrammeerd worden, alsof het in een barebone PHP-omgeving gebouwd werd.

Drupal kent een steile leercurve, veel steiler dan de doelgerichte CMSen. Binnen een tiental uren staat er een basissite. Binnen anderhalve week is met standaardcomponenten een heel aardige maatwerk site op te zetten. Maar daarna zakt alle productiviteit in: Buiten het gebruik van standaardcomponenten is Drupal een slecht ontwikkelplatform.
### De frameworks

Deze kennen een redelijk lange opstarttijd, welke eigenlijk vooral bepaald wordt door de ervaring die men ermee heeft.

Iemand die al enkele sites in Ruby on Rails bouwde, heeft binnen enkele uren al een basissite staan, maar een team dat nog nauwelijks ervaring heeft met frameworks, of de taal waarin ze gebouwd zijn (Ruby voor Rails en Python voor Django) zal, uiteraard, eerst de taal en de concepten moeten eigen maken.Dat hoeft bij een systeem als Drupal veel minder en bij een gefocust systeem als Wordpress helemaal niet. Iemand kan zonder programmeren een heel aardige site opzetten. Met Django kom je niet ver als "Objecten en Classes" enkel op de todolijst onder: "moet ik nog eens induiken" staan.

Maar daarna gaat het snel. Wanneer het team, of de ontwikkelaar weet hoe zaken werken, hoe het conceptueel in elkaar steekt en de ontwikkelteams onder de knie heeft, blijft doorontwikkelen en maatwerk dezelfde effort kosten. Eigenlijk ontwikkelt men met een framework een CMS dat in de eerste categorie thuishoort: een hyper gefocust CMS.

Een framework is ook veel beter geöptimaliseerd om met teams te werken. Drupal biedt nauwelijks abstractie (naar databases, services, diensten enzovoort), kent nauwelijks migraties, testomgevingen en deployment-tools. In frameworks kun je meestal niet eens zónder deze zaken ontwikkelen.Bovendien is de literatuur van frameworks ook zeer veel meer gericht op ontwikkelaars. Literatuur legt juist de structuur, filosofie en architectuur uit. Terwijl bij een CMS altijd het gebruik van het eindproduct op de voorgrond staat. De leercurve voor ontwikkelaars en -teams is daarmee meestal stukken lager dan bij een CMS dat eigenlijk niet bedoeld is voor ontwikkelaars maar voor eindgebruikers.

Verder zak een goed framework ook hergebruik van code toelaten. Meer nog dan een CMS, waar maatwerk juist precies dat is: maatwerk: dus per definitie niet of nauwelijks herbruikbaar. Een framework maakt het juist zo, dat dat maatwerk de minst mogelijke inzet kost. En zorgt voor structuur en standaarden, waardoor zelf ontwikkelde bibliotheken los van het maatwerk gemaakt kunnen worden: een koppeling met een extern systeem bestaat dan bijvoorbeeld uit een abstracte "algemene Python digiD bibliotheek" met een klein sausje maatwerk eroverheen (de integratie van die bibliotheek in je Django-project). Hierdoor is het vrijgeven van werk als Open Source ook veel aantrekkelijker dan bij veel CMSen het geval is. Een Drupal-DigiD-module is enkel in Drupal te gebruiken (waarmee de betreffende overheid zich dus "ingesloten" heeft in Drupal). Terwijl een DigiD Ruby-gem, een Java library, PHP of Python Package veel breder inzetbaar is. Eigenlijk zijn zulke projecten veel waardevoller voor de (open source) gemeenschap.

Wanneer een site gebouwd wordt door professionals, kan al binnen enkele uren een product klaarstaan. En kost het doorontwikkelen daarvan nauwelijks extra tijd per te ontwikkelen onderdeel. Tot het moment dat men ook buiten de kaders van dat platform wil gaan. Dan moeten plots eigen bibliotheken of diensten ontwikkeld worden. Maar dat geldt precies net zo voor geavanceerde features in een CMS. Ik bedoel dan vooral complexe zaken als worker-queues, load balancing, communicatie met andere systemen enzovoort. Een goed framework zal hier echter zeker niet in de weg lopen en mogelijk al allerlei tools (hooks, plugin-systemen, workflows) hebben klaarstaan om e.e.a. te kunnen integreren.
### Conclusie

Drupal is zeer interessant voor projecten die onder de, ruwweg, tweehonderd uur blijven, projecten die ruwweg minder dan €5000 kosten. Daarboven zal een framework, mits gebruikt door ervaren web-ontwikkelaars, altijd efficiënter blijken. Drupal biedt dan geen enkel voordeel, anders dan dat het "Open Source" is. Maar Open Source kan net zo goed met een framework.Overheden en grote projecten zouden dan ook best niet in Drupal gebouwd moeten worden, maar in een daarvoor veel geschikter framework.
