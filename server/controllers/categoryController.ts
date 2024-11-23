import { Request, Response } from "express";
import Category from "../models/Category";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

// Add Category
export const AddCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {name,userId} = req.body;
    const newCategory = new Category({
      categoryName: name,
      userId,
    });
    const category = await newCategory.save();
    return res.status(201).json(category);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message
      return res.status(500).send("Error creating category");
    } else {
      console.error("Unexpected error:", error); // Handle unexpected errors
      return res.status(500).send("Error creating category");
    }
  }
};

// Get All Categories
export const GetCategories = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const filter: Record<string, any> = {};
    if (req.userId) {
      filter.userId = req.userId;
    }
    const categories = await Category.find(filter);

    if (categories.length > 0) {
      return res.status(200).json(categories);
    } else {
      console.log("No categories found!");
      return res.status(404).send("No categories found");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message
      return res.status(500).send("Error fetching categories");
    } else {
      console.error("Unexpected error:", error); // Handle unexpected errors
      return res.status(500).send("Error fetching categories");
    }
  }
};

// Get Category By Id
export const GetOneCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id: string = req.params.id;
    const category = await Category.findById(id);
    if (category) {
      return res.status(200).json(category.categoryName);
    } else {
      console.log("Category not found");
      return res.status(404).send("Category not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message
      return res.status(500).send("Error fetching category");
    } else {
      console.error("Unexpected error:", error); // Handle unexpected errors
      return res.status(500).send("Error fetching category");
    }
  }
};

// Delete Category
export const DeleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id: string = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (deletedCategory) {
      return res.status(200).send("Category deleted!");
    } else {
      console.log("Category not found");
      return res.status(404).send("Category not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message
      return res.status(500).send("Error deleting category");
    } else {
      console.error("Unexpected error:", error); // Handle unexpected errors
      return res.status(500).send("Error deleting category");
    }
  }
};

// Update Category
export const UpdateCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id: string = req.params.id;
    const categoryName: string = req.body.name;
    const updateCategory = {
      categoryName,
    };
    const category = await Category.findByIdAndUpdate(id, updateCategory, {
      new: true,
    });
    if (category) {
      return res.status(200).json(category);
    } else {
      console.log("Category not found");
      return res.status(404).send("Category not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message
      return res.status(500).send("Error updating category");
    } else {
      console.error("Unexpected error:", error); // Handle unexpected errors
      return res.status(500).send("Error updating category");
    }
  }
};
