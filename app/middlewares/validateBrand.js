export const validateBrandData = (req, res, next) => {
  const { name, external_reference } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
  }
  
  if (!external_reference || typeof external_reference !== "string" || !external_reference.trim()) {
    return res.status(400).json({ error: "El enlace de referencia es obligatorio" });
  }

  next();
};