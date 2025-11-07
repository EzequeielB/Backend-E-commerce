import {
  createCart,
  deleteCart,
  searchCartById,
  updateCart,
  listCarts,
  searchCartByUserId,
} from "../services/cartServices.js";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const cartsCreate = async (req, res, next) => {
  try {
    const { items } = req.body; 

    if (items?.length) {
      for (const p of items) {
        const unique = await prisma.unique_Product.findUnique({
          where: { id: p.id_uniqueProduct },
          include: { stock: true },
        });

        if (!unique || !unique.stock || p.units > unique.stock.count) {
          return res.status(400).json({
            error: `Stock insuficiente para el producto ${unique?.name || p.id_uniqueProduct}`,
          });
        }
      }
    }

    const result = await createCart(req.body);
    res.status(201).json({
      message: "Carrito creado correctamente",
      cart: result,
    });
  } catch (err) {
    next(err);
  }
};

export const cartById = async (req, res, next) => {
  try {
    const result = await searchCartById(Number(req.params.id));
    res.status(200).json({ message: "Carrito encontrado", cart: result });
  } catch (err) {
    next(err);
  }
};

export const cartByUserId = async (req, res, next) => {
  try {
    const result = await searchCartByUserId(Number(req.params.id));
    res.status(200).json({ message: "Carrito encontrado", cart: result });
  } catch (err) {
    next(err);
  }
};

export const cartsList = async (req, res, next) => {
  try {
    const result = await listCarts();
    res.status(200).json({
      message: "Carritos encontrados",
      carts: result,
    });
  } catch (err) {
    next(err);
  }
};

export const cartUpdate = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (items?.length) {
      for (const p of items) {
        const unique = await prisma.unique_Product.findUnique({
          where: { id: p.id_uniqueProduct },
          include: { stock: true },
        });

        if (!unique || !unique.stock || p.units > unique.stock.count) {
          return res.status(400).json({
            error: `Stock insuficiente para el producto ${unique?.name || p.id_uniqueProduct}`,
          });
        }
      }
    }

    const result = await updateCart({ id: Number(req.params.id), data: req.body });
    res.status(200).json({ message: "Carrito actualizado", cart: result });
  } catch (err) {
    next(err);
  }
};


export const cartDelete = async (req, res, next) => {
  try {
    const result = await deleteCart(Number(req.params.id));
    res.status(200).json({ message: "Carrito eliminado", cart: result });
  } catch (err) {
    next(err);
  }
};
