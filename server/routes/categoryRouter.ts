import express, { Request, Response } from "express";
import * as catController from "../controllers/categoryController";
const router = express.Router();
import {authenticate} from '../middleware/auth';

// Add Category
router.post("/add", async (req: Request, res: Response) => {
  await catController.AddCategory(req, res);
});

// Get All Categories
router.get("/all", authenticate,async (req: Request, res: Response) => {
  await catController.GetCategories(req, res);
});

// Get One Category
router.get("/:id", async (req: Request, res: Response) => {
  await catController.GetOneCategory(req, res);
});

// Update Category
router.put("/update/:id", async (req: Request, res: Response) => {
  await catController.UpdateCategory(req, res);
});


// Delete Category
router.delete("/delete/:id",async (req:Request,res:Response) => {
  await catController.DeleteCategory(req,res);
})

export default router;
