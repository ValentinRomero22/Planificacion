import dotenv from 'dotenv'

dotenv.config({
    path: '.env.development'
})

const PORT = process.env.PORT || 8080
const MONGO_CONNECTION = process.env.MONGO_CONNECTION
const DATA_BASE = process.env.DATA_BASE

export { PORT, MONGO_CONNECTION, DATA_BASE }