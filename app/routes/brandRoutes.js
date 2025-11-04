import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateBrandData } from "../middlewares/validateBrand.js";
import {validateId} from "../middlewares/idValidation.js"
import { brandById, brandDelete, brandsCreate, brandsList, brandUpdate } from "../controllers/brandController.js";


const brandRoutes = Router();

brandRoutes.use(authMiddleware([1]))
brandRoutes.post("/create", validateBrandData, brandsCreate),
brandRoutes.get("/list", brandsList);
brandRoutes.get("/:id", validateId, brandById);
brandRoutes.delete("/delete/:id", validateId, brandDelete);
brandRoutes.put("/update/:id", validateId, validateBrandData, brandUpdate);

export default brandRoutes;
