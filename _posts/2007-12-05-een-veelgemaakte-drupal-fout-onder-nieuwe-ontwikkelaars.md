---
layout: post_archive
title: Een veelgemaakte Drupal fout onder nieuwe ontwikkelaars
created: 1196892333
tags:
- Drupal
- webschuur
- development
- Projectmanagement
- Opne Source
lang: nl
---
Na nogal wat jaren Open Source web-ontwikkeling heb ik veel projecten ten gronde zien gaan aan dezelfde fout die veel beginnende Open Source ontwikkelaars maken. Ik ben vaak als reddende kapitein binnengehaald op dit soort projecten, projecten die aan hetzelfde syndroom leiden: Denken dat iets weinig tot niets kost omdat het als Open Source (gratis) beschikbaar is. Probeer altijd zeer gedetailleerde RFQs (offerte-aanvragen) te krijgen van een klant. Indien ze dit niet kunnen geven, ga dan met ze praten en stel het zelf op. Indien dat ook niet gaat, maak dan zelf een zeer gedetailleerde afbakening van de onderdelen. Ik heb teveel Drupal projecten ten onder zien gaan aan iets als volgt:> Klant: "1.7: Forum. Uitgebreid forum. Klanten kunnen inloggen en reacties achterlaten"Developer: "even kijken. Ah. Drupal heeft een forum. €400 op de offerte"klant: jamaar, ik wel mass-moderation. En waarom kan ik geen mail ontvangen als er nieuwe posts in het forum komen. Avatars wil ik ook. en mensen moeten plaatjes uploaden.Developer: "ah. er is een image module. En een comment-mailer. En de avatars kan ik zo aanzetten". ... drie maanden verder ...Developer: "damn, die IM module is lelijk. En met die image module kan de klant niks icm de WYSIWIG die ik met veel moeite heb ingebouwd". Kortom: weet *precies* wat er geboden wordt in het beschikbare open source project. En weet dus ook wat er *niet* geboden wordt. Als je een forum aanbied, speel dan altijd op veilig. Onderzoek eerst op diverse manieren, in detail wat de Drupal forum-module kan. En beschrijf precies dát als randvoorwaarde op. Als er dan iets (niet) is dat de klant toch wil, was er vanaf begin duidelijk dat het al dan niet er zou komen.
