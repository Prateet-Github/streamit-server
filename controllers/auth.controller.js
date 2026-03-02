import User from '../models/user.model.js';
import { hashPassword } from '../utils/passwordHash.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username or email already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ 
      username, 
      name, 
      email, 
      password: hashedPassword
     });
    await newUser.save();

    const token = generateToken({ id: newUser._id });

    return res.status(201).json({ 
      message: 'User registered successfully',
      user:{
        id: newUser._id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email
      },
      token
     });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};