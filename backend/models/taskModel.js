import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Es necesario ingresar la descipción de la tarea'],
        trim: true
    },
    user: {
        user: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Es necesario vincular un usuario a la tarea']
    },
    date: {
        type: Date,
        required: [true, 'Es necesario ingresar la fecha de la tarea']
    },
    status: {
        type: String,
        enum: {
            values: ['SIN COMENZAR', 'PENDIENTE', 'EN CURSO', 'FINALIZADA', 'DESESTIMADA'],
            message: 'El estado {VALUE} definido para la tarea no es válido'
        },
        default: 'SIN COMENZAR'
    },
    comment: {
        type: String,
        trim: true
    }
}, {
    versionKey: false
})

export default mongoose.model('Task', taskSchema)