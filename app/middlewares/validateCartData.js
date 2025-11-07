export const validateCartData = (req, res, next) => {
  const { user, items } = req.body;

  if (user !== undefined && user !== null) {
    const userId = Number(user);
    if (Number.isNaN(userId) || userId <= 0) {
      return res.status(400).json({
        error: "El campo 'user' debe ser un ID numérico válido mayor a 0",
      });
    }
    req.body.user = { id: userId };
  } else {
    req.body.user = null;
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    req.body.items = [];
  } else {
    const parsedItems = [];

    for (const i of items) {
      const idUnique = Number(i.id_uniqueProduct);
      const unitsNum = Number(i.units);

      if (Number.isNaN(idUnique) || idUnique <= 0) {
        return res.status(400).json({
          error: "Cada item debe tener un 'id_uniqueProduct' numérico válido mayor a 0",
        });
      }

      if (Number.isNaN(unitsNum) || unitsNum <= 0) {
        return res.status(400).json({
          error: "Cada item debe tener 'units' como número entero mayor a 0",
        });
      }

      parsedItems.push({
        id_uniqueProduct: idUnique,
        units: unitsNum,
      });
    }

    req.body.items = parsedItems;
  }

  console.log(
    "🛒 [validateCartData] Body normalizado:",
    JSON.stringify(req.body, null, 2)
  );

  next();
};
