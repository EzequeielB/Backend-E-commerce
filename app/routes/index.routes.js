import { Router } from "express";
import userRoutes from "./usersRoutes.js";
import rolesRoutes from "./rolesRoutes.js";

const routes_init = () => {
  const router = Router();
  router.use("/users", userRoutes);
  router.use("roles", rolesRoutes)
  return router;
};

export default routes_init;
