var app = app || {};

app.main = (function() {
  console.log('Your code starts here!');

  // Initialize variables
  var socket = io();
  var username;
  var connected = false;

  // All socket listeners go here
  var socketSetup = function(callback){
    // Socket events
    socket.on('login', function(data) {
      connected = true;
      log('Welcome to our Class chatroom!');
      addParticipantsMessage(data);
    })

    socket.on('user joined', function(data) {
      log(data.username + ' just joined');
      addParticipantsMessage(data);
    });

    // Call attachEvents
    callback();
  };


  var addParticipantsMessage = function(data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "oh no you're alone. invite others to chat!";
    } else {
      message += "There are " + data.numUsers + " participants.";
    }
    log(message);
  }

  // Log a message
  var log = function(message) {
    var $el = $('<li>').addClass('log').text(message);
    $('.messages').append($el);
    scrollToTop();
  }


  // Keyboard events
  var attachEvents = function(){
    $('.usernameInput').keypress(function(e) {
      if (e.keyCode == 13) {
        username = $('.usernameInput').val();

        if (username) {
          $('.login.page').fadeOut();
          $('.chat.page').show();
          // tell the server your username
          socket.emit('add user', username);
        }
      }
    })

    $('.inputMessage').keypress(function(e) {
      if (e.keyCode == 13) {
        var message = $('.inputMessage').val();

        if (message && connected) {
          $('.inputMessage').val('');
          // display the chat message to our <ul>
          addChatMessage( {
            username: username,
            message: message
          } );

          socket.emit('new message', message);
        }

      }
    })

  };

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

  var scrollToTop = function() {
    $('.messages')[0].scrollTop = $('.messages')[0].scrollHeight;
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