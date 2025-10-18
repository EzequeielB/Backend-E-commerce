import { createSize, deleteSize, listSizes, searchSizeById, updateSize } from "../services/sizeServices";


export const sizesCreate = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !external_reference) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const result = await createSize({
      name
    });

    res.status(201).json({
      message: "talle creada correctamente",
      size: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const sizeById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const result = await searchSizeById(id);
    res.status(200).json({ message: "talle encontrado", brnad: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const sizesList = async (req, res) => {
  try {
    const result = await listSizes();
    res.status(200).json({
      message: "talles encontrados",
      sizes: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const sizeUpdate = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const data = req.body;
    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Body inválido para actualización" });
    }

    const result = await updateSize({ id, data });
    res.status(200).json({ message: "talle actualizada", size: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const sizeDelete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const result = await deleteSize(id);
    res.status(200).json({ message: "talle eliminada", size: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};


