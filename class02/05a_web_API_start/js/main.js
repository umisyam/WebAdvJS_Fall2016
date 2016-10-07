/*------------------------------------------------*/
// Web App - START
// We'll work with Spotify API that returns album thumbnails based on the search keyword.
/*------------------------------------------------*/

var app = app || {};
// No, wait! That's a bit different than what we've done before!
// What we're doing is checking if some other JS file
// has already created an app object.
// If so, we'll work with it (var app = app) and add properties to it.
// If not, let's create an empty one (var app = {});
// This is also known as Basic “short circuting” with || (Logical OR)
// Read more: http://javascriptissexy.com/12-simple-yet-powerful-javascript-tips/
//
// if (!app) {
// 	app = {};
// }

app.main = (function(){

	console.log('Loading app.');

	var attachEvents = function(){
		console.log('Attaching events.');
		// document.getElementById('search-button').addEventListener("click", function() {
		// 	console.log(document.getElementById('search-box').value);
		// });

		$('#search-button').on('click', function() {
			console.log($('#search-box').val());
			loadData($('#search-box').val());
		})
		$('#search-box').keypress(function(e) {
			if (e.keyCode == 13) {
				loadData($('#search-box').val());
			}
		})
	};

	// 2. Let's just try to load some data from the API
	var loadData = function(query){
		console.log('Searching for ' + query + '...');

		$.ajax ({
			url: 'https://api.spotify.com/v1/search',
			data: {
				q: query,
				type: 'album',
				limit: 50,
				offset: 10
			},
			success: function(response) {
				console.log(response);
				var results = response.albums.items;
				appendData(results);
			}
		});
	};

	// 3. Let's display this data
	var appendData = function(data){
		console.log('Appending data.');

		$('#view').empty();

		$('html, body').animate({
			scrollTop: $('#view').offset().top + 'px'
		}, 'slow');

		for (var i=0; i<data.length; i++) {
			$('#view').append('<img src="' + data[i].images[1].url + '" class="gallery-item" />');
		}
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

