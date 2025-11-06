export const validateProductDataCreate = (req, res, next) => {
  const { name, description, categories, uniqueProducts, images, offer, unit_price } = req.body;

  // ✅ Validar nombre
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "El nombre del producto es obligatorio" });
  }

  // ✅ Validar descripción
  if (!description || typeof description !== "string" || !description.trim()) {
    return res.status(400).json({ error: "La descripción del producto es obligatoria" });
  }

  // ✅ Validar oferta
  if (offer === "" || offer === undefined || offer === null) {
    req.body.offer = null; // sin oferta
  } else {
    const offerNum = Number(offer);
    if (Number.isNaN(offerNum) || offerNum < 0) {
      return res.status(400).json({
        error: "El campo 'offer' debe ser un número válido mayor o igual a 0",
      });
    }
    req.body.offer = offerNum;
  }

  // ✅ Validar precio unitario
  const priceNum = Number(unit_price);
  if (Number.isNaN(priceNum) || priceNum < 0) {
    return res.status(400).json({
      error: "El campo 'unit_price' debe ser un número válido mayor o igual a 0",
    });
  }
  req.body.unit_price = priceNum;

// ✅ Validar categorías
if (!categories || !Array.isArray(categories) || categories.length === 0) {
  req.body.categories = null;
} else {
  const parsedCategories = categories
    .map((u) => Number(u))
    .filter((n) => !Number.isNaN(n) && n > 0); // solo IDs válidos > 0

  req.body.categories = parsedCategories.length > 0
    ? parsedCategories.map((id) => ({ id }))
    : null;
}

// ✅ Validar productos únicos
if (!uniqueProducts || !Array.isArray(uniqueProducts) || uniqueProducts.length === 0) {
  req.body.uniqueProducts = null;
} else {
  const parsedUniqueProducts = uniqueProducts
    .map((u) => Number(u))
    .filter((n) => !Number.isNaN(n) && n > 0);

  req.body.uniqueProducts = parsedUniqueProducts.length > 0
    ? parsedUniqueProducts.map((id) => ({ id }))
    : null;
}

  // ✅ Validar imágenes (array de strings o de objetos con {url})
  if (images !== undefined) {
    if (!Array.isArray(images)) {
      return res.status(400).json({
        error: "El campo 'images' debe ser un array",
      });
    }

    const normalizedImages = images.map((img) => {
      if (typeof img === "string") return img.trim();
      if (typeof img === "object" && img.url) return img.url.trim();
      return null;
    });

    if (normalizedImages.some((url) => !url)) {
      return res.status(400).json({
        error:
          "Cada elemento de 'images' debe ser una cadena o un objeto con propiedad 'url' no vacía.",
      });
    }

    req.body.images = normalizedImages;
  }

  // ✅ Log final del body normalizado
  console.log(
    "🧩 [validateProductDataCreate] Body normalizado:",
    JSON.stringify(req.body, null, 2)
  );

  next();
};
