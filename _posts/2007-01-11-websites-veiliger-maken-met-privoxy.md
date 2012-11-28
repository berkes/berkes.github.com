---
layout: post_archive
title: Websites veiliger maken met Privoxy
created: 1168543345
tags:
- security
- privacy
- proxy
lang: nl
---
In mijn [artikel voor het NRC](http://bler.webschuur.com/nrcnext_met_mijn_bijdrage_erin_harry_hacker_surft_ook_mee) next schreef ik al dat een proxy zoals tor de veiligheid van jezelf kan verhogen. Ook schreef ik in die reactie dat het gebruiken van zomaar een gratis of commerciële proxy je privacy of veiligheid helemaal niet ten goede hoeft te komen: iedere malloot kan immers die proxy draaien, en jij hebt geen flauw idee wat ze doen met al jou informatie die door die proxy gaat. Daarom is het misschien wel het verstandigs om zelf een proxy te draaien, lokaal. Uiteraard zal een lokale proxy geen invloed hebben op je privacy, immers, het IP adres van waarop je surft is nog altijd dat van jezelf: je identiteit op het web verandert er niet door.

Wel is een proxy een heel goede manier om de sites die je bezoekt een stuk veiliger te maken. Neem bijvoorbeeld het programma [Privoxy](http://privoxy.org). Dit programma is uitermate geschikt voor (kleine) bedrijfsnetwerken, of een netwerk voor bijvoorbeeld een school. Maar ook voor je eigen thuiscomputer.

Wat het doet is vrij eenvoudig te beschrijven. Zonder een eigen proxy ziet het er ongeveer als volgt uit: ``Jij <=> Webbrowser (bijv. Explorer) <=> Modem <=> Internet provider (bijv. Chello) <=> De website. ``Met een proxy echter als volgt: ``Jij <=> Webbrowser <=> **Proxy** <=> Modem <=> Internet provider <=> De website. ``Die proxy zit daar dus tussen, gewoon op je eigen computer als een filter. Privoxy is dan ook eigenlijk gewoon een filter. Wat het meestal voor je doet is alle (potentiele) schadelijke informatie, of hinderlijke informatie, uit je pagina's filteren, nog vóór ze op je computer (of je browser) komen. Privoxy houdt daarmee iallerilei pop-ups, banners en schadelijke virussen tegen, door deze uit de pagina's te filteren nog voor ze überhaupt bij je computer aankomen. Uiteraard kun je ook [betere browser](http://www.mozilla-europe.org/nl/products/firefox/) gebruiken, maar ook die houdt de lelijke zaken en de banners pas tegen als ze al op je computer zijn. Privoxy zorgt er voor dat het nooit zover komt.

Voor een school netwerk of een bedrijfsnetwerk kan het dus zeer makkelijk ingezet worden om vanaf een centrale plek al het verkeer te filteren op lelijke zaken. 
