import {
  createUniqueProduct,
  listUniqueProducts,
  searchUniqueProductById,
  updateUniqueProduct,
  deleteUniqueProduct,
} from "../services/uniqueProductServices.js";

export const uniqueProductsCreate = async (req, res) => {
  try {
    const { name, offer, unit_price, color } = req.body;

    if (!name || offer === undefined || !color || unit_price === undefined) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const result = await createUniqueProduct({
      name,
      offer,
      unit_price,
      color,
    });

    res.status(201).json({
      message: " Unico creado correctamente",
      product: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const uniqueProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const result = await searchUniqueProductById(id);
    res.status(200).json({ message: "Producto Unico encontrado", product: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const uniqueProductsList = async (req, res) => {
  try {
    const result = await listUniqueProducts();
    res.status(200).json({
      message: "Productos Unicos encontrados",
      products: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const uniqueProductUpdate = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const data = req.body;
    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Body inválido para actualización" });
    }

    const result = await updateUniqueProduct({ id, data });
    res.status(200).json({ message: "Producto Unico actualizado", product: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const uniqueProductDelete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const result = await deleteUniqueProduct(id);
    res.status(200).json({ message: "Producto Unico eliminado", product: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

/*
model Unique_Product {
  id         Int      @id @default(autoincrement())
  name       String
  offer      Decimal
  unit_price Decimal  @default(0)
  color      String
  is_deleted     Boolean
  id_size    Int?
  size       Size?    @relation(fields: [id_size], references: [id])
  id_brand   Int?
  brand      Brand?   @relation(fields: [id_brand], references: [id])
  id_product Int?
  product    Product? @relation(fields: [id_product], references: [id])
  order      Order[]
  stock      Stock?
}

*/