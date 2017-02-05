/* globals Typer */
/* jshint latedef: nofunc*/
'use strict';
<<<<<<< HEAD
window.onload = function() {

  var title = $('title').text();
  if (title.includes('Archives')) {

    $("#reposis").loadRepositories("TJDevClub", -1);
  } else {
    var typer = new Typer(document.querySelector('.computer'));
    typer.addText('dev -hi');
    typer.newLine();
    typer.addText('Welcome to Dev Club...');
    typer.newLine();
    typer.addText('We make cool stuff.');
    typer.newLine();
    typer.addHtml('<a class="button join-us" href="./#join"> Join Us </a>');
    typer.type();

    document.querySelector('.burger-container').addEventListener('click', function() {
      console.log('hi');
      this.querySelector('.burger').classList.toggle('x');
=======
window.onload = function () {
    jQuery(function() {
      	jQuery("#reposis").loadRepositories("TJDevClub");
    });

    var typer = new Typer(document.querySelector('.computer'));
    typer.addText('dev -hi');
	typer.newLine();
	typer.addText('Welcome to Dev Club...');
	typer.newLine();
	typer.addText('We make cool stuff.');
	typer.newLine();
	typer.addHtml('<a class="button join-us" href="./#join"> Join Us </a>');
	typer.type();
>>>>>>> upstream/master

      document.querySelector('nav').classList.toggle('visible');
    });

    var navButtons = document.querySelectorAll('nav > ul > li > a');
    for (var i = navButtons.length - 1; i >= 0; i--) {
      navButtons.item(i).addEventListener('click', closeNav);
    }
    $("#reposis").loadRepositories("TJDevClub", 4);
  }
  //$("#reposis").loadRepositories("TJDevClub", 4);

};

<<<<<<< HEAD
function closeNav() {
  document.querySelector('nav').classList.remove('visible');
  document.querySelector('.burger').classList.remove('x');
}
=======
function closeNav () {
	document.querySelector('nav').classList.remove('visible');
	document.querySelector('.burger').classList.remove('x');
}
>>>>>>> upstream/master
