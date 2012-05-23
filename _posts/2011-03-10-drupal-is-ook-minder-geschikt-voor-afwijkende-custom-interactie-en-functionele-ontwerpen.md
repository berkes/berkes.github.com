---
layout: post
title: Drupal is ook minder geschikt voor afwijkende, custom interactie en functionele
  ontwerpen
created: 1299755590
tags:
- UX
- Ruby-on-rails
- Projectmanagement
- Overheden
- interactieontwerp
- functioneel ontwerp
- frameworks
- Drupal
- Django
- Design
lang: nl
---

Op mijn artikel over [waarom Drupal voor grote projecten niet de meest geschikte tool is](http://bler.webschuur.com/geen_cms_en_al_zeker_geen_drupal_voor_grote_webprojecten_zoals_gemeentesites), kreeg ik ook wat reacties in de trant van
> 
Jij bekijkt het alleen vanuit de technische kant. En vergeet het designen, functioneel ontwerpen en het beheer.

Dit ben ik niet vergeten, maar heb ik expres weggelaten om het verhaal niet nóg langer te maken.
<!--break-->
Ter volledigheid: Functioneel ontwerp, interaction design en natuurlijk het grafisch ontwerpen zijn zaken die allemaal vooraf gaan aan het bouwen van een site.

Hier doet zich in het geval van een CMS een interessant gegeven voor, namelijk dat het CMS erg beperkend werkt op de mogelijkheden binnen zo een ontwerp. Zo roep ik bij bijna alle Drupal-projecten:
> 
Er moet dan wel een techneut bijzitten die kan bijsturen, zodat we Drupal optimaal gebruiken en geen zaken gaan bouwen die in Drupal heel moeilijk blijken.

Klinkt redelijk: dat de gebruikte techniek optimaal ingezet wordt. Dat je al tijdens de eerste ideeënfase Drupals ins- en outs leert kennen en je daardoor laat leiden, is geen verkeerde werkwijze.En zo voorkom je honderden uren ontwikkelen van een detail, dat, achter bezien, die honderden uren helemaal niet waard blijkt.

Ook een goed idee: om zaken die al voor jou uitgewerk werden gratis in te zetten: scheelt geld.
> 
Als je uit gaat van "standaard waar het kan, maatwerk als het echt moet" en je bent als klant al tevreden met hetgeen out of the box kan worden geconfigureerd (verwachtingen-management!) dan ben je een framework of custom code al tonnen verder om na te bouwen wat je met Drupal en alle contribs al hebt.

Een meer concreet voorbeeld:
> 
Gebruik gewoon de standaard Drupal login- en registratieprocedure, dan hoeven we daar niet eens over na te denken en ook niets voor te ontwikkelen (en te onderhouden).

Maar wat nu als je wél die vrijheid van ontwerpen wilt? Om dat login-verhaal erbij te halen: een goede businesscase, waarmee je conversie-ratio omhoog schijnt te schieten is: _mensen kunnen anoniem een comment posten en krijgen pas daarná een login- of registreer scherm. Met de optie om met openid, twitter, facebook enzovoort te registreren._

Dan verdwijnt al het voordeel van een gratis, al uitgedacht systeem. En dat is precies wat ik overal zie gebeuren: duizenden euro's in een offerte voor een systeem dat afwijkt van hoe het CMS het "al deed".

Het argument "standaard waar het kan, maatwerk als het echt moet" onderschrijft daarmee mijn betoog alleen maar: een standaardproduct is simpel, goedkoop en snel uit te rollen (en als _dat_ al niet zo is, is er its anders, grondig, mis). Dan is een budget van enkele tonnen niet te verantwoorden: Die tonnen zitten in de praktijk altijd in dat "maatwerk als het echt moet". En is de cirkel rond: "standaard waar het kan, (een klein beetje) maatwerk als het echt moet en anders een tool die veel geschikter is voor maatwerk". Waarbij Drupal dus vooral ingezet kan worden voor kleinere, goedkopere projecten en de grote projecten (zoals overheids- of enterpricesites) meer geschikte tools moeten hebben.

Men zegt niet voor niets dat [A large portion of time spent building [...] is spent undoing the assumptions that Drupal has baked into core directly.](http://developmentseed.org/blog/2009/oct/28/smallcore-manifesto-help-us-build-better-teddy-bear).

En daarmee hebben we design, ontwerp, en beheer ook meteen te pakken.
## Design:
> 
Designers moeten zich confirmeren naar het CMS en hoe daarin zaken gedaan worden.Nu moet gezegd worden dat Drupal misschien niet het makkelijkst te leren is voor ontwerpers (themers), maar zeker een van de (zo niet de aller-) flexibelste qua design.

Overigens heerst onder Drupal-ontwerpers ook veel ongenoegen over dat themen. Dat heeft voor een groot deel een architectuur-technische oorzaak: Drupal is niet MVC, heeft geen "ontworpen" theme-laag, maar grotendeels een organisch gegroeid "gebied". Dat resulteerde in een inconsistente en rommelige "interface", waarbij interface de gereedschapskist is, waarmee de ontwerper/themer aan de slag gaat.
## (Interactie) Ontwerp

Een framework doet veel minder (tot geen) aannames over interactieontwerp. Een CMS doet dat wél. Een CMS biedt (duidelijk) afgebakende grenzen aan: zo doen we het en niet anders.

Wanneer in het CMS deze interactie heel goed voor een bepaald doel op maat gemaakt is, heb je, wat ik eerder noemde, een **hyper gefocused CMS**. PHPBB, een forum-tool, hoeft ook bijna geen aangepast interactieontwerp: het is immers al helemaal geöptimaliseerd voor het beheren van forums. Dat PHPBB je beperkt in de vrijheid zelf je admin- interfaces, workflows en dergelijke te ontwerpen, is nauwelijks van belang.

Maar een CMS dat fungeert als generieke blokkendoos, vereist dat wél. Daar moet je de vrijheid hebben om zélf je menu-structuren helemaal in te richten, om zélf optimale workflows op te zetten. Kortom, precies het interaction-design, de wireframes of het funcitoneel ontwerp te kunnen volgen.

Dan is "Drupal optimaal gebruiken" opeens veel minder waardevol, omdat je gewoon het ontwerp wilt kunnen volgen en niet rekening te moeten houden met de niet-passende ideeën van een modulebouwer.
## Beheer.

Wanneer je zo een site bouwt, waarin je heel veel moet "undo-en", eindig je niet zelden met honderd, hondervijftig modules. Waarvan een groot deel heel, project- of casespecifiek gebouwd is.

Overigens kent het gemiddelde Rails-project waarmee ik bekend ben, ook ongeveer 50 externe, vereiste bibliotheken (gems). Maar vijftig bibliotheken is iets heel anders dan hondervijftig modules. Mijn ervaring met Django, Symfony, of .NET projecten is te gering om hier een generieke uitspraak over te kunnen doen, maar ik verwacht ongeveer hetzelfde. Een recent CakePHP project dat ik bouwde had twee zulke bilbiotheken: een PDF-library en een Twitter-libary. Niks meer.

In Drupalprojecten kom ik niet zelden het volgende patroon tegen:
- Core doet X1
- Contrib module maakt daarvan X3
- Eigen module maakt deel van contrib module ongedaan en maakt het gewenste resultaat X2
- Het theme en theme-preprocessors bouwen daarvan X2'.

Dat is ook wat developmentseed bedoelde met "undoing". En er zit dus twee keer zoveel code en twee keer zoveel features in dan nodig: eerst de features en daarvoor nodige code die niet gebruikt gaan worden. En vervolgens code om die features weer te verbergen.

Een ander, veelvoorkomend patroon is:
- Contrib A doet X op zijn eigen maniertje, niet helemaal passend bij het interactieontwerp.
- Contrib B doet Y op een ander, eigen maniertje.
- Eigen module zorgt dat X en Y consistent zijn en samenwerken volgens het interactieontwerp.
- Theme gebruikt deze data, verwerkt en past ze aan, tot een custom-interface.

Dat heet in Drupal meestal "gluecode". Omdat het een CMS is, en geen framework, hebben modules (en core) deze "maniertjes". Een (goede) bibliotheek heeft geen maniertjes, maar is hoogstends "opinionated"; wat betekent dat het technische aannames doet, zoals bijvoorbeeld de naamgeving van je database.Dit patroon veroorzaakt ook een zogenaamde "tight coupling" tussen het theme en de implementatie. Een theme kan niet werken zonder dat alledrie modules beschikbaar zijn, én exact volgens een patroon ingeregeld. En andersom zal zonder het theme (of met een ander theme) de site heel anders (of helemaal niet) werken. "Tight coupling" is een bekende oorzaak van veel beheerproblemen en van enorm veel bugs.

Een Drupalmodule is echter bibliotheek, implementatie en vaak nog design daarvan, in één. Een bibliotheek is enkel bibliotheek. De implementatie, en al helemaal het design is aan de bouwer. Er is dus geen undoing nodig. En geen gluecode (of: iemand zei me ooit: bouwen met Django is alléén maar gluecode schrijven).

Wanneer je in Django een paar [Packages](http://djangopackages.com/) (bibliotheken) binnenhaalt, of in Rails een paar Gems opneemt, is het patroon heel anders:
- Core doet niets.
- Gem X biedt een aantal, geabstraheerde, helpers aan.
- Jou Rails app gebruikt die helpers om, met custom code, het gewenste resultaat te krijgen.

Een voorbeeld:
- Rails heeft van zichzelf geen uploadfunctionaliteit.
- [Carrierwave](https://github.com/jnicklas/carrierwave) bied de mogelijkheid om heel eenvoudig files aan "objecten" toe te voegen.
- Het door jou ontwikkelde "article" model, gebruikt enkele regels code om plaatjes aan artikelen toe te voegen, deze te bewerken (thumbnails, watermarks enzovoort) en de resultaten beschikbaar te maken en weer te geven.

Voor beheer is dus belangrijk dat, om het gewenste "ontwerp" te bereiken, met een CMS vaak erg veel extra modules, addons of eigen code meegeleverd moet worden. Die veelal erg uiteenloopt qua implementatie, veiligheid en kwaliteit. 150 modules beheren is een hel. En helemaal als een groot deel daarvan gluecode en ondoing is.

Bij een framework kunnen bibliotheken net zoveel uiteenlopen qua veiligheid en kwaliteit, maar de manier van inzetten is zodanig anders, dat beheer van deze bibliotheken nauwelijks moeite kost. De manier van inzetten volgt ook altijd heel duidelijk beschreven patronen, want dat is vastgelegd in het framework. Waardoor een willekeurige (nette) rails app door iedere rails-ontwikkelaar binnen enkele uren te begrijpen is.

Bovendien zijn frameworks in essentie eigenlijk niet meer dan tools om al die bibliotheken te beheren en te implementeren. Bij een CMS is beheer van modules of addons vaak slechts een bijzaak, het is immers een Content management systeem en geen Code management systeem. In Drupal is dit welliswaar aan het veranderen met tools als [features](http://mustardseedmedia.com/podcast/episode43), en drush. Maar het komt nog altijd niet in de buurt van een tool als [bundler](http://gembundler.com/rationale.html)

**Wanneer je je confirmeert aan het CMS heb je dus niet alleen veel minder ontwikkel- en denkwerk te verrichten, het beheer wordt ook nog eens stukken goedkoper.** Maar een project waarbij je nauwelijks ontwikkelt, je functioneel ontwerp helemaal laat leiden door de conventies van het CMS en het beheer een fluitje van een cent is, kost toch ook bijna niets?! Zo een site is in een week gemaakt. Kost een paarduizend euro aan design en themeing en kan per definitie nooit honderden uren werk kosten, want dat werk voorkwam je nu juist door alles standaard te doen!

Waarom kost een Drupalsite dan toch vaak enkele (tien)duizenden euro's? Mis ik een belangrijke kostenpost? Of zijn we vooral "Maatwerk waar het moet" aan het bouwen met Drupal?
