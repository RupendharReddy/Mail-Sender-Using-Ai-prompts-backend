import { findUserById, updateUser } from '../repositories/userRepository.js';

export const getUserById = async (userId) => {
    const user = await findUserById(userId);
    if (!user) throw new Error('User not found');
    return user;
};

export const updateUserProfile = async (userId, userDetails) => {
    return await updateUser(userId, userDetails);
};
