import { Router } from "express";
import { rolById, rolDelete, rolesCreate, rolesList, roleUpdate } from "../controllers/rolesController";

const rolesRoutes = Router();

rolesRoutes.post("/create", rolesCreate),
rolesRoutes.get("/list", rolesList);
rolesRoutes.get("/:id", rolById);
rolesRoutes.delete("/delete/:id", rolDelete);
rolesRoutes.put("/update/:id", roleUpdate);

export default rolesRoutes