import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del usuario es requerido'],
        trim: true
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "user"],
            message: 'El rol "{VALUE}" no es válido'
        },
        default: "user"
    },
    email: {
        type: String,
        required: [true, 'El correo del usuario es requerido'],
        trim: true
    }
}, {
    versionKey: false
})

export default mongoose.model('User', userSchema)