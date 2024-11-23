import { Request, Response } from "express";
import Product from "../models/Product";
import {AuthenticatedRequest} from "../types/AuthenticatedRequest";


// Add Product
export const addProduct = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const {
      nom,
      quantite,
      prix,
      status,
      Promo,
      CatId,
      SupplierId,
      userId,
    } = req.body;

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      res.status(400).send("No images uploaded");
      return;
    }

    const images = (req.files as Express.Multer.File[]).map((file) => file.path);

    const nouveauProduit = new Product({
      nom,
      quantite: Number(quantite),
      prix: Number(prix),
      status: status !== undefined ? Boolean(status) : undefined,
      images,
      Promo: Promo || undefined,
      CatId,
      SupplierId,
      userId,
    });

    const product = await nouveauProduit.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error adding product:", err.message);
    } else {
      console.error("Error adding product:", err);
    }
    res.status(500).send("Server error");
  }
};

// Get all products
export const GetAllProducts = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { supplier, category, priceMin, priceMax, searchQuery, promo } = req.query;
    const filter: Record<string, any> = {};

    if (req.userId) {
      filter.userId = req.userId;
    }

    if (supplier) filter.SupplierId = supplier;
    if (category) filter.CatId = category;
    if (priceMin) filter.prix = { $gte: Number(priceMin) };
    if (priceMax) filter.prix = { ...filter.prix, $lte: Number(priceMax) };
    if (searchQuery) {
      filter.nom = { $regex: new RegExp(searchQuery as string, "i") };
    }
    if (promo !== undefined) {
      filter["Promo.InPromo"] = promo === "true";
    }

    const products = await Product.find(filter)
      .populate("CatId", "categoryName")
      .populate("SupplierId", "supplierName");

    res.status(products.length > 0 ? 200 : 404).json(products.length > 0 ? products : "No products found");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error fetching products:", err.message);
    } else {
      console.error("Error fetching products:", err);
    }
    res.status(500).send("Server error");
  }
};




// Get product by ID
export const GetProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id)
      .populate("CatId", "categoryName")
      .populate("SupplierId", "supplierName");

    res.status(product ? 200 : 404).json(product ? product : "Product not found!");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error fetching product:", err.message);
    } else {
      console.error("Error fetching product:", err);
    }
    res.status(500).send("Server error");
  }
};

// Delete product
export const DeleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const delProduct = await Product.findByIdAndDelete(id);
    res.status(delProduct ? 200 : 404).send(delProduct ? "Product deleted!" : "Product not found!");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error deleting product:", err.message);
    } else {
      console.error("Error deleting product:", err);
    }
    res.status(500).send("Server error");
  }
};

// Update product
export const UpdateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const updateData: Record<string, any> = {};

    if (req.body.nom) updateData.nom = req.body.nom;
    if (req.body.quantite) updateData.quantite = req.body.quantite;
    if (req.body.prix) updateData.prix = req.body.prix;
    if (req.body.status !== undefined) updateData.status = req.body.status;
    if (req.body.Promo) updateData.Promo = req.body.Promo;

    if (Array.isArray(req.files) && req.files.length > 0) {
      updateData.images = (req.files as Express.Multer.File[]).map((file) => file.path);
    }

    const product = await Product.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });

    res.status(product ? 200 : 404).json(product ? product : "Product not found");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error updating product:", err.message);
    } else {
      console.error("Error updating product:", err);
    }
    res.status(500).send("Server error");
  }
};

// Get Products by Category
export const GetProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ CatId: categoryId })
      .populate("CatId", "categoryName")
      .populate("SupplierId", "supplierName");

    res.status(products.length > 0 ? 200 : 404).json(products.length > 0 ? products : "No products found for this category");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error fetching products by category:", err.message);
    } else {
      console.error("Error fetching products by category:", err);
    }
    res.status(500).send("Server error");
  }
};
