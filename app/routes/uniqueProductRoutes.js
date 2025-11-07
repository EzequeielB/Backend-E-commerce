import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateId } from "../middlewares/idValidation.js";
import { validateUniqueProductData } from "../middlewares/validateUniqueProductData.js";
import {
  uniqueProductById,
  uniqueProductDelete,
  uniqueProductsCreate,
  uniqueProductsList,
  uniqueProductUpdate,
} from "../controllers/uniqueProductController.js";

const UniqueProductRoutes = Router();

UniqueProductRoutes.use(authMiddleware([1,2]));
UniqueProductRoutes.get("/list", uniqueProductsList);
UniqueProductRoutes.get("/:id", validateId, uniqueProductById);

UniqueProductRoutes.use(authMiddleware([1]));
UniqueProductRoutes.post(
  "/create",
  validateUniqueProductData,
  uniqueProductsCreate
);
UniqueProductRoutes.delete("/delete/:id", validateId, uniqueProductDelete);
UniqueProductRoutes.put(
  "/update/:id",
  validateId,
  validateUniqueProductData,
  uniqueProductUpdate
);

export default UniqueProductRoutes;