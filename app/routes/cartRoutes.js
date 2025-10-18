import { cartById, cartDelete, cartsCreate, cartsList, cartUpdate } from "../controllers/cartController.js";

const cartRoutes = Router();

cartRoutes.post("/create", cartsCreate),
cartRoutes.get("/list", cartsList);
cartRoutes.get("/:id", cartById);
cartRoutes.delete("/delete/:id", cartDelete);
cartRoutes.put("/update/:id", cartUpdate);

export default cartRoutes;
