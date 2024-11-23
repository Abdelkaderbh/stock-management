import { Request, Response } from "express";
import Supplier from "../models/Supplier"; 
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

// Add Supplier
export const addSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { suppName, logo, description, status, userId  } = req.body;
    const newSupplier = new Supplier({ suppName, logo, description, status,userId });
    const supplier = await newSupplier.save();

    if (supplier) {
      res.status(201).json(supplier);
    } else {
      res.status(400).send("Error creating supplier");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating supplier:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    res.status(500).send("Server Error");
  }
};

// Update Supplier
export const editSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { suppName, logo, description, status } = req.body;
    const id = req.params.id;
    const updateData = { suppName, logo, description, status };

    const supplier = await Supplier.findByIdAndUpdate(id, updateData, { new: true });

    if (supplier) {
      res.status(200).json({ message: "Supplier updated successfully", supplier });
    } else {
      res.status(404).send("Supplier not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating supplier:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    res.status(500).send("Server Error");
  }
};

// Delete Supplier
export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const supplierToDelete = await Supplier.findById(id);

    if (supplierToDelete) {
      await supplierToDelete.deleteOne();
      res.status(200).send("Supplier deleted successfully");
    } else {
      res.status(404).send("Supplier not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting supplier:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    res.status(500).send("Server Error");
  }
};

// Get All Suppliers
export const getAllSuppliers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const filter: Record<string, any> = {};
    if (req.userId) {
      filter.userId = req.userId;
    }
    const suppliers = await Supplier.find(filter);

    if (suppliers.length > 0) {
      res.status(200).json(suppliers);
    } else {
      res.status(404).send("No suppliers found");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching suppliers:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    res.status(500).send("Server Error");
  }
};

// Get Supplier By Id
export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const supplier = await Supplier.findById(id);

    if (supplier) {
      res.status(200).json(supplier);
    } else {
      res.status(404).send("Supplier not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching supplier by ID:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    res.status(500).send("Server Error");
  }
};
