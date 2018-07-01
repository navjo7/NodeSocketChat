var socket = io();
socket.on('connect', function () {
    console.log("Connected to the server");
});
socket.on('disconnect', function () {
    console.log("Disconnected from the server");
});

socket.on('newMessage', function (data) {
    console.log("new message",data);
    var li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text} `)
    jQuery('#messages').append(li)
});

// socket.emit('createMessage',  {
//     from : "nani ji",
//     text: "ki hal hai putti"
// },function(data){
//     console.log(data)
// });

jQuery('#chatForm').on('submit',function(e){
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(err){
        console.log(err)
    });
});

var locationButton = jQuery('#sendLocation');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert("turn on the location")
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        console.log(position)
    },function(err){
        alert('unable to fetch the location')
    })
})