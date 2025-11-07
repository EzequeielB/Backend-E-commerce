export const validateUniqueProductData = (req, res, next) => {
  
  const { name, color, id_brand, id_product, size, stock } =
    req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res
      .status(400)
      .json({ error: "El nombre del producto es obligatorio" });
  }


  if (!color || typeof color !== "string" || !color.trim()) {
    return res.status(400).json({ error: "El color es obligatorio" });
  }

  if (id_brand !== undefined && id_brand !== null) {
    const brandId = Number(id_brand);
    if (Number.isNaN(brandId)) {
      return res.status(400).json({
        error: "El campo 'id_brand' debe ser un número válido si se incluye",
      });
    }
    req.body.id_brand = brandId;
  }

  if (id_product !== undefined && id_product !== null) {
    const productId = Number(id_product);
    if (Number.isNaN(productId)) {
      return res.status(400).json({
        error: "El campo 'id_product' debe ser un número válido si se incluye",
      });
    }
    req.body.id_product = productId;
  }

  if (size !== undefined) {
    if (!Array.isArray(size)) {
      return res
        .status(400)
        .json({ error: "El campo 'size' debe ser un array de IDs numéricos" });
    }

    const parsedSizes = size.map((s) => Number(s));
    if (parsedSizes.some((n) => Number.isNaN(n))) {
      return res.status(400).json({
        error: "Todos los elementos de 'size' deben ser números válidos",
      });
    }

    req.body.size = parsedSizes.map((id) => ({ id }));
  }

  if (stock !== undefined) {
    if (
      typeof stock !== "object" ||
      stock === null ||
      Number.isNaN(Number(stock.count))
    ) {
      return res.status(400).json({
        error: "El campo 'stock.count' debe ser un número válido si se incluye",
      });
    }
    req.body.stock.count = Number(stock.count);
  }

  next();
};
