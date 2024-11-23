// Packages Imports
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

// Routers import
import categories from "./routes/categoryRouter";
import products from "./routes/productRouter";
import supplier from "./routes/supplierRouter";
import users from "./routes/userRouter";

// Configs
dotenv.config({ path: "./config/.env" });
const app = express();
const PORT = process.env.PORT || 5000;
const db = process.env.DATABASE_URL;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/categories", categories);
app.use("/product", products);
app.use("/suppliers", supplier);
app.use("/user", users);

mongoose
  .connect(db || "")
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Database connection error:", err.message);
  });
