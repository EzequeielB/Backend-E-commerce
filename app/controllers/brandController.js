import { createBrand, deleteBrand, listBrands, searchBrandById, updateBrand } from "../services/brandServices";


export const brandsCreate = async (req, res) => {
  try {
    const { name, external_link  } = req.body;

    if (!name || !external_link) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const result = await createBrand({
      name,
      external_link
    });

    res.status(201).json({
      message: "Marca creada correctamente",
      brand: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const brandById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const result = await searchBrandById(id);
    res.status(200).json({ message: "Marca encontrado", brnad: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const brandsList = async (req, res) => {
  try {
    const result = await listBrands();
    res.status(200).json({
      message: "Marcas encontrados",
      brands: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const brandUpdate = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const data = req.body;
    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Body inválido para actualización" });
    }

    const result = await updateBrand({ id, data });
    res.status(200).json({ message: "Marca actualizada", brand: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const brandDelete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const result = await deleteBrand(id);
    res.status(200).json({ message: "Marca eliminada", brand: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};


/*
model Brand {
  id                 Int              @id @default(autoincrement())
  name               String
  external_reference String
  fis_deleted         Boolean
  unique_product     Unique_Product[]
}
*/