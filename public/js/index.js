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
socket.on('newLocationMessage', function (data) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>')
    li.text(`${data.from}: `)
    a.attr('href',data.url)
    li.append(a)
    jQuery('#messages').append(li)
});


jQuery('#message-Form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]')

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('')

    });
});

var locationButton = jQuery('#sendLocation');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert("turn on the location")
    }

    locationButton.attr('disabled','disabled').text('sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location')
        socket.emit('createLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        console.log(position)
    },function(err){
        locationButton.removeAttr('disabled').text('Send Location')
        alert('unable to fetch the location')
    })
})