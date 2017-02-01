/* globals Typer */
/* jshint latedef: nofunc*/

'use strict';
window.onload = function () {
	var typer = new Typer(document.querySelector('.computer'));
	typer.addText('dev -hi');
	typer.newLine();
	typer.addText('Welcome to Dev Club...');
	typer.newLine();
	typer.addText('We make cool stuff.');
	typer.newLine();
	typer.addHtml('<a class="button join-us" href="./#join"> Join Us </a>');
	typer.type();

	document.querySelector('.burger-container').addEventListener('click', function () {
		console.log('hi');
		this.querySelector('.burger').classList.toggle('x');

		document.querySelector('nav').classList.toggle('visible');
	});

	var navButtons = document.querySelectorAll('nav > ul > li > a');
	for (var i = navButtons.length - 1; i >= 0; i--) {
		navButtons.item(i).addEventListener('click', closeNav);
	}
};

function closeNav () {
	document.querySelector('nav').classList.remove('visible');
	document.querySelector('.burger').classList.remove('x');
}