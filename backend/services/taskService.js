import mongoose from 'mongoose'

import {
    saveTaskDao,
    getTaskByIdDao,
    getTaskByDateRangeDao,
    getTaskByUserAndDateRangeDao,
    updateTaskDescriptionDao,
    updateTaskStatusDao,
    updateCommentTaskDao,
    deleteCommentTaskDao,
    deleteTaskByUserDao
} from '../daos/taskDao.js'

import { getUserByIdService } from './userService.js'

export const saveTaskService = async (req) => {
    const result = {}

    try {
        const userId = req.body.userId

        // VALIDO QUE EL USUARIO EXISTA (LA VALIDACIÓN DEL ID LA HACE EL GETUSER)
        const userFound = await getUserByIdService(userId)

        if (!userFound.data || userFound.error) {
            result.error = 'El usuario indicado no existe o no se pudo recuperar'
            return result
        }

        if (req.body.description === "") {
            result.error = 'Es necesario ingresar una descripción'
            return result
        }

        // POR DEFECTO EL ESTADO SERÁ SIN COMENZAR
        const newTask = {
            description: req.body.description,
            user: userId,
            date: req.body.date,
            status: "SIN COMENZAR",
        }

        if ("comment" in req.body) {
            newTask.comment = req.body.comment
        }

        const addedTask = await saveTaskDao(newTask)

        result.data = addedTask
        return result
    } catch (error) {
        if (error.errors.name.name === 'ValidatorError') {
            const messages = Object.values(error.errors).map(e => e.message)

            result.error = messages.join(' | ')
            return result
        } else {
            result.error = 'Se produjo un error inesperado'
            return result
        }
    }
}

export const getTaskByDateRangeService = async (req) => {
    const result = {}

    try {
        const { startDate, finalDate } = req.body

        if (startDate == null) {
            result.error = 'La fecha de inicio indicada no es válida'
            return result
        }

        if (finalDate == null) {
            result.error = 'La fecha de fin indicada no es válida'
            return result
        }

        const taskFound = await getTaskByDateRangeDao(startDate, finalDate)

        result.data = taskFound
        return result
    } catch (error) {
        result.error = 'Se produjo un error inesperado'
        return result
    }
}

export const getTaskByUserAndDateRangeService = async () => {
    const result = {}

    try {
        const { userId, startDate, finalDate } = req.body

        if (startDate == null) {
            result.error = 'La fecha de inicio indicada no es válida'
            return result
        }

        if (finalDate == null) {
            result.error = 'La fecha de fin indicada no es válida'
            return result
        }

        // VALIDO QUE EL USUARIO EXISTA (LA VALIDACIÓN DEL ID LA HACE EL GETUSER)
        const userFound = await getUserByIdService(userId)

        if (!userFound.data || userFound.error) {
            result.error = 'El usuario indicado no existe o no se pudo recuperar'
            return result
        }

        const taskFound = await getTaskByUserAndDateRangeDao(userId, startDate, finalDate)

        result.data = taskFound
        return result
    } catch (error) {
        result.error = 'Se produjo un error inesperado'
        return result
    }
}

export const updateTaskDescriptionService = async (req) => {
    const result = {}

    try {
        const taskId = req.params.taskId

        const newDescription = req.body.description

        if (newDescription === "") {
            result.error = 'Es necesario ingresar una descripción'
            return result
        }

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            result.error = 'El identificador de la tarea no es válido'
            return result
        }

        // VALIDO QUE LA TAREA EXISTA
        const taskFound = await getTaskByIdDao(taskId)

        if (taskFound === null) {
            result.error = 'La tarea indicada no existe'
            return result
        }

        if (taskFound === error) {
            result.error = 'Se produjo un error inesperado'
            return result
        }

        const updatedTask = await updateTaskDescriptionDao(taskId, newDescription)

        if (updatedTask.acknowledged === true) {
            if (updatedTask.matchedCount === 1) {
                if (updatedTask.modifiedCount === 1) {
                    result.message = 'Se modificó la tarea correctamente'
                    return result
                } else {
                    result.error = 'La descripción de la tarea es idéntica la existente'
                    return result
                }
            } else {
                result.error = 'No se encontró la tarea a modificar'
                return result
            }
        } else {
            result.error = 'Se produjo un error al intentar modificar la tarea'
            return result
        }
    } catch (error) {
        if (error.errors.name.name === 'ValidatorError') {
            const messages = Object.values(error.errors).map(e => e.message)

            result.error = messages.join(' | ')
            return result
        } else {
            result.error = 'Se produjo un error inesperado'
            return result
        }
    }
}

export const updateTaskStatusService = async (req) => {
    const result = {}

    try {
        const taskId = req.params.taskId

        const newStatus = req.body.status.toUpperCase()

        if (newStatus !== "SIN COMENZAR" || newStatus !== "PENDIENTE" || newStatus !== "EN CURSO" || newStatus !== "FINALIZADA" || newStatus !== "DESESTIMADA") {
            result.error = 'El nuevo estado asignado no es válido'
            return result
        }

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            result.error = 'El identificador de la tarea no es válido'
            return result
        }

        // VALIDO QUE LA TAREA EXISTA
        const taskFound = await getTaskByIdDao(taskId)

        if (taskFound === null) {
            result.error = 'La tarea indicada no existe'
            return result
        }

        if (taskFound === error) {
            result.error = 'Se produjo un error inesperado'
            return result
        }

        const updatedTask = await updateTaskStatusDao(taskId, newStatus)

        if (updatedTask.acknowledged === true) {
            if (updatedTask.matchedCount === 1) {
                if (updatedTask.modifiedCount === 1) {
                    result.message = 'Se modificó el estado de la tarea correctamente'
                    return result
                } else {
                    result.error = 'El estado de la tarea es idéntico al actual'
                    return result
                }
            } else {
                result.error = 'No se encontró la tarea a modificar'
                return result
            }
        } else {
            result.error = 'Se produjo un error al intentar modificar el estado de la tarea'
            return result
        }
    } catch (error) {
        if (error.errors.name.name === 'ValidatorError') {
            const messages = Object.values(error.errors).map(e => e.message)

            result.error = messages.join(' | ')
            return result
        } else {
            result.error = 'Se produjo un error inesperado'
            return result
        }
    }
}

export const updateCommentTaskService = async (req) => {
    const result = {}

    try {
        const taskId = req.params.taskId

        const newComment = req.body.comment

        if (newComment === "") {
            result.error = 'El comentario no puede ser vacío'
            return result
        }

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            result.error = 'El identificador de la tarea no es válido'
            return result
        }

        // VALIDO QUE LA TAREA EXISTA
        const taskFound = await getTaskByIdDao(taskId)

        if (taskFound === null) {
            result.error = 'La tarea indicada no existe'
            return result
        }

        if (taskFound === error) {
            result.error = 'Se produjo un error inesperado'
            return result
        }

        const updatedTask = await updateCommentTaskDao(taskId, newComment)

        if (updatedTask.acknowledged === true) {
            if (updatedTask.matchedCount === 1) {
                if (updatedTask.modifiedCount === 1) {
                    result.message = 'El comentario de la tarea fue modificado correctamente'
                    return result
                } else {
                    result.error = 'El comentario de la tarea es idéntico al actual'
                    return result
                }
            } else {
                result.error = 'No se encontró la tarea a modificar'
                return result
            }
        } else {
            result.error = 'Se produjo un error al intentar modificar el comentario de la tarea'
            return result
        }
    } catch (error) {
        if (error.errors.name.name === 'ValidatorError') {
            const messages = Object.values(error.errors).map(e => e.message)

            result.error = messages.join(' | ')
            return result
        } else {
            result.error = 'Se produjo un error inesperado'
            return result
        }
    }
}

export const deleteCommentTaskService = async () => {
    const result = {}

    try {
        const taskId = req.params.taskId

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            result.error = 'El identificador de la tarea no es válido'
            return result
        }

        // VALIDO QUE LA TAREA EXISTA Y QUE TENGA UN COMENTARIO
        const taskFound = await getTaskByIdDao(taskId)

        if (taskFound === null) {
            result.error = 'La tarea indicada no existe'
            return result
        }

        if (taskFound === error) {
            result.error = 'Se produjo un error inesperado'
            return result
        }

        if (taskFound.comment == null) {
            result.error = 'La tarea no tiene un comentario a eliminar'
            return result
        }

        const taskUpdated = await deleteCommentTaskDao(taskId)

        result.data = taskUpdated
        return result
    } catch (error) {
        if (error.errors.name.name === 'ValidatorError') {
            const messages = Object.values(error.errors).map(e => e.message)

            result.error = messages.join(' | ')
            return result
        } else {
            result.error = 'Se produjo un error inesperado'
            return result
        }
    }
}

export const deleteTaskByUserService = async (userId) => {
    const result = {}

    try {
        // VALIDO QUE EL USUARIO EXISTA (LA VALIDACIÓN DEL ID LA HACE EL GETUSER)
        const userFound = await getUserByIdService(userId)

        if (!userFound.data || userFound.error) {
            result.error = 'El usuario indicado no existe o no se pudo recuperar'
            return result
        }

        const deletedTask = await deleteTaskByUserDao(userId)

        result.data = deletedTask
        return result
    } catch (error) {
        if (error.errors.name.name === 'ValidatorError') {
            const messages = Object.values(error.errors).map(e => e.message)

            result.error = messages.join(' | ')
            return result
        } else {
            result.error = 'Se produjo un error inesperado'
            return result
        }
    }
}