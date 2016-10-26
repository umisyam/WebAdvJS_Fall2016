var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	// event listener for our text box
	var attachEvents = function(){
		$('#msg-box').keypress(function(e) {
			if (e.keyCode == 13) {
				// when user hit enter, do something

			}
		});
	};

	var init = function(){
		console.log('Initializing app.');
		// do something
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);