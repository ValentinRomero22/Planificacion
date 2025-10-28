import {
    saveTaskService,
    getTaskByDateRangeService,
    getTaskByUserAndDateRangeService,
    updateTaskDescriptionService,
    updateTaskStatusService,
    deleteCommentTaskService
} from '../services/taskService.js'

export const saveTaskController = async (req, res) => {
    try {
        const result = await saveTaskService(req)

        if (result.data) {
            return res.status(201).json({
                statusCode: 201,
                message: 'La tarea fue creada correctamente',
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

export const getTaskByDateRangeController = async (req, res) => {
    try {
        const result = await getTaskByDateRangeService(req)

        if (result.data.length > 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Tareas recuperadas correctamente',
                data: result.data
            })
        } else if (result.data.length == 0) {
            return res.status(400).json({
                statusCode: 400,
                message: 'No se encontraron tareas para el rango de fechas ingresado'
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

export const getTaskByUserAndDateRangeController = async (req, res) => {
    try {
        const result = await getTaskByUserAndDateRangeService()

        if (result.data.length > 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Tareas recuperadas correctamente',
                data: result.data
            })
        } else if (result.data.length == 0) {
            return res.status(400).json({
                statusCode: 400,
                message: 'No se encontraron tareas para el rango de fechas y el usuario ingresado'
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

export const updateTaskDescriptionController = async (req, res) => {
    try {
        const result = await updateTaskDescriptionService(req)

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

export const updateTaskStatusController = async (req, res) => {
    try {
        const result = await updateTaskStatusService()

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

export const deleteCommentTaskController = async (req, res) => {
    try {
        const result = await deleteCommentTaskService(req)

        if (result.data) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Se eliminó el comentario de la tarea correctamente'
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