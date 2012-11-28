---
layout: post_archive
title: Pedofielen op chatsites. 'Het is technisch onmogelijk om....'
created: 1174406120
tags:
- open source
- msn
- jabber
- pedofielen
- veiligheid
lang: nl
---
In de metro vandaag een eigen onderzoek naar kinder-lokkers op chatsites.

Ik schreef hier recent ook al een en ander over, waarbij ik als [een van de oorzaken het systeem MSN aankaartte](http://bler.webschuur.com/pedofielen_op_msn_is_een_van_de_mogelijke_oorzaken_msn_zelf"). MSN biedt erg weinig mogelijkheden om je zelf, of je kinderen (te laten) beschermen.

In de metro gaat het echter over chatsites. tmf.nl, spellenjes.nl enzovoort. Sites waarop kinderen kunnen chatten. En pedosexuelen ook.

Er is daar veel mis, volgens de auteur. Zo geven de beheerders van chatsites als argument "Het is voor ons onmogelijk om privé berichten in te zien", of "het is gewoon teveel".

Waarom dan niet de techniek je laten helpen? En ja, ik kom weer met Jabber op de proppen. [Arda Gerkens](http://www.sp.nl/partij/gekozen/arda.stm) geeft in dat artikel als tegenreactie "Er zijn genoeg technieken beschikbaar om ervoor te zorgen dat dit soort gesprekken niet kunnen plaatsvinden".

Precies mijn idee.

Daarom dacht ik, laat ik eens gaan brainstormen en een concept bedenken van een veilige chatomgeving. Een fictief voorbeeld, schoolchat.nl.

Een standaard [jabber server](http://www.jabber.org/software/servers.shtml) zorgt voor de infrastructuur.

Een gesloten registratie- en toegangssysteem zorgt voor het eerste veiligheidsniveau. Het andere veiligheidssyteem is dat de chats gemonitord worden door (intelligente)filters en door moderators.

Het gesloten registratiesysteem:Een van de verplichte velden is leeftijd, die niet hoger mag zijn als 18.

De server laat alleen gesprekken door, van mensen die vanaf het IP adres inloggen waarmee ze registreren (dynamische IP moet dan echter ook goed worden afgehandeld).

Verder kun je met dat account alleen met mensen chatten die ook met een account op die server hebben. Het jabber adres is bijvoorbeeld Bloemetje95@Veiligchatten.nl en kan alleen chatten met andere @Veiligchatten.nl adressen.

Het mooie aan het jabber registratiesysteem is, dat het makkelijk uit te breiden is. Zo kun je (als dat ooit echt gaat doorbreken) digID koppelen aan het registratiesysteem, alleen mensen met een geldig digID inlogcode (en dus een geverifieerde leeftijd) kunnen chatten, bijvoorbeeld. Of je treed op als dienstverlener: alleen mensen met een account van hun schoolnetwerk kunnen daarmee inloggen. Je kunt bijvoorbeeld eisen dat een kind het emailadres van een van de ouders ingeeft die vervolgens een berichtje krijgen en het account moeten activeren, handig als ouders graag hebben dat ze (algemeen) op de hoogte bijven van wat er gebeurt. Het zijn allemaal ideeën die nog ruw zijn (zo kan een kind makkelijk een eigen emailadres opgeven en daarna zelf het account goedkeuren), maar het is altijd meer dan de totale anonimiteit die kinder-lokkers anno 2007 mogelijk maakt om op spelletjes.nl kinderen op te pikken.[Een webclient](http://jwchat.sourceforge.net/) voor mensen die niet een speciaal programma willen installeren, dus in hun browser willen chatten is door de aanbieder binnen twintig minuten draaiend te krijgen op schoolchat.nl, en uiteraard is er een heel groot aanbod aan andere jabber clients, voor mensen die wel eventjes een programma willen installeren.

Het loggen:Op de server worden alle gesprekken gelogd, uiteraard met een goed uitgedacht privacymodel, liefst getoetst door een advocaat of privacy deskundige. Hiermee creëer je een bepaalde veiligheiddie vergelijkbaar is met het ophangen van camera's. Je voorkomt niet dat er enge dingen in en steegje gebeuren, maar de wetenschap dat er opnames van worden gemaakt, heeft een grote afschrikkende werking. En creëert bovendien een zeker veiligheidsgevoel.

Intelligent monitoren:De gesprekken lopen ook door filters, bijvoorbeeld met bayesian logica (kunstmatige intelligentie, vaak gebruikt voor het filteren van spam). p bepaalde patronenworden rode vlaggetjes gezet. Een vereenvoudigd voorbeeld kan zijn 'XX jaar' waarbij XX groter is dan 18. Het deel van het gesprek waar zo een patroon in voorkomt gaat naar een queue van een moderator, die de context leest en bijvoorbeeld bepaalt dat 'de persoon X zegt dat ie 32 jaar is'. Of dat Patrick zei dat 'zijn ouders al 25 jaar in hetzelfde huis woont'. De moderator kan dan eenvoudig het IP nummer en/of het account van diegen die ouder is dan 18 blokkeren.

Andere patronen waarop makkelijk te scannen is, zijn telefoonnummers, MSN adressen, emailadressen of postadressen. Wat moeilijker, maar ook zeker mogelijk, is het detecteren van sleutelwoorden in een bepaalde context. "afspreken" en "ergens", kan op problemen duiden.

Deze technieken zijn minder ingewikkeld dan menigeen zal denken, veel mailprogramma's gebruikt ze bijvoorbeeld al voor het vinden van spam. En zoekmachines of zoekprogramma's op je computer gebruiken dit soort technieken ook al om te indexeren. Het is zeker niet waterdicht, maar het het basisidee is, dat we allemaal technieken bouwen die deze virtuele "_omgeving_" doet lijken op de veiligheidsmodellen zoals wij die "_in real life_" kennen. Zo moeten we zoeken naar concepten om te achterhalen 'ben jij echt wie ik denk dat je bent' of die het mogelijk maken na te gaan 'wat je zoontje vanavond heeft uitgevreten'. Zo zouden we moeten zoeken naar de virtuele variant van 'papa komt je ophalen als het feest voorbij is, bel me even als je naar huis wilt'. Of de digitale versie ontwerpen van de vaststelling 'Die meneer hangt altijd bij de basisschool rond als de school uit is'.

Allemaal zaken die met een vrij en open systeem als Jabber makkelijk te implementeren zijn. Zou een [meldpunt kinderporno](http://www.meldpunt-kinderporno.nl/), of een (semi) overheidsinstelling niet gewon de stoute schoenen moeten aantrekken en een prototype ontwikkelen?
