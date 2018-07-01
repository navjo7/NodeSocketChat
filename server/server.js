const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname,'../public')
const port =  process.env.PORT || 3001;
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log("new user connected",socket.id);
   
    socket.on('disconnect',()=>{
        console.log(`user ${socket.id} disconnected`)
    })

    socket.on('createMessage',(data)=>{
        console.log("createMessage", data)
    })
    socket.emit('newMessage',{
        from: 'God',
        text: "bless you",
        createdAt: 123
    })
})


server.listen(port,()=>{
    console.log("listening to",port)
})