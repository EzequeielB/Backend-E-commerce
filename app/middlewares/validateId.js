export const validateCategoryData = (req, res, next) => {
  const { name, id_category_parent } = req.body;

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Body inválido" });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({
        error: "El campo 'name' es obligatorio y debe ser un string no vacío",
      });
  }

  if (
    id_category_parent !== undefined &&
    (typeof id_category_parent !== "number" || Number.isNaN(id_category_parent))
  ) {
    return res
      .status(400)
      .json({
        error:
          "El campo 'id_category_parent' debe ser un número válido si se incluye",
      });
  }

  next();
};
