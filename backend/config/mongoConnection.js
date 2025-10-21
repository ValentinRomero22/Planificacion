import mongoose from "mongoose"

import { MONGO_CONNECTION, DATA_BASE } from "./appConfig.js"

export const mongoConnect = () => {
    mongoose.connect(MONGO_CONNECTION, {
        dbName: DATA_BASE
    })
        .then(() => console.log('Conectado a la base de datos'))
        .catch(() => console.log('Error al intentar conectarse a la base de datos'))
}