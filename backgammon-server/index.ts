import { createServer } from 'http'
import { Server } from 'socket.io'
import { EMITTERES } from './enum'
const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

io.on(EMITTERES.CONNECTION, (socket) => {
    console.log("hello")
    
} )