import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateCategoryData } from "../middlewares/validateId.js";
import { validateId } from "../middlewares/idValidation.js";

import {
  categorysCreate,
  categorysList,
  categoryById,
  categoryDelete,
  categoryUpdate,
} from "../controllers/categoryController.js";

const categoryRoutes = Router();

categoryRoutes.use(authMiddleware([1,2]));
categoryRoutes.get("/list", categorysList);
categoryRoutes.get("/:id", validateId, categoryById);

categoryRoutes.use(authMiddleware([1]));
categoryRoutes.post("/create",validateCategoryData ,categorysCreate);
categoryRoutes.put("/update/:id", validateId, validateCategoryData, categoryUpdate);
categoryRoutes.delete("/delete/:id", validateId, categoryDelete);

export default categoryRoutes;
