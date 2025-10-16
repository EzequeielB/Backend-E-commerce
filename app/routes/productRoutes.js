import { Router } from "express";
import {
  productById,
  productDelete,
  productsCreate,
  productsList,
  productUpdate,
} from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.post("/create", productsCreate),
productRoutes.get("/list", productsList);
productRoutes.get("/:id", productById);
productRoutes.delete("/delete/:id", productDelete);
productRoutes.put("/update/:id", productUpdate);

export default productRoutes;
