var app = app || {};

app.main = (function() {
  console.log('Your code starts here!');

  // Initialize variables
  var username;
  var connected = false;
  var socket = io();

  // All socket listeners go here
  var socketSetup = function(callback){
    // Socket events
    // Whenever the server emits 'login', log the login message
    socket.on('login', function (data) {
      connected = true;
      // Display the welcome message
      log("Welcome to Socket.IO Chat");
      addParticipantsMessage(data);
    });

    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', function (data) {
      addChatMessage(data);
    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', function (data) {
      log(data.username + ' just joined');
      addParticipantsMessage(data);
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', function (data) {
      log(data.username + ' left the conversation');
      addParticipantsMessage(data);
    });

    // Call attachEvents
    callback();
  };

  // Log a message
  var log = function(message) {
    var $el = $('<li>').addClass('log').text(message);
    $('.messages').append($el);
    scrollToTop();
  }

  var scrollToTop = function() {
    $('.messages')[0].scrollTop = $('.messages')[0].scrollHeight;
  }

  var addParticipantsMessage = function(data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "Hmm.. there's no one else in this conversation. Invite them to chat!";
    } else {
      message += "There are " + data.numUsers + " participants";
    }
    log(message);
  }

  // Keyboard events
  var attachEvents = function(){
    $('.usernameInput').keypress(function(e) {
      if (e.keyCode == 13) {
        setUsername();
      }
    });
    $('.inputMessage').keypress(function(e) {
      if (e.keyCode == 13) {
        sendMessage();
      }
    });
  };

  // Sets the client's username
  var setUsername = function() {
    username = $('.usernameInput').val();

    // If the username is valid
    if (username) {
      $('.login.page').fadeOut();
      $('.chat.page').show();
      // Tell the server your username
      socket.emit('add user', username);
    }
  }

  // Sends a chat message
  var sendMessage = function() {
    var message = $('.inputMessage').val();

    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $('.inputMessage').val('');
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
    }
  }

  // Adds the visual chat message to the message list
  var addChatMessage = function(data) {
    var $usernameDiv = $('<span class="username"/>').text(data.username);
    var $messageBodyDiv = $('<span class="messageBody">').text(data.message);

    var $messageDiv = $('<li class="message"/>')
                      .data('username', data.username)
                      .append($usernameDiv, $messageBodyDiv);

    $('.messages').append($messageDiv);
    scrollToTop();
  }


  var init = function(){
    console.log('Initializing app.');
    socketSetup(attachEvents);  // Sending attachEvents as a callback
  };

  return {
    init: init
  };

})();

window.addEventListener('DOMContentLoaded', app.main.init);

// Additional reading: https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/