const express = require('express')
const socket = require('socket.io')

const app = express()
const server = app.listen(90)

app.use(express.static('src'))

const io = socket(server)

io.on('connection', (socket) => {
    console.log('yeni bağlantı: ' + socket.id)

    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing',data)
    })
})
