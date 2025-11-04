import {
  createSize,
  deleteSize,
  listSizes,
  searchSizeById,
  updateSize,
} from "../services/sizeServices.js";

export const sizesCreate = async (req, res, next) => {
  try {
    const data = req.body;

    const result = await createSize(data);

    res.status(201).json({
      message: "talle creado correctamente",
      size: result,
    });
  } catch (err) {
    next(err);
  }
};

export const sizeById = async (req, res, next) => {
  try {
    const result = await searchSizeById(id);
    res.status(200).json({ message: "talle encontrado", brnad: result });
  } catch (err) {
    next(err);
  }
};

export const sizesList = async (req, res, next) => {
  try {
    const result = await listSizes();
    res.status(200).json({
      message: "talles encontrados",
      sizes: result,
    });
  } catch (err) {
    next(err);
  }
};

export const sizeUpdate = async (req, res, next) => {
  try {
    const result = await updateSize({ id: req.id, data: req.body });
    res.status(200).json({ message: "talle actualizado", size: result });
  } catch (err) {
    next(err);
  }
};

export const sizeDelete = async (req, res) => {
  try {
    const result = await deleteSize(req.id);
    res.status(200).json({ message: "talle eliminado", size: result });
  } catch (err) {
    next(err);
  }
};