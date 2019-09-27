---
layout: post
title: "Algemene Voorwaarden Deponeren met Bitcoin Blockchain en IPFS"
tags: [Bitcoin, IPFS, Deponeren, Nobleton]
lang: nl
---

Anno 2019 gaat het deponeren van __algemene voorwaarden__, bij de KVK
gelukkig al wel digitaal. Maar daar is dan alles ook mee gezegd. In [de
instructies](https://www.kvk.nl/inschrijven-en-wijzigen/deponeren/algemene-voorwaarden-deponeren/)
van deze KVK is te lezen:

> "Voorzie het document van je bedrijfsnaam (deze bedrijfsnaam moet gelijk zijn aan de naam waarmee je bent ingeschreven in het Handelsregister) en stuur dit naar .... De datum van ontvangst van je mail of post wordt gehanteerd als deponeringsdatum.
> Zodra de deponering is geadministreerd ontvang je een bevestigingsbrief met de datum van deponering en een factuur.

Dit is omslachtig, foutgevoelig en daarmee duur. Een alternatief, maar
meestal nóg duurder, en vaak net zo omslachtig, is om je algemene
voorwaarden bij een rechtbank te deponeren.

De KVK, en rechtbank verzorgen bij het deponeren twee belangrijke functies:

1. Een externe partij (iemand anders dan jij of je klant) heeft een kopie van je _algemene voorwaarden_
1. Een vertrouwde externe partij zet een datumstempel op je document:
   bewijs dat jij op datum T het document D had.

Laat dit nu juist twee functies zijn waar een gedecentraliseerde
database (blockchain) uitermate geschikt voor is!

Dus bedachten wij met Nobleton een deponeringssysteem waarbij we
moderne technologie, nieuwe en open standaarden aaneen koppelen om die
twee functies te verzorgen. Vooralsnog enkel voor het [Deponeren van
_algemene voorwaarden_](https://nobleton.nl/deponeren/).

Het mooie -volgens mij dan- is dat iedereen dit na kan maken en na kan
doen. Bij ons is het geautomatiseerd en -vinden wij- super
gebruiksvriendelijk. Maar alle technologie is vrij, gratis en openbaar
te gebruiken en zelf te controleren. Met wat onderzoek, het installeren
van wat software en het aaneen koppelen van checksums, en digitale
gereedschappen, kun je het best zelf doen. Gratis, en onafhankelijk van
ons, de KVK of andere bedrijven. Wij nemen je deze stappen en dat onderzoek
uit handen.

Hoe werkt dat dan ongeveer? (Terzijde: ik ben me bewust van de
oversimplificatie en manke analogieën; het
klopt inderdaad theoretisch niet perfect. Het gaat mij om het uitleggen
van de principes, niet om de wiskundige of cryptografische juistheid)

## OpenTimestamps

Dit is zowel een protocol als een vrij te gebruiken dienst.  De dienst
is [OpenTimestamps.org](https://opentimestamps.org). Waarop je eenvoudig
documenten kunt uploaden en daarvan een cryptografisch bewijs ontvangt
dat dit document bestond op het moment van uploaden. Dit bewijs
gebruikt de Bitcoin Blockchain.
 
OpenTimestamps, het protocol, is een lijst afspraken en standaarden
waaraan software moet voldoen die gebruik wil maken van deze
stempeldienst. Of waaraan software moet voldoen om zélf een
stempeldienst te worden. Het is dus geen bedrijf, of stuk software; je
zit dus niet vast aan één dienst, één software of één partij.

In grote lijnen zeggen de afspraken dat een tijdsstempel als volgt gezet
wordt:

1. Maak een checksum van een document. Een checksum is een
   cryptografisch begrip, te complex om hier in detail uit te leggen, maar hier
   voldoet het om het te zien als een "vingerafdruk": Elk uniek document
   heeft een unieke vingerafdruk. Verandert er één letter of byte, dan
   krijg je een hele nieuwe vingerafdruk.
2. We slaan deze checksum in een *Merkle tree*. Dit kun je zien als een
   cryptografische database waarbij je honderden of duizenden zulke
   checksums kunt "samenvatten" in één checksum. En waarbij die éne
   checksum bewijst dat al die honderden er ook inzaten. Een
   OpenTimestamp server verzamelt documenten gedurende minuten, of uren
   en maakt er dan één zo'n "samenvatting" van. Je kunt het ook zien als
   "de vingerafdruk van honderden vingerafdrukken".
3. Deze éne checksum wordt opgeslagen in de Bitcoin Blockchain. Een transactie van
   €0,00, waarbij, als het ware, de samengevatte vingerafdruk van
   honderden documenten als "betalingskenmerk" wordt opgenomen. Pas als
   er genoeg documenten verzameld zijn wordt het gestempeld. Maar nooit
   wordt langer dan enkele uren gewacht. Meestal binnen minuten al.
4. Een verwijzing naar de transactie, doet nu dienst als "tijdstempel".
   Je hebt nu bewijs dat jij ten tijde van deze transactie het document
   had. Die verwijzing is tevens een soort "eigendomsbewijs" dat jíj het
   liet stempelen en niet je concurrent.

## Bitcoin

We gebruiken de [Bitcoin blockchain](https://bitcoinuitleg.nl/) voor
deze tijdstempels. Ten eerste, omdat hiermee het eerste, bekendste en
meestgebruikte stempelprotocol, OpenTimestamps werkt. Maar ten
tweede, omdat Bitcoin veruit de "veiligste" en meest bestendige
blockchain is.

Bitcoin is de meestgebruikte blockchain, met de grootste hoeveelheid
miners en deelnemers. Daarmee is het een blockchain waarin het zó enorm
duur is om achteraf nog iets te wijzigen, dat dit nu én in de toekomst
als onmogelijk geacht wordt.

Kortom: staat de "vingerafdruk" van je _algemene voorwaarden_ er eenmaal
in, dan kan niemand het meer wijzigen.

Bij centrale partijen als de KVK is dat wel mogelijk. De KVK kan door
een hack, storing, menselijke fout, onder dwang, of theoretisch zelfs
kwaadwillendheid, achteraf deponeringen best nog veranderen. 
Op de Bitcoin Blockchain is dat onmogelijk.

## IPFS

Vastleggen dat een document bestond op datum T, is één ding. Dat jíj het
in handen had op datum T een tweede.

Maar nét zo belangrijk is het kunnen opvragen van gedeponeerde
documenten. Al je klanten moeten je _algemene voorwaarden_ kunnen
opvragen, ongeacht of jowu bedrijf nog bestaat, of dat jij ze (nog) wel
wilt overhandigen aan die vervelende klant.

Wij gebruiken hiervoor een [decentraal bestandssysteem:
IPFS](https://ipfs.io/). IPFS kun je vergelijken met een enorme "online
schijf" waarbij iedereen die eraan deelneemt, kleine stukjes van zijn
schijf beschikbaar stelt en die, aaneengeregen, een enorme,
onafhankelijke schijf vormen.

Een nadeel bij deze techniek is dat een bestand wat weinig gebruikt
wordt, na verloop van tijd niet meer beschikbaar is. De redenen hiervan
zijn vrij technisch, maar wij lossen dat voorlopig op door de bestanden
te blijven "seeden": door ze zelf actief te blijven verspreiden over het
netwerk. Wij zoeken nog naar andere partijen die dit met ons willen
gaan doen. Helemaal 100% onafhankelijk is het dus nog niet. Voor de
geïnteresseerden: bedrijven achter IPFS werken hier ook aan met onder
andere FileCoin.

Onafhankelijk betekent daarin dat het in principe niet uitmaakt of Nobleton de
documenten nog heeft, of dat een centrale hostingpartij de servers wel
online houdt: zolang het IPFS-netwerk van "aaneengekoppelde schijven"
online blijft, zijn de bestanden te delen. Het is ook niet mogelijk om
bestanden te wijzigen of te verwijderen. Wanneer versie 13.37 van je
_algemene voorwaarden_ gedeeld zijn, zijn ze beschikbaar onder de
vingerafdruk van dat document. Verander je één letter erin, en wordt die
geüpload, dan heeft dat een andere vingerafdruk: het is een nieuw
bestand. Dit nieuwe bestand staat nu naast het oude. Iedere vingerafdruk
vormt meteen ook een URL (een link) waarop het document te downloaden is.
Hiervoor is geen speciale software nodig. Voor het plaatsen, het uploaden dus,
wel.

Dit zijn geweldige eigenschappen voor het deponeren en beschikbaar
stellen van documenten. 
Immers: je bent niet afhankelijk van de medewerking van bedrijven,
partijen of personen om bij de _algemene voorwaarden_ van die bedrijven te
komen. Je kunt ook onafhankelijk nagaan of een versie wel exact klopt:
niemand kan documenten per ongeluk of stiekem veranderen.

Bij Nobleton is deze IPFS-vingerafdruk (en dus de link om het te
downloaden van het IPFS netwerk) tevens ook het deponeringsnummer.
Simpel en doeltreffend.

## De toekomst van "Deponeren"

Wij geloven dat deze moderne technieken als Bitcoin, Blockchain en IPFS
het mogelijk maken om véél goedkoper én zonder derden of centrale
partijen, documenten te kunnen deponeren. Dit is nu nog erg ingewikkeld,
maar wij denken dit veel eenvoudiger te kunnen maken. Eenvoudiger nog
dan deponeren bij "klassieke" partijen als de KVK of een rechtbank.

Onze volgende stap is om bestanden ook te kunnen versleutelen, waardoor
je met dit systeem ook geheime documenten kunt deponeren. We zijn dit
nog aan het onderzoeken en aan het testen: we moeten immers zorg dragen
dat het nu én in de toekomst met veel krachtigere computers, alles goed
en sterk versleuteld is en blijft.

Daarnaast werken we aan een zoekmachine voor de gedeponeerde algemene
voorwaarden. Deze moet ook helemaal onafhankelijk draaien: ongeacht of
wij over tien jaar nog bestaan: jij kunt de gedeponeerde documenten
terugvinden!

**Stay Tuned**.
