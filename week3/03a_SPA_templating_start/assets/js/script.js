
var app = app || {};

app.main = (function() {
	// Globals variables
	var students = [];	// our main array

	function attachEvents() {
		// For 'About' button
		$('.filters button.abt').click(function (e) {
			e.preventDefault();
			window.location.hash = '#about';
		});
		// For 'Contact' button
		$('.filters button.ctc').click(function (e) {
			e.preventDefault();
			window.location.hash = '#contact';
		});
		// For 'Close (X)' buttons
		$('.close').click(function (e) {
			e.preventDefault();
			window.location.hash = '#';
		});
	}

	function loadData() {
		$.getJSON( "students.json", function( data ) {
			console.log (data);
			// Manually trigger a hashchange to start the app.
			$(window).trigger('hashchange');
		});
	}

	function render(url) {
		// Get the keyword from the url.
		var temp = url.split('/')[0];

		// Hide whatever page is currently shown.
		$('.main-content .page').removeClass('visible');

		var	map = {
			// The "Homepage".
			'': function() {
				console.log("This should be the homepage");
				$('.main-content .all-students').addClass('visible');
			},

			'#about': function() {
				renderAboutPage();
			},

			'#contact': function() {
				renderContactPage();
			}
		};

		// Execute the needed function depending on the url keyword (stored in temp).
		if(map[temp]){
			map[temp]();
		}
		else {
			renderErrorPage();
		}
	}

	function generateAllStudentsHTML(data) {

	}

	function renderAboutPage(){
		var page = $('.about');
		page.addClass('visible');
	}

	function renderContactPage(){
		var page = $('.contact');
		page.addClass('visible');
	}

	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}

	function renderStudentsPage(data){

	}

	function renderSingleProjectPage(index, data){

	}

	var init = function(){
		console.log('Initializing app.');
		attachEvents();

		$(window).on('hashchange', function(){
			// On every hash change the render function is called with the new hash.
			// This is how the navigation of our app happens.
			render(decodeURI(window.location.hash));
		});
	};

	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);
