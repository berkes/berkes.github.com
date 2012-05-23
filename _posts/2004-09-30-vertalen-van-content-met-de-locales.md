---
layout: post_archive
title: Vertalen van content met de locales
created: 1096565853
tags:
- ''
lang: en
---
Dit document legt uit hoe het vertalen van inhoud met de webinterface in zijn werk gaat. 
Merk op dat deze interface is gemaakt om snel kleine verbeteringen of vertalingen te maken. Het is niet bedoeld om de hele site in te vertalen. Hiervoor zijn veel makkelijkere methodes. Deze vereisen echter de installatie van een programma. Daarom beperkt dit document zich tot het vertalen van kleine stukjes van drupal. 


Op de site zit onder het navigatie-menu een item "admin", dit beschrijf ik in dit document als "navigatie > administer".

Als voorbeeld nemen we "Library" wat vertaald moet worden in "Bibliotheek".

Ga naar "Navigation > Admister > localization".
Kies daar de tab "manage strings".
Voer in het zoekveld "Library" in. Merk op dat dit hoofdletter gevoelig is.
Kies "All languages" of "English (provided by Drupal)". We willen immers een engelse term, "Library" vinden. Al languages zoekt deze term in de nederlandse database EN in de Engelse.
Kies "all strings" of, indien u zeker weet dat deze nog niet, respectievelijk wel vertaald is, "Only translated strings" of "Only untranslated strings".
We zien nue een tabel met alle teksten waarin "Library" voorkomt. Als dit er heel veel zijn, moeten we de zoektermen beter kiezen, bijvoorbeeld door de juiste taal voor te selecteren, of door "translatd"of "untranslated" correct te kiezen.
Als we de correcte term gevonden hebben, gebruiken we de link onder "operations" genaamd "edit"
Deze brengt ons naar een formulier waar we het woord Library kunnen invullen. 
Vul Library in. Als we twee formuliervelden zien, moeten we het ook tweemaal invullen. Dit betkend dat dit woord library op verschillende plekken gebruikt wordt. We willen alles naar "Bibliotheek" vertaald hebben en vullen dus "Bilbiotheek" in. 
Als het een al vertaald woord betreft, zien we hoogstwaarschijnlijk het woord "Bibliotheek" al verschijnen. in de formuliervelden.
Asl we tevreden zijn over het vertaalde woord, of de vertaalde zin, kiezen we "Save Translations". Dan is alles opgeslagen en zijn we klaar.

In sommige zinnen komen zogenaamde placeholders voor. Dat zijn woorden als %url of %usernames. Deze worden door Drupal vervangen met correcte variablelen. Bijvoorbeeld met de link: http://uwsite.com/node/add of met Martijns (merk op dat vaak een s achter een placeholder het bezit aanduid. In dit geval is de placeholder dus %user en de s wordt er achter geplakt.)



