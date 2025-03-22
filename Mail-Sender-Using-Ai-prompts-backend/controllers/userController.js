import { getUserById, updateUser } from '../services/userService.js';

export const getUserProfile = async (req, res) => {
    try {
        const user = await getUserById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const updatedUser = await updateUser(req.user.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
