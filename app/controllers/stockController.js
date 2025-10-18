import { createStock, deleteStock, listStocks, searchStockById, updateStock } from "../services/stockServices.js";

export const stocksCreate = async (req, res) => {
  try {
    const { count } = req.body;
    const result = await createStock({ count });
    res.status(201).json({
      message: "Stock creado correctamente",
      stock: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const stockById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await searchStockById(id);
    res.status(200).json({ message: "Stock encontrado", stock: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const stocksList = async (req, res) => {
  try {
    const result = await listStocks();
    res.status(200).json({
      message: "Stocks encontrados",
      stocks: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const stockUpdate = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { data } = req.body;
    const result = await updateStock({ id, data });
    res.status(200).json({ message: "Stock actualizado", stock: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const stockDelete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteStock(id);
    res.status(200).json({ message: "Stock eliminado", Stock: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};