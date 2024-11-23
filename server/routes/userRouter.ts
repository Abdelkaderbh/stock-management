import express, { Request, Response } from "express";
import * as userController from "../controllers/userController"; // Adjust the import as needed

const router = express.Router();

// Register User
router.post("/register", async (req: Request, res: Response) => {
  await userController.RegisterUser(req, res);
});

// Login User
router.post("/login", async (req: Request, res: Response) => {
  await userController.LoginUser(req, res);
});

// Get All Users
router.get("/all", async (req: Request, res: Response) => {
  await userController.getAllUsers(req, res);
});

// Change Password
router.put("/editpsw", async (req: Request, res: Response) => {
  await userController.changePassword(req, res);
});

export default router;
