require('dotenv').config()
const path = require('path')

const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const banned_ips = []
const history_ips = []
let admin_ip = null

const PORT = process.env.SERVER_PORT

app.use('/assets', express.static(path.join(__dirname, './public/assets/')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

io.on('connection', (socket) => {
  if (!history_ips.includes(socket.handshake.address)) {
    history_ips.push(socket.handshake.address)
  }

  socket.on('chat message', (msg) => {
    if (msg.length <= 256 && !banned_ips.includes(socket.handshake.address)) {
      socket.emit('draw message', msg)
      socket.broadcast.emit('draw message', msg)
    }
  })

  socket.on('admin connect', (data) => {
    if (
      data.username === process.env.ADMIN_USERNAME &&
      data.password === process.env.ADMIN_PASSWORD
    ) {
      socket.emit('admin connect', { history_ips, banned_ips })
      admin_ip = socket.handshake.address
    }
  })

  socket.on('ban ip', (ip) => {
    if (socket.handshake.address === admin_ip) {
      banned_ips.push(ip)
    }
  })

  socket.on('unban ip', (ip) => {
    if (socket.handshake.address === admin_ip) {
      const index = banned_ips.findIndex((banned_ip) => banned_ip === ip)
      if (index !== -1) {
        banned_ips.splice(index, 1)
      }
    }
  })

  socket.on('show ips', () => {
    if (socket.handshake.address === admin_ip) {
      socket.emit('admin connect', { history_ips, banned_ips })
    }
  })
})

server.listen(PORT, () => console.log(`Listen on port ${PORT}`))
