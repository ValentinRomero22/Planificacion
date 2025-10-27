import { Router } from 'express'

import {
    saveUserController,
    getUserByIdController,
    getAllUserController,
    updateUserEmailController,
    deleteUserController
} from '../controllers/userController.js'

export const userRouter = Router()

userRouter.post('/user/', saveUserController)
userRouter.get('/user/:userId', getUserByIdController)
userRouter.get('/user/', getAllUserController)
userRouter.put('/user/:userId', updateUserEmailController)
userRouter.delete('/user/', deleteUserController)