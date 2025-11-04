export const errorHandler = (err, req, res, next) => {
  console.error("ERROR HANDLER:", err.message);
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Error interno de Servidor",
  });
};
