jQuery.githubUser = function(username, callback) {
  jQuery.getJSON('https://api.github.com/users/' + username + '/repos?callback=?', callback)
}
<<<<<<< HEAD

jQuery.fn.loadRepositories = function(username, maxCount) {
  this.html("<span>Querying GitHub for " + username + "'s repositories...</span>"); //Should only exist while loading

  var target = this;
  $.githubUser(username, function(data) {
    let repos = data.data; // JSON Parsing
    //console.log(repos)

    sortByName(repos); //Puts them in date-order

    let list = $('<div/>');
    let counter = 0;
    target.empty().append(list);
    $(repos).each(function() {
      let description = this.description;
      if (!description) {
        description = " ";
      }
      const utDescription = encodeURI(description);
      if (!utDescription.includes("%F0%9F%8D%A0")) { //Not presentations
        counter += 1;
        if (maxCount == -1 || counter <= maxCount) { //Appending four lectures
          if (this.name != (username.toLowerCase() + '.github.com')) {
            const date = this.updated_at.split('-');
            const year = date[0];
            const month = date[1];
            const theRest = date[2].split('T');
            const day = theRest[0];
            const str = '<li class="lecture-item">' + '<a href="' + (this.homepage ? this.homepage : this.html_url) + '">' + '<div class="lecture-title">' + month + '-' + day + '-' + year + ': ' + this.name + '</div>' + '<div class="lecture-presenter">' + description + '</div>' + '</a>'
            $('#reposis').append(str); //Append html and data
          }
        }
      }
    });
  });

  function sortByName(repos) {
    repos.sort(function(a, b) {
      return b.updated_at.localeCompare(a.updated_at); //Compare when last updated (first is most recent)
    });
  }
};
=======
 
jQuery.fn.loadRepositories = function(username) {
    console.log('hasldkghasdflkasdh');
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>"); //Should only exist while loading
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos); //Puts them in date-order
     
        var list = $('<div/>');
		var counter = 0;
        target.empty().append(list);
        $(repos).each(function() {
            let description = this.description;
			if (!description.includes('🍠')){ //Not presentations
			counter+=1;
			if (counter <=4){ //Appending four lectures
            if (this.name != (username.toLowerCase()+'.github.com')) {
                var date = this.updated_at.split('-');
				var year = date[0];
				var month = date[1];
				var theRest = date[2].split('T');
				var day = theRest[0];
				var str = '<li class="lecture-item">' + '<a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + '<div class="lecture-title">'+month+'-' + day+'-' + year + ': ' + this.name + '</div>' + '<div class="lecture-presenter">' + this.description +'</div>'+ '</a>'
				$('#reposis').append(str); //Append html and data
            }}
			}
        });      
      });
      
    function sortByName(repos) {
        repos.sort(function(a,b) {
			return b.updated_at.localeCompare(a.updated_at); //Compare when last updated (first is most recent)
       });
    }
};
>>>>>>> upstream/master
