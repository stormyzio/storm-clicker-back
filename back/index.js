import express from "express";
import { createServer } from 'node:http'
import { Server } from "socket.io";
import cors from 'cors'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

var counter = 0

app.use(cors({
  origin: '*'
}))

app.get('/add', (req, res) => {
  counter ++
  res.status(200).send(true)
  io.emit('counter', counter)
})

io.on('connection', socket => {
  console.log('[+] user')
})

server.listen(3500, () => {
  console.log('listening')
})