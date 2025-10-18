import { createCart, deleteCart, searchCartById, updateCart } from "../services/cartServices.js";


export const cartsCreate = async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== "object") {
      return res
        .status(400)
        .json({ error: "Body inválido para actualización" });
    }

    const result = await createCart({
      data,
    });

    res.status(201).json({
      message: "Carto creado correctamente",
      cart: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const cartById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const result = await searchCartById(id);
    res.status(200).json({ message: "Carto encontrado", cart: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const cartsList = async (req, res) => {
  try {
    const result = await listCarts();
    res.status(200).json({
      message: "Cartos encontrados",
      carts: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const cartUpdate = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const data = req.body;
    if (!data || typeof data !== "object") {
      return res
        .status(400)
        .json({ error: "Body inválido para actualización" });
    }

    const result = await updateCart({ id, data });
    res.status(200).json({ message: "Carto actualizado", cart: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const cartDelete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const result = await deleteCart(id);
    res.status(200).json({ message: "Carto eliminado", cart: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
