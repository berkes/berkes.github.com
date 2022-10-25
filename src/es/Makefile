all: pres.html

pres.html:
	pandoc -t revealjs -s -o pres.html pres.md --incremental --css=style.css --slide-level=2 -V revealjs-url=./reveal.js-3.9.2/

pres.pdf:
	pandoc -t beamer -o pres.pdf pres.md --slide-level=0
