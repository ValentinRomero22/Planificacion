import taskModel from '../models/taskModel.js'

export const saveTaskDao = async (newTask) => {
    try {
        const result = await taskModel.create(newTask)
        return result
    } catch (error) {
        throw error
    }
}

export const getTaskByIdDao = async (taskId) => {
    try {
        const taskFound = await taskModel.findById(taskId)
        return taskFound
    } catch (error) {
        throw error
    }
}

export const getTaskByDateRangeDao = async (startDate, finalDate) => {
    try {
        const result = await taskModel.find({
            date: { $gte: startDate, $lte: finalDate }
        })

        return result
    } catch (error) {
        throw error
    }
}

export const getTaskByUserAndDateRangeDao = async (userId, startDate, finalDate) => {
    try {
        const result = await taskModel.find({
            user: userId,
            date: { $gte: startDate, $lte: finalDate }
        })

        return result
    } catch (error) {
        throw error
    }
}

export const updateTaskDescriptionDao = async (taskId, newDescription) => {
    try {
        const result = await taskModel.updateOne(
            { _id: taskId },
            { $set: { description: newDescription } },
            { runValidators: true }
        )

        return result
    } catch (error) {
        throw error
    }
}

export const updateTaskStatusDao = async (taskId, newStatus) => {
    try {
        const result = await taskModel.updateOne(
            { _id: taskId },
            { $set: { status: newStatus } },
            { runValidators: true }
        )

        return result
    } catch (error) {
        throw error
    }
}

export const updateCommentTaskDao = async (taskId, newCommet) => {
    try {
        const result = await taskModel.updateOne(
            { _id: taskId },
            { $set: { comment: newCommet } },
            { runValidators: true }
        )

        return result
    } catch (error) {
        throw error
    }
}

export const deleteCommentTaskDao = async (taskId) => {
    try {
        const result = await taskModel.findByIdAndUpdate(
            taskId,
            { $unset: { comment: 1 } }
        )

        return result
    } catch (error) {
        throw error
    }
}

export const deleteTaskByUserDao = async (userId) => {
    try {
        const result = await taskModel.deleteMany({
            user: userId
        })

        return result
    } catch (error) {
        throw error
    }
}