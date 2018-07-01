var socket = io();
socket.on('connect', function () {
    console.log("Connected to the server");
});
socket.on('disconnect', function () {
    console.log("Disconnected from the server");
});

socket.on('newMessage', function (data) {
    console.log("new message",data);
});

socket.emit('createMessage',  {
    from : "nani ji",
    text: "ki hal hai putti"
},function(data){
    console.log(data)
});
