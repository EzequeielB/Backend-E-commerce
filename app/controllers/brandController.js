import { createBrand, deleteBrand, listBrands, searchBrandById, updateBrand } from "../services/brandServices.js";

export const brandsCreate = async (req, res, next) => {
  try {

    const result = await createBrand(req.body);
    
    res.status(201).json({
      message: "Marca creada correctamente",
      brand: result,
    });
  } catch (err) {
    next(err)
  }
};

export const brandById = async (req, res, next) => {
  try {
    const result = await searchBrandById(req.id);
    res.status(200).json({ message: "Marca encontrada", brnad: result });
  } catch (err) {
    next(err)
  }
};

export const brandsList = async (req, res, next) => {
  try {
    const result = await listBrands();
    res.status(200).json({
      message: "Marcas encontradas",
      brands: result,
    });
  } catch (err) {
    next(err)
  }
};

export const brandUpdate = async (req, res, next) => {
  try {
    const result = await updateBrand({ id:req.id, data:req.body });
    res.status(200).json({ message: "Marca actualizada", brand: result });
  } catch (err) {
    next(err)
  }
};

export const brandDelete = async (req, res, next) => {
  try {
    const result = await deleteBrand(req.id);
    res.status(200).json({ message: "Marca eliminada", brand: result });
  } catch (err) {
    next(err)
  }
};