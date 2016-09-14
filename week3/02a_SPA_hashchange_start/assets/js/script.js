
var app = app || {};

app.main = (function() {

	function attachEvents() {

	}

	function render(url) {

	}

	var init = function(){
		console.log('Initializing app.');

	};

	return {
		init: init
	};
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);
