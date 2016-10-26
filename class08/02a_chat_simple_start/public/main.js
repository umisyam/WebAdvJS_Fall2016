var app = app || {};

app.main = (function() {
  console.log('Your code starts here!');

  // Initialize variables
  var socket = io();

  // All socket listeners go here
  var socketSetup = function(callback){
    // Socket events


    // Call attachEvents
    callback();
  };

  // Keyboard events
  var attachEvents = function(){

  };

  var init = function(){
    console.log('Initializing app.');
    socketSetup(attachEvents);  // Sending attachEvents as a callback
  };

  return {
    init: init
  };

})();

window.addEventListener('DOMContentLoaded', app.main.init);