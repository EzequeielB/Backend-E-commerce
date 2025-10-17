import { Router } from "express";
import userRoutes from "./usersRoutes.js";
import rolesRoutes from "./rolesRoutes.js";
import productRoutes from "./productRoutes.js";
import UniqueProductRoutes from "./uniqueProductRoutes.js";
import brandRoutes from "./brandRoutes.js";

const routes_init = () => {
  const router = Router();
  router.use("/users", userRoutes);
  router.use("/roles", rolesRoutes);
  router.use("/products", productRoutes);
  router.use("/unique-product", UniqueProductRoutes);
  router.use("/brands", brandRoutes);
  return router;
};

export default routes_init;
