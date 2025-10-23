import mongoose from 'mongoose'

import {
    saveUserDao,
    getUserByIdDao,
    getAllUserDao,
    updateUserEmailDao,
    deleteUserDao
} from '../daos/userDao.js'

import { deleteTaskByUserService } from './taskService.js'

export const saveUserService = async (req) => {
    const result = {}

    try {
        // VALIDO QUE EL NOMBRE DEL USUARIO NO ESTÉ VACÍO
        if (req.body.user.trim() === "") {
            result.error = 'El nombre del usuario no puede estar vacío'
            return result
        }

        const userName = req.body.user
        const role = req.body.role

        const newUser = { userName, role }

        const addedUser = await saveUserDao(newUser)

        result.data = addedUser
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

export const getUserByIdService = async (userId) => {
    const result = {}

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            result.error = 'El identificador del usuario indicado no es válido'
            return result
        }

        const userFound = await getUserByIdDao(userId)

        result.data = userFound
        return result
    } catch (error) {
        result.error = 'Se produjo un error inesperado'
        return result
    }
}

export const getAllUserService = async () => {
    const result = {}

    try {
        const allUsers = await getAllUserDao()

        result.data = allUsers
        return result
    } catch (error) {
        result.error = 'Se produjo un error inesperado'
        return result
    }
}

export const updateUserEmailService = async (req) => {
    const result = {}

    try {
        const userId = req.params.userId
        const newEmail = req.body.newEmail

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            result.error = 'El identificador del usuario indicado no es válido'
            return result
        }

        const userFound = await getUserByIdDao(userId)

        if (userFound == null) {
            result.error = 'El usuario indicado no existe o no se pudo recuperar'
            return result
        }

        const updatedEmail = await updateUserEmailDao(userId, newEmail)

        // LA OPERACIÓN DEL SCHEMA DE MONGOOSE ES updateOne, POR LO QUE SE EVALÚA EL RESULTADO
        if (updatedEmail.acknowledged === true) {
            if (updatedEmail.matchedCount === 1) {
                if (updatedEmail.modifiedCount === 1) {
                    result.message = 'El email del usuario fue modificado correctamente'
                    return result
                } else {
                    result.error = 'El nuevo email es idéntico al ya existente'
                    return result
                }
            } else {
                result.error = 'No se encontró un usuario a modificar'
                return result
            }
        } else {
            result.error = 'Se produjo un error al intentar modificar el email del usuario'
            return result
        }
    } catch (error) {
        result.error = 'Se produjo un error inesperado'
        return result
    }
}

export const deleteUserService = async (req) => {
    const result = {}

    try {
        const userId = req.params.userId

        // VALIDO QUE EL USUARIO EXISTA (LA VALIDACIÓN DEL ID LA HACE EL GETUSER)
        const userFound = await getUserByIdService(userId)

        if (!userFound.data || userFound.error) {
            result.error = 'El usuario indicado no existe o no se pudo recuperar'
            return result
        }

        // ANTES DE ELIMINAR AL USUARIO, BORRO SUS TAREAS
        const deletedTask = await deleteTaskByUserService(userId)

        // SI PROCESÓ CON ERRORES O SE RECHAZÓ EL DELETE, EL VALOR ES FALSO, ENTOCES TIRO UN ERROR
        if (deletedTask.acknowledged == false) {
            result.error = 'Se produjo un error al intentar eliminar las tareas vinculadas al usuario'
            return error
        }

        // SI BORRÉ LAS TAREAS O PUDE AL MENOS PROCESAR OK, ELIMINO AL USUARIO
        const deletedUser = await deleteUserDao(userId)

        result.data = deletedUser
        return result
    } catch (error) {
        result.error = 'Se produjo un error inesperado'
        return result
    }
}