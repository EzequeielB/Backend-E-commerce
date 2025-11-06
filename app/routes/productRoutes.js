import { Router } from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js"
import {validateId} from "../middlewares/idValidation.js"
import {
  productById,
  productDelete,
  productsCreate,
  productsList,
  productUpdate,
} from "../controllers/productController.js";
import { validateProductDataCreate } from "../middlewares/validateProductDataCreate.js";

const productRoutes = Router();

productRoutes.use(authMiddleware([1]))

productRoutes.post("/create", validateProductDataCreate, productsCreate),
productRoutes.get("/list", productsList);
productRoutes.get("/:id", validateId, productById);
productRoutes.delete("/delete/:id", validateId, productDelete);
productRoutes.put("/update/:id", validateId, validateProductDataCreate, productUpdate);

export default productRoutes;
