var socket = io.connect(),
person = document.getElementById('person'),
button = document.getElementById('btn'),
output = document.getElementById('context'),
message = document.getElementById('txt'),
feed = document.getElementById('feedback');


/*function sendMsg() {
var data = message.value;
message.value = "";
socket.emit('chat',data);  
}*/


button.addEventListener('click', function () {
if(message.value === "" || person.value === ""){
   return false;
}
socket.emit('chat',{
   message : message.value,
   person : person.value
});
message.value = "";
person.disabled = 'disabled';
});

socket.on('chatt', function (data) {
feed.innerHTML = "";
output.innerHTML += '<p><strong>' + data.person + ': </strong>' + '<span id="msg">' + data.message + '</span></p>';
});

message.addEventListener('keypress', function () {
socket.emit('typing', person.value);
});

socket.on('typing', function (data) {
feed.innerHTML = '<p><em>'+ data + ' is typing message...</em></p>';
});

