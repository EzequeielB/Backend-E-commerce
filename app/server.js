import express from "express";
import cors from "cors"
const app = express();
import { PORT } from "./globals/globalConstans.js";
import routes_init from "./routes/index.routes.js";

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.use("/api", routes_init());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
