import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
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

userRoutes.use(authMiddleware([2]));
userRoutes.get("/list", listUsers);
userRoutes.get("/:id", userById);
userRoutes.delete("/delete/:id", userDelete);
userRoutes.put("/update/:id", userUpdate);

export default userRoutes;