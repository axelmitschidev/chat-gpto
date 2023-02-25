require('dotenv').config()
const path = require('path')

const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const PORT = process.env.SERVER_PORT

app.use('/assets', express.static(path.join(__dirname, './public/assets/')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

io.on('connection', socket => {
    console.log('A user is connected')

    socket.on('chat message', msg => {
        socket.emit('write message', msg)
        socket.broadcast('write message', msg)
    })
})

server.listen(PORT, () => console.log(`Listen on port ${PORT}`))
