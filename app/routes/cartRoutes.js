import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateId } from "../middlewares/idValidation.js";
import { validateCartData } from "../middlewares/validateCartData.js";
import {
  cartById,
  cartDelete,
  cartsCreate,
  cartsList,
  cartUpdate,
  cartByUserId,
} from "../controllers/cartController.js";

const cartRoutes = Router();

cartRoutes.post(
  "/create",
  authMiddleware([1, 2]),
  validateCartData,
  cartsCreate
);

cartRoutes.put(
  "/update/:id",
  authMiddleware([1, 2]),
  validateId,
  validateCartData,
  cartUpdate
);

cartRoutes.delete(
  "/delete/:id",
  authMiddleware([1, 2]),
  validateId,
  cartDelete
);

cartRoutes.get("/list", cartsList);

cartRoutes.get("/:id", authMiddleware([1, 2]), validateId, cartById);

cartRoutes.get("/user/:id", authMiddleware([1, 2]), validateId, cartByUserId);

export default cartRoutes;
