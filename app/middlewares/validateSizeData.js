export const validateSizeData = (req, res, next) => {
  const { size } = req.body;
  if (!size || typeof size !== "string" || !size.trim()) {
    return res.status(400).json({ error: "La talla es obligatoria" });
  }
  next();
};