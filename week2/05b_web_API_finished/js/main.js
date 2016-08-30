/*------------------------------------------------*/
// Web App - FINISHED
// We'll work with Spotify API that returns album thumbnails based on the search keyword.
/*------------------------------------------------*/

var app = app || {};
// No, wait! That's a bit different than what we've done before!
// What we're doing is checking if some other JS file
// has already created an app object.
// If so, we'll work with it (var app = app) and add properties to it.
// If not, let's create an empty one (var app = {});

app.main = (function(){

	console.log('Loading app.');

	// 1. We'll put all our event listeners here,
	// that is, all code related to some interactive element on the page
	var attachEvents = function(){

		console.log('Attaching events.');

		/*
		// This is the vanilla JS way of doing things:
		document.getElementById('search-button').addEventListener("click", function(){
			console.log(document.getElementById('search-box').value);
		});

		// This is the JQuery equivalent.
		// Besides being shorter, we can use CSS selectors
		// instead of learning a different syntax
		// See more at: http://www.sitepoint.com/jquery-vs-raw-javascript-1-dom-forms/
		$('#search-button').on('click', function(){
			console.log($('#search-box').val());
		});
		*/

		// It's recommended to REMOVE the events before adding. Why?
		// We might call this function again as we create new elements.
		// When we do so, we don't want to duplicate events in existing objects.
		$('#search-button').off('click').on('click', function(){
			loadData($('#search-box').val());
		});

		$('#search-box').keypress(function(e) {
			if (e.keyCode == 13) {
				loadData($('#search-box').val());
			}
		});
	};

	// 2. Let's just try to load some data from the API
	var loadData = function(query){
		console.log('Searching for ' + query + '...');
		// This is an AJAX function that JQuery is helping us to access Spotify Web API
	    $.ajax({
	        url: 'https://api.spotify.com/v1/search',
	        data: {
	            q: query,
	            type: 'album',
	            limit: 50,
	            offset: 10
	        },
	        success: function (response) {
	            // console.log(response);
	            // Take a look into the data structure.
				// The results are encapsulated into albums > items
				var results = response.albums.items;
				console.log('Found ' + results.length + ' results.');

				appendData(results);
	        }
	    });

	};

	// 3. Let's display this data
	var appendData = function(data){
		console.log('Appending data.');
		console.log(data);

		// 5. What happens if we search for something again?
		// Let's clean up the results so we don't mess things up
		$('#view').empty();

		// 6. BONUS! Let's scroll
		$('html, body').animate({
            scrollTop: $('#view').offset().top + 'px'
        }, 'slow');

		// 3.
		for(var i = 0; i < data.length; i++){
			$('#view').append('<img src="' + data[i].images[1].url + '" class="gallery-item"/>');
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
