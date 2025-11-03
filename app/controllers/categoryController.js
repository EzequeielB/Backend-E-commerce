import {
  createCategory,
  deleteCategory,
  searchCategoryById,
  updateCategory,
  listCategorys,
} from "../services/categoryServices.js";


export const categorysCreate = async (req, res, next) => {
  try {
    const result = await createCategory(req.body);
    res.status(201).json({
      message: "Categoría creada correctamente",
      category: result,
    });
  } catch (err) {
    next(err);
  }
};


export const categoryById = async (req, res, next) => {
  try {
    const result = await searchCategoryById(req.id);
    res.status(200).json({ message: "Categoría encontrada", category: result });
  } catch (err) {
    next(err);
  }
};


export const categorysList = async (req, res, next) => {
  try {
    const result = await listCategorys();
    res.status(200).json({
      message: "Categorías encontradas",
      categories: result,
    });
  } catch (err) {
    next(err);
  }
};


export const categoryUpdate = async (req, res, next) => {
  try {
    const result = await updateCategory({ id: req.id, data: req.body });
    res.status(200).json({
      message: "Categoría actualizada",
      category: result,
    });
  } catch (err) {
    next(err);
  }
};


export const categoryDelete = async (req, res, next) => {
  try {
    const result = await deleteCategory(req.id);
    res.status(200).json({
      message: "Categoría eliminada",
      category: result,
    });
  } catch (err) {
    next(err);
  }
};
