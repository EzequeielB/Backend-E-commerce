import { Router } from "express";
import {
  listUsers,
  userById,
  userDelete,
  userLogin,
  userRegister,
  userUpdate,
} from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/register", userRegister),
userRoutes.post("/login", userLogin);
userRoutes.get("/list", listUsers);
userRoutes.get("/:id", userById);
userRoutes.delete("/delete/:id", userDelete);
userRoutes.put("/update/:id", userUpdate);

export default userRoutes;
