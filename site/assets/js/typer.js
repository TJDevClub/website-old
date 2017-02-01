/* exported Typer */
 class Typer {
 	constructor (el, time) {
 		this.el = el;
 		this.time = time || 100;
 		this.message = [];
 		this.typing = false;

 		this.type = this.type.bind(this);
 		this.recur = this.recur.bind(this);
 		this.put = this.put.bind(this);
 		this.addText = this.addText.bind(this);
 		this.addHtml = this.addHtml.bind(this);
 		this.newLine = this.newLine.bind(this);

 		this.el.innerHTML = 'devclub ~ $ ';
 	}

 	addText (text) {
 		this.message = this.message.concat(text.split(''));
 	}

 	addHtml (html) {
 		this.message.push(html);
	}

	newLine () {
		this.message.push('<br/><br/>');
	}

 	type () {
 		this.typing = true;
 		window.setTimeout(this.recur, this.time);
 	}

 	put (message) {
 		this.el.innerHTML += message;
 	}

 	recur () {
 		this.el.innerHTML += this.message.shift();
  		if (this.message.length > 0)
 			window.setTimeout(this.recur.bind(this), this.time);
 		else {
 			this.typing = false;
 		}
 	}
 }