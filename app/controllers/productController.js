import {
  createProduct,
  listProducts,
  searchProductById,
  updateProduct,
  deleteProduct,
} from "../services/productsServices";

export const productsCreate = async (req, res) => {
  try {
    const { name, description, url_img  } = req.body;

    if (!name || !description || !url_img) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const result = await createProduct({
      name,
      description,
      url_img,
    });

    res.status(201).json({
      message: "Producto creado correctamente",
      product: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const productById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const result = await searchProductById(id);
    res.status(200).json({ message: "Producto encontrado", product: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const productsList = async (req, res) => {
  try {
    const result = await listProducts();
    res.status(200).json({
      message: "Productos encontrados",
      products: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const productUpdate = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const data = req.body;
    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Body inválido para actualización" });
    }

    const result = await updateProduct({ id, data });
    res.status(200).json({ message: "Producto actualizado", product: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const productDelete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const result = await deleteProduct(id);
    res.status(200).json({ message: "Producto eliminado", product: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};


/*
model Product {
  id             Int              @id @default(autoincrement())
  name           String
  description    String
  url_img        String
  is_deleted     Boolean
  cart           Cart[]
  categories     Category[]
  wish_list      Wish_List[]
  uniqueProducts Unique_Product[]
}

*/