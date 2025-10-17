import { Router } from "express";
import { brandById, brandDelete, brandsCreate, brandsList, brandUpdate } from "../controllers/brandController";


const brandRoutes = Router();

brandRoutes.post("/create", brandsCreate),
brandRoutes.get("/list", brandsList);
brandRoutes.get("/:id", brandById);
brandRoutes.delete("/delete/:id", brandDelete);
brandRoutes.put("/update/:id", brandUpdate);

export default brandRoutes;
