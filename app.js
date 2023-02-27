const SocketAntiSpam  = require('socket-anti-spam')

require('dotenv').config()
const path = require('path')

const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const PORT = process.env.SERVER_PORT

const socketAntiSpam = new SocketAntiSpam({
    banTime:            30,         // Ban time in minutes
    kickThreshold:      2,          // User gets kicked after this many spam score
    kickTimesBeforeBan: 1,          // User gets banned after this many kicks
    banning:            true,       // Uses temp IP banning after kickTimesBeforeBan
    io:                 socket-io,  // Bind the socket.io variable
    redis:              client,      // Redis client if you are sharing multiple servers
  })




app.use('/assets', express.static(path.join(__dirname, './public/assets/')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

io.on('connection', socket => {
    console.log('A user is connected')

    socket.on('chat message', msg => {
        socket.emit('draw message', msg)
        socket.broadcast.emit('draw message', msg)
    })
})

server.listen(PORT, () => console.log(`Listen on port ${PORT}`))
