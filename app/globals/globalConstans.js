import dotenv from "dotenv";
dotenv.config();



export const SECRET= process.env.SECRET || "MI_SECRETO"
export const PORT = process.env.PORT || 5000;

