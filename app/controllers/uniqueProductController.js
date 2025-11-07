import {
  createUniqueProduct,
  listUniqueProducts,
  searchUniqueProductById,
  updateUniqueProduct,
  deleteUniqueProduct,
} from "../services/uniqueProductServices.js";

export const uniqueProductsCreate = async (req, res, next) => {
  try {
    const result = await createUniqueProduct(req.body);
    res.status(201).json({
      message: "Producto único creado correctamente",
      unique_product: result,
    });
  } catch (err) {
    next(err);
  }
};

export const uniqueProductById = async (req, res, next) => {
  try {
    const result = await searchUniqueProductById(Number(req.params.id));
    res.status(200).json({
      message: "Producto único encontrado",
      unique_product: result,
    });
  } catch (err) {
    next(err);
  }
};

export const uniqueProductsList = async (req, res, next) => {
  try {
    const result = await listUniqueProducts();
    res.status(200).json({
      message: "Productos únicos encontrados",
      unique_products: result,
    });
  } catch (err) {
    next(err);
  }
};

export const uniqueProductUpdate = async (req, res, next) => {
  try {
    const result = await updateUniqueProduct({
      id: Number(req.params.id),
      data: req.body,
    });
    res.status(200).json({
      message: "Producto único actualizado",
      unique_product: result,
    });
  } catch (err) {
    next(err);
  }
};

export const uniqueProductDelete = async (req, res, next) => {
  try {
    const result = await deleteUniqueProduct(Number(req.params.id));
    res.status(200).json({
      message: "Producto único eliminado",
      unique_product: result,
    });
  } catch (err) {
    next(err);
  }
};
