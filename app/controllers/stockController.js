import { createStock, deleteStock, listStocks, searchStockById, updateStock } from "../services/stockServices";

export const stocksCreate = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await createStock({ name });
    res.status(201).json({
      message: "Stock creado correctamente",
      rol: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const rolById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await searchStockById(id);
    res.status(200).json({ message: "Stock encontrado", rol: result });
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
    res.status(200).json({ message: "Stock actualizado", rol: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const rolDelete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteStock(id);
    res.status(200).json({ message: "Stock eliminado", Stock: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};