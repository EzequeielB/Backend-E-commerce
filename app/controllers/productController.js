import {
  createProduct,
  listProducts,
  searchProductById,
  updateProduct,
  deleteProduct,
} from "../services/productsServices.js";

export const productsCreate = async (req, res, next) => {
  try {
    const result = await createProduct(req.body);

    res.status(201).json({
      message: "Producto creado correctamente",
      product: result,
    });
  } catch (err) {
    next(err)
  }
};

export const productById = async (req, res, next) => {
  try {
    const result = await searchProductById(req.params.id);
    res.status(200).json({ message: "Producto encontrado", product: result });
  } catch (err) {
    next(err)
  }
};

export const productsList = async (req, res, next) => {
  try {
    const result = await listProducts();
    res.status(200).json({
      message: "Productos encontrados",
      products: result,
    });
  } catch (err) {
    next(err)
  }
};

export const productUpdate = async (req, res, next) => {
  try {
    const result = await updateProduct({ id:req.params.id, data: req.body });
    res.status(200).json({ message: "Producto actualizado", product: result });
  } catch (err) {
    next(err);
  }
};

export const productDelete = async (req, res, next) => {
  try {
    const result = await deleteProduct(req.params.id);
    res.status(200).json({ message: "Producto eliminado", product: result });
  } catch (err) {
    next(err);
  }
};