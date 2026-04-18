import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/passwordHash.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = generateToken({ id: newUser._id });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ id: user._id });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(bio !== undefined && { bio }),
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
