/*------------------------------------------------*/
// Module Pattern
/*------------------------------------------------*/
// Learn more: http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html


var app = {};
app.main = (function(shared){

	console.log('Starting my app');

	shared.talkToMyWearable();
	shared.blinkBlink();

})(sharedFunctions);