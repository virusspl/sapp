var stompClient = null;

function setConnected(connected) {
	$("#name").prop("disabled", connected);
	$("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/chat-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (greeting) {
            showMessage(JSON.parse(greeting.body).content);
        });
        stompClient.subscribe('/topic/users', function (greeting) {
            showMessage(JSON.parse(greeting.body).content);
        });
        stompClient.send("/app/login", {}, JSON.stringify({'name': $("#name").val()}));
    });
   
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
	stompClient.send("/app/messages", {}, JSON.stringify({
		'sender' : $("#name").val(),
		'content' : $("#message").val()
	}));
}

function showMessage(message) {
	$("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendMessage(); });
});



	