import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, nom, prenom, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const user = new User({
      email,
      password,
      nom,
      prenom,
      phoneNumber,
    });

    await user.save();
    return res.status(201).send("User registered successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error registering user:", error.message);
      return res.status(500).send(error.message);
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).send("Error registering user");
    }
  }
};

export const LoginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(401).json("Invalid email");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Server error during login:", error.message);
      return res.status(500).send(error.message);
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).send("Server error");
    }
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users: IUser[] = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching users:", error.message);
      return res.status(500).json({ error: error.message });
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
};

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json("Old password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.status(200).json("Password changed successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error changing password:", error.message);
      return res.status(500).send(error.message);
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).send("Server error");
    }
  }
};
