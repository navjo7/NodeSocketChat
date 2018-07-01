const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname,'../public')
const port =  process.env.PORT || 3001;
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log("new user connected",socket.id);
   
    socket.emit('newMessage', generateMessage('Admin', "hey welcome to the group"))
    socket.broadcast.emit('newMessage', generateMessage('Admin ', "new user joined"))

    socket.on('disconnect',()=>{
        console.log(`user ${socket.id} disconnected`)
    })

    socket.on('createMessage',(data)=>{
        console.log("createMessage", data)
        io.emit('newMessage', generateMessage(data.from,data.text))
        // socket.broadcast.emit('newMessage', {
        //     from: data.from,
        //     text: data.text,
        //     createdAt: new Date().getTime()
        // })
    })
  
})


server.listen(port,()=>{
    console.log("listening to",port)
})