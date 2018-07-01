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
   
    socket.emit('newMessage',{
        from: 'Admin',
        text: "hey welcome to the group",
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: "new user joined",
        createdAt: new Date().getTime()
    })

    socket.on('disconnect',()=>{
        console.log(`user ${socket.id} disconnected`)
    })

    socket.on('createMessage',(data)=>{
        console.log("createMessage", data)
        io.emit('newMessage',{
            from: data.from,
            text: data.text,
            createdAt: new Date().getTime()
        })
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