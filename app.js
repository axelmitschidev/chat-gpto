require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.SERVER_PORT

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => console.log(`Listen on port ${PORT}`))
