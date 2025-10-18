import { Router } from "express";
import { stockById, stockDelete, stocksCreate, stocksList, stockUpdate } from "../controllers/stockController";

const stockRoutes = Router();

stockRoutes.post("/create", stocksCreate),
stockRoutes.get("/list", stocksList);
stockRoutes.get("/:id", stockById);
stockRoutes.delete("/delete/:id", stockDelete);
stockRoutes.put("/update/:id", stockUpdate);

export default stockRoutes;