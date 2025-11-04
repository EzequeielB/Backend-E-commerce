
export const validateCategoryData = (req, res, next) => {
  const { name, id_category_parent } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
  }


  if (id_category_parent !== null && id_category_parent !== undefined) {
    const num = Number(id_category_parent);
    if (Number.isNaN(num)) {
      return res.status(400).json({
        error: "El campo 'id_category_parent' debe ser un número válido si se incluye",
      });
    }
    req.body.id_category_parent = num;
  }
  next();
};
