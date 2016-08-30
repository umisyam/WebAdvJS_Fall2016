/*------------------------------------------------*/
// Web App - START
// We'll work with Spotify API that returns album thumbnails based on the search keyword.
/*------------------------------------------------*/

var app = app || {};

app.main = (function(){

	console.log('Loading app.');

	var attachEvents = function(){
		console.log('Attaching events.');
	};

	// 2. Let's just try to load some data from the API
	var loadData = function(query){
		console.log('Searching for ' + query + '...');
	};

	// 3. Let's display this data
	var appendData = function(data){
		console.log('Appending data.');
	};

	// 1.
	var init = function(){
		console.log('Initializing app.');
		attachEvents();
	};

	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);

