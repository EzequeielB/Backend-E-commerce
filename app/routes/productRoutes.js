import { Router } from "express";
import {
  productById,
  productDelete,
  productsCreate,
  productsList,
  productUpdate,
} from "../controllers/productController";

const productRoutes = Router();

rolesRoutes.post("/create", productsCreate),
  rolesRoutes.get("/list", productsList);
rolesRoutes.get("/:id", productById);
rolesRoutes.delete("/delete/:id", productDelete);
rolesRoutes.put("/update/:id", productUpdate);

export default productRoutes;
