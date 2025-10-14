import express from "express";
const app = express();
import { PORT } from "./globals/globalConstans.js";
import routes_init from "./routes/index.routes.js";

app.use(express.json());

app.use("/api", routes_init());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
