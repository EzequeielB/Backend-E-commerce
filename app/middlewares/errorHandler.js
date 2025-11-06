export const errorHandler = (err, req, res, next) => {
  console.error("=== ERROR HANDLER ===");
  console.error("Message:", err.message);
  console.error("Status:", err.status);
  console.error("Stack:", err.stack);
  console.error("Raw error:", err);

  res.status(err.status || 500).json({
    error: err.message || "Error interno de Servidor",
  });
};
