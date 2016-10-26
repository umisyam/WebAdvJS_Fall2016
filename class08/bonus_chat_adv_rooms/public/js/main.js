/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var socket;

	// connect to socket server
	var socketSetup = function(callback){
		console.log('Called socketStart.');
	    socket = io.connect();

	    // Listeners
	    // We requested something through loadData
	    // Here we'll listen to the data that comes back
	    // and call the render()
        socket.on('room-list', function(res) {
            console.log(res);
            render('lobby', '#main-container', 'replace', res.rooms);
        });
        socket.on('joined-room', function(res) {
            console.log(res);
            render('room', '#main-container', 'replace', res.room);
        });
        socket.on('msg-to-clients', function(res) {
            console.log(res);
            render('chat-item', '#chat-container', 'append', {
            	timestamp: moment().format('hh:mm a'),
                msg: res.msg
            });
        });        
	}

	// Remember this one? Straight from our lesson #3
    var hashRouter = function(){
		$(window).off('hashchange').on('hashchange', function() {
	    	var currentPage = location.hash.substring(2, location.hash.length);
	        console.log('Current hash is ' + currentPage);
	        
	        // Lobby
	        if(currentPage === 'lobby'){
	        	loadData(currentPage);	

	        // Rooms
	        }else if(currentPage.indexOf('/') > -1){
	        	roomId = currentPage.substring(currentPage.indexOf('/') + 1);
	        	currentPage = currentPage.substring(0, currentPage.indexOf('/'));
	        	console.log('Current Page: ' + currentPage);
	        	console.log('Room Id: ' + roomId);
	        	loadData(currentPage, roomId);
	        }
	    });
	}

	// Any change to our hash will trigger this,
	// which will ask for some data from the server
	var loadData = function(template, data){
		console.log('Loading data for: ' + template);
		if(data !== undefined){
			console.log('Data: ' + data);
		}
		//---> THIS IS NEW!!!
		// We'll make a request to the server for some route
		// and render the template only when the answer comes
		socket.emit(template, data);
	};

	// This is also from lesson #3, just adding some parameters:
	//  
	var render = function(template, containerElement, method, data){
		console.log(method + ' ' + template + ' in ' + containerElement);
		if(data !== undefined){
			console.log(data);
		}

		// Load the template from the html file
		var templateToCompile = $('#tpl-' + template).html();

		// Attach the template to the underscore function
		var compiled =  _.template(templateToCompile);

		// Send the data and display the result
		if(method === 'replace'){
			$(containerElement).html(compiled({data: data}));	
		}else if(method === 'append'){
			$(containerElement).append(compiled({data: data}));
		}

		// $('#main-container').css('scrollHeight', '';
		var objDiv = document.getElementById("main-container");
		objDiv.scrollTop = objDiv.scrollHeight;

        // We've just created some new elements,
        // so let's attach the events to them
        attachEvents();
	};

	var attachEvents = function(){
		console.log('Called attachEvents.');

        // new room submit
        $('#js-btn-create-room').off('click').on('click', function() {
      		console.log('Create room.');
      		createRoom();
        });

        // new msg submit
        $('#js-btn-send').off('click').on('click', function() {
        	sendMessage();
        });

		$('#js-ipt-text').unbind('keypress').keypress(function(e) {
			if (e.keyCode == 13) {
				sendMessage();
			}
		});        
	};

	var createRoom = function(){
  		var roomName = $('#js-ipt-room-name').val();
  		if(roomName.length > 0){
        	socket.emit('create-room', roomName);
  		}		
	}	

	var sendMessage = function(){
		if(location.hash.indexOf('room') > -1){
	        // Store input value in var char_msg
	        var chat_msg = $('#js-ipt-text').val();

	        /* Check input string with regex (regular expression)
	    	http://www.regexr.com/ */
	        var re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
	        var isScript;
	        isScript = re.test(chat_msg);
	        // console.log(isScript);
	        if(!isScript){
	            console.log('Sending: ' + chat_msg);
	            socket.emit('msg-to-server', chat_msg);
	        }
	        // Reset input field
	        $('#js-ipt-text').val('');
		}
	}

	var init = function(){
		
		console.log('Initializing app.');
		
		hashRouter();
		socketSetup();
		attachEvents();
		location.hash = '/lobby';
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);