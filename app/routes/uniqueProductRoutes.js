import { Router } from "express";
import { uniqueProductById, uniqueProductDelete, uniqueProductsCreate, uniqueProductsList, uniqueProductUpdate } from "../controllers/uniqueProductController.js";


const UniqueProductRoutes = Router();

UniqueProductRoutes.post("/create", uniqueProductsCreate),
UniqueProductRoutes.get("/list", uniqueProductsList);
UniqueProductRoutes.get("/:id", uniqueProductById);
UniqueProductRoutes.delete("/delete/:id", uniqueProductDelete);
UniqueProductRoutes.put("/update/:id", uniqueProductUpdate);

export default UniqueProductRoutes;
