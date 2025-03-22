import bcrypt from 'bcryptjs';
import { generateToken } from '../config/auth.js';
import { findUserByEmail, createUser } from '../repositories/userRepository.js';

export const register = async (name, email, password) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, password: hashedPassword });

    return { message: 'User Registered Successfully' };
};

export const login = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid Credentials');
    }

    return { token: generateToken(user) };
};
