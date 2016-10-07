
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
		$.getJSON( "../students.json", function( data ) {
			// Write the data into our global variable.
			students = data;

			// Call a function to create HTML for all the students.
			generateAllStudentsHTML(students);

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
				renderStudentsPage(students);
			},

			'#about': function() {
				renderAboutPage();
			},

			'#contact': function() {
				renderContactPage();
			},

			// Single student's project page.
			'#project': function() {
				// Get the index of which product we want to show and call the appropriate function.
				var index = url.split('#project/')[1].trim();
				renderSingleProjectPage(index, students);
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

	/*------------------------------------------------*/
	// This fills up the students list via a handlebars template.
	// It receives one parameter - the data we took from students.json.
	/*------------------------------------------------*/
	function generateAllStudentsHTML(data) {

		var list = $('.all-students .students-list');

		var source = $("#students-template").html();
		//Compile the template​
		var template = Handlebars.compile(source);
		list.append (template(data));

		// Each students has a data-index attribute.
		// On click change the url hash to open up a preview for this product only.
		// Remember: every hashchange triggers the render function.
		list.find('li').on('click', function (e) {
			e.preventDefault();
			var studentIndex = $(this).data('index');
			window.location.hash = 'project/' + studentIndex;
		})
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

	/*------------------------------------------------*/
	// Iterate through the students object & Make the students page visible
	/*------------------------------------------------*/
	function renderStudentsPage(data){

		var page = $('.all-students'),
			allStudents = $('.all-students .students-list > li');

		// Hide all the students in the students list.
		allStudents.addClass('hidden');

		// Iterate over all of the students.
		// If their ID is somewhere in the data object remove the hidden class to reveal them.
		allStudents.each(function () {

			var that = $(this);

			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});

		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');
	}


	/*------------------------------------------------*/
	// Pop-up the project detail
	/*------------------------------------------------*/
	// Its parameters are an index from the hash and the students object.
	function renderSingleProjectPage(index, data){
		var page = $('.single-project'),
			container = $('.popup-detail');

		// Find the wanted product by iterating the data object and searching for the chosen index.
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					// Populate '.popup-detail' with the chosen product's data.
					container.find('h3').text(item.project.title);
					container.find('h4').text(item.project.blurb);
					container.find('img').attr('src', item.project.image);
					container.find('p').text(item.project.description);
				}
			});
		}

		// Show the page.
		page.addClass('visible');

	}

	var init = function(){
		console.log('Initializing app.');
		attachEvents();
		loadData();

		// An event handler with calls the render function on every hashchange.
		// The render function will show the appropriate content of out page.
		$(window).on('hashchange', function(){
			render(decodeURI(window.location.hash));
		});
	};

	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);
