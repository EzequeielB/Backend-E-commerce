export const validateId = (req, res, next) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  req.id = id;
  next();
};
