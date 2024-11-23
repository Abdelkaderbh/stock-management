import express from "express";
import * as supplierController from "../controllers/supplierController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/add", supplierController.addSupplier);

router.get("/all", authenticate,supplierController.getAllSuppliers);

router.get("/:id", supplierController.getSupplierById);

router.delete("/delete/:id", supplierController.deleteSupplier);

router.put("/update/:id",supplierController.editSupplier);

export default router;
