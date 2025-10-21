import userModel from '../models/userModel.js'

export const saveUserDao = async (newUser) => {
    try {
        const result = await userModel.create(newUser)
        return result
    } catch (error) {
        throw error
    }
}

export const getUserByIdDao = async (userId) => {
    try {
        const result = await userModel.findById(userId)
        return result
    } catch (error) {
        throw error
    }
}

export const getAllUserDao = async () => {
    try {
        const result = await userModel.find({})
        return result
    } catch (error) {
        throw error
    }
}

export const updateUserEmailDao = async (userId, newEmail) => {
    try {
        const result = await userModel.updateOne(
            { _id: userId },
            { $set: { email: newEmail } },
            { runValidators: true }
        )

        return result
    } catch (error) {
        throw error
    }
}

export const deleteUserDao = async (userId) => {
    try {
        const result = await userModel.deleteOne({
            _id: userId
        })

        return result
    } catch (error) {
        throw error
    }
}