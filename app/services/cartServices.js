import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createCart = async ({data}) => {
  const cart = await prisma.cart.create({
    data
  });

  return cart;
};

export const listCarts = async () => {
  return prisma.cart.findMany();
};

export const searchCartById = async (id) => {
  const foundCart = await prisma.cart.findUnique({ where: { id } });
  if (!foundCart) {
    const err = new Error("No existe carro con ese ID");
    err.status = 404;
    throw err;
  }
  return foundCart;
};

export const deleteCart = async (id) => {
  const foundCart = await prisma.cart.findUnique({ where: { id } });
  if (!foundCart) {
    const err = new Error("No existe carrito con ese ID");
    err.status = 404;
    throw err;
  }
  return prisma.cart.delete({ where: { id } });
};

export const updateCart = async ({ id, data }) => {
  const foundCart = await prisma.cart.findUnique({ where: { id } });
  if (!foundCart) {
    const err = new Error("No existe carro con ese ID");
    err.status = 404;
    throw err;
  }

  return prisma.cart.update({
    where: { id },
    data,
  });
};
