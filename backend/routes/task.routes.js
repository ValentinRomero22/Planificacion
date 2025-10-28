import { Router } from 'express'

import {
    saveTaskController,
    getTaskByDateRangeController,
    getTaskByUserAndDateRangeController,
    updateTaskDescriptionController,
    updateTaskStatusController,
    deleteCommentTaskController
} from '../controllers/taskController.js'

export const taskRouter = Router()

taskRouter.post('/task/', saveTaskController)
taskRouter.get('/task/', getTaskByDateRangeController)
taskRouter.get('/task/:userId', getTaskByUserAndDateRangeController)
taskRouter.put('/task/', updateTaskDescriptionController)
taskRouter.put('/task/status/', updateTaskStatusController)
taskRouter.delete('/task/', deleteCommentTaskController)