import {
    saveUserService,
    getUserByIdService,
    getAllUserService,
    updateUserEmailService,
    deleteUserService
} from '../services/userService.js'

export const saveUserController = async (req, res) => {
    try {
        const result = await saveUserService(req)

        if (result.data) {
            return res.status(201).json({
                statusCode: 201,
                message: 'Usuario creado correctamente',
                data: result.data
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: result.error
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

export const getUserByIdController = async (req, res) => {
    try {
        const result = await getUserByIdService(req.params.userId)

        if (result.data) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Usuario encontrado',
                data: result.data
            })
        } else if (result.data === null) {
            return res.status(401).json({
                statusCode: 401,
                message: 'No se encontró el usuario buscado'
            })
        } else if (result.error) {
            return res.status(400).json({
                statusCode: 400,
                message: result.error
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

export const getAllUserController = async (req, res) => {
    try {
        const result = await getAllUserService()

        if (result.data.length > 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Usuarios encontrados',
                data: result.data
            })
        } else if (result.data.length == 0) {
            return res.status(400).json({
                statusCode: 400,
                message: 'No se encontraron usuarios'
            })
        } else if (result.error) {
            return res.status(400).json({
                statusCode: 400,
                message: result.error
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

export const updateUserEmailController = async (req, res) => {
    try {
        const result = await updateUserEmailService(req)

        if (result.message) {
            return res.status(200).json({
                statusCode: 200,
                message: result.message
            })
        } else if (result.error) {
            return res.status(400).json({
                statusCode: 400,
                message: result.error
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: 'Se produjo un error inesperado'
            })
        }
    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}

export const deleteUserController = async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Se produjo un error inesperado'
        })
    }
}