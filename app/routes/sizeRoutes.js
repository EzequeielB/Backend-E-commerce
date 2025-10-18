import { Router } from "express";
import { sizeById, sizeDelete, sizesCreate, sizesList, sizeUpdate } from "../controllers/sizeController.js";



const sizeRoutes = Router();

sizeRoutes.post("/create", sizesCreate),
sizeRoutes.get("/list", sizesList);
sizeRoutes.get("/:id", sizeById);
sizeRoutes.delete("/delete/:id", sizeDelete);
sizeRoutes.put("/update/:id", sizeUpdate);

export default sizeRoutes;
