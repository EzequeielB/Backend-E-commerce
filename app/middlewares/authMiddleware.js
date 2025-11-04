import jwt from "jsonwebtoken";
import { SECRET } from "../globals/globalConstans.js";

export const authMiddleware = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "Token requerido" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token inválido" });

    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;

      if (
        rolesPermitidos.length &&
        !decoded.roles.some((roleId) => rolesPermitidos.includes(roleId))
      ) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      next();
    } catch (err) {
      return res.status(403).json({ error: "Token no válido o expirado" });
    }
  };
};
