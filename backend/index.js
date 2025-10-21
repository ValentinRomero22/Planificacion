import express from 'express'
import { createServer } from 'http'

import cors from 'cors'

import { PORT } from './config/appConfig.js'

import { mongoConnect } from './config/mongoConnection.js'
import { create } from 'domain'

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3001',
    'http://urlUnaVezQueEsteEnProduccion'
]

app.use(cors({
    origin: allowedOrigins,
    credentials: false
}))

const httpServer = createServer(app)

mongoConnect()

/* app.use('/api/')
app.use('/api/')
app.use('/api/') */

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
httpServer.on('error', () => console.log('Error al levantar el servidor'))