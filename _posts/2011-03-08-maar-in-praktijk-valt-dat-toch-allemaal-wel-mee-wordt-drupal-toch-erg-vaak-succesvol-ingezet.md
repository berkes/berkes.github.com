---
layout: post_archive
title: Maar in praktijk valt dat toch allemaal wel mee, wordt Drupal toch erg vaak
  succesvol ingezet?
created: 1299587164
tags:
- ruby-on-rails
- projectmanagement
- overheden
- frameworks
- drupal
lang: nl
---

Een aantal mensen op twitter of per mail, vonden mijn [artikel over waarom Drupal geen goede optie is voor grote projecten als gemeentesites](http://bler.webschuur.com/geen_cms_en_al_zeker_geen_drupal_voor_grote_webprojecten_zoals_gemeentesites) niet erg concreet. Een reactie:
> 
Er zijn recentelijk een aantal successvolle sites voor gemeentes gebouwd met Drupal. Dat is toch het bewijs dat je ongelijk hebt?

Uiteraard! Deze sites bewijzen dat Drupal wel degelijk gebruikt kan worden voor zulke projecten. Ik zeg ook nergens dat het niet kan. Daarom eerst nog eens de essentie van mijn betoog:

**Drupal is een fijn platform om sites mee te bouwen. Ook grote sites. Maar Drupal is zeker niet het meest geschikte platform om die grote sites mee te bouwen. Drupal zal altijd duurder uitpakken (en mogelijk minder goede projecten afleveren) dan een meer geschikte tool. Frameworks als Django, Rails of Symfony zijn geschiktere tools.**

En dan dat practische deel. Ik heb inmiddels wat tijd gehad om met [DevCMS](http://www.devcms.nl) te spelen. Merk op dat dit geen Drupal versus DevCMS artikel is, maar dat ik DevCMS opvoer als _een product dat een team kan bouwen met een framework_.

Zoals alle Drupalontwikkelaars weten, is een accessmodel in Drupal erg lastig. Het is enorm ingewikkeld om een strak ingeregelde redactionele workflow te maken, waarbij artikelen enkel zichtbaar zijn nadat ze door een administratieve molen gehaald zijn. Iets schijnbaar simpels als (door mij vereenvoudigd citaat uit een recente offerteaanvraag): _Een groep artikelen wordt door de redactie in draft geschreven, dan geredigeerd, gaat dan naar afdeling Juridische zaken[...], bij goedkeuring naar eindverantwoordelijke en bij afkeuring terug naar de auteur(s)[...]. De eindverantwoordelijke kan de groep artikelen publiceren, waarna oude revisies bewaard blijven en de goedgekeurde revisieset online komt_.

Ik zou, écht niet weten hoe ik dat makkelijk in Drupal gedaan kan worden. Ik schat, natte vingerwerk, voor deze feature minimaal 100 uur ontwikkeling in (maar zou een echte inschatting pas na een proof of concept durven geven). De crux zit hem overigens in het detail "groep artikelen"; wat een artikel met subartikeltjes zou kunnen zijn. En in "strak ingeregelde", want iets wat hier ongeveer op lijkt is vrij eenvoudig in Drupal.

DevCMS heeft dat dus wél. Ik weet uiteraard niet hoelang dat team daaraan heeft gebouwd, maar ik weet uit ervaring dat met Rails' statemachine addons zulk soort workflows niet enorm veel werk en tijd kosten. Uit de handleiding:
> 
Nodes in the tree can be in several states, which is stored in the node’s status attribute:• unapproved: The node has been created or changed by an editor and is waiting for approval.• approved: The node has been approved, created or updated by an administrator or final editor. A new version of the content node is recorded.• rejected: An unapproved node has explicitly been rejected by an administrator or final editor. The editor responsiblefor the change will be notified when a node enters this state.• drafted: The node (unapproved or approved) is drafted, meaning a user has not finished changing this node andshould therefore not be shown on the website. The node will not be listed for approval.

When a content node is created by an administrator or final editor, it is automatically considered to be approved and therefore a new version of this node is recorded. [....] Conclusively, when an editor makes a change, the table of the content type will contain the new, unapproved version and the website should show the yaml-ized, approved version until the unapproved version has been approved by an administrator or final editor.

Ze merken in de handleiding zélf nog op dat hier nog veel werk voor e DevMCS ontwikkelaars ligt. Dat ze dit nog lang niet naar eigen wens hebben afgerond. Maar mijn eerste indruk is dat dit al véle malen beter is dan welke redactionele workflow ik in Drupal ooit geïmplementeerd heb zien worden.

Drupal kan iets essentieels als redactionele workflows best, maar vraagt een oplossing die zo goed als _van scratch_ opgebouwd moet worden: honderden uren bijelkaar klikken van standaardcomponenten en stukjes custom code, die ieder project telkens weer moet neertellen: voor iedere te implementeren Drupalsite weer opnieuw. En blijkt dna erg vaak op details slecht afgewerkt te zijn; resulterend in workflows die meestal wel redelijk, maar zelden _precies_ passen in een organisatie.

Terwijl in een framework vrij eenvoudig gebruik gemaakt wordt van componenten als een statemachine om een workflow te bouwen die _exact_ past bij het project. Die dus _ook_ van scratch gebouwd moet worden, maar die, vanwege veel geschikter hergebruik van anderssoortige bibliotheken, zowel veel nauwkeuriger ingebed kan worden in een bestaande workflow, alsook veel sneller en makkelijker te implementeren is.

**Een CMS vraagt eigenlijk altijd dat de organisatie zich aanpast aan de redactionele workflow die ingebakken is in dat CMS, terwijl een framework de ontwikkelaars bouwstenen geeft om een precies passende workflow te ontwikkelen**

En dat is slechts één klein practisch voorbeeld. Ik weet zeker dat we met veel meer zulke voorbeelden kunnen komen.

Wat voor ogenschijnlijk simpel probleem heeft jou in Drupal uren uitzoek- en ontwikkeltijd gekost?

Wat Doet Drupal, of een ander CMS out of the box (zonder enig werk) waar je uren ontwikkelen in een framework voor nodig hebt?
**edit: tweede vraag toegevoegd**
