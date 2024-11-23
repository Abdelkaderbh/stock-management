import { Router } from "express";
import { addProduct, GetAllProducts, GetProductById, DeleteProduct, UpdateProduct, GetProductsByCategory } from "../controllers/productController";
import multer from "multer";
import {authenticate} from '../middleware/auth';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).array("images", 5);

router.post("/add", upload, addProduct);
router.get("/all",authenticate,GetAllProducts);
router.get("/:id", GetProductById);
router.delete("/delete/:id", DeleteProduct);
router.put("/update/:id", upload, UpdateProduct);
router.get("/category/:categoryId", GetProductsByCategory);

export default router;
