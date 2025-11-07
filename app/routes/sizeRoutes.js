import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateSizeData } from "../middlewares/validateSizeData.js";
import { validateId } from "../middlewares/idValidation.js";
import { sizeById, sizeDelete, sizesCreate, sizesList, sizeUpdate } from "../controllers/sizeController.js";

const sizeRoutes = Router();

sizeRoutes.use(authMiddleware([1,2]));
sizeRoutes.get("/list", sizesList);
sizeRoutes.get("/:id", validateId, sizeById);

sizeRoutes.use(authMiddleware([1]));
sizeRoutes.post("/create", validateSizeData, sizesCreate),
sizeRoutes.delete("/delete/:id", validateId, sizeDelete);
sizeRoutes.put("/update/:id", validateId, validateSizeData, sizeUpdate);

export default sizeRoutes;
