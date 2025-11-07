import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createCart = async (data) => {
  const { user, items, ...rest } = data;

  return prisma.cart.create({
    data: {
      ...rest,
      usuario: user ? { connect: { id: user.id } } : undefined,
      items: items?.length
        ? {
            create: await Promise.all(
              items.map(async (i) => {
                const uniqueProduct = await prisma.unique_Product.findUnique({
                  where: { id: i.id_uniqueProduct },
                  include: { product: true },
                });
                if (!uniqueProduct) {
                  throw new Error(`Unique_Product con id ${i.id_uniqueProduct} no existe`);
                }
                const unitPrice = uniqueProduct.product?.unit_price ?? 0;
                const offer = uniqueProduct.product?.offer ?? 0;
                const offerApplied = (unitPrice * offer) / 100;
                const subtotal = i.units * (unitPrice - offerApplied);

                return {
                  units: i.units,
                  unit_price: unitPrice,
                  offer_applied: offerApplied,
                  subtotal,
                  uniqueProduct: { connect: { id: i.id_uniqueProduct } },
                };
              })
            ),
          }
        : undefined,
    },
    include: {
      usuario: true,
      items: { include: { uniqueProduct: true } },
    },
  });
};


export const listCarts = async () => {
  return prisma.cart.findMany({
    include: {
      usuario: true,
      items: { include: { uniqueProduct: true } },
    },
  });
};

export const searchCartById = async (id) => {
  const foundCart = await prisma.cart.findUnique({
    where: { id },
    include: { usuario: true, items: { include: { uniqueProduct: true } } },
  });
  if (!foundCart) {
    const err = new Error("No existe carrito con ese ID");
    err.status = 404;
    throw err;
  }
  return foundCart;
};

export const searchCartByUserId = async (userId) => {
  const foundCart = await prisma.cart.findFirst({
    where: { id_user: userId }, 
    include: { usuario: true, items: { include: { uniqueProduct: true } } },
  });
  return foundCart || null;
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
  const { user, items, ...rest } = data;

  const foundCart = await prisma.cart.findUnique({ where: { id } });
  if (!foundCart) {
    const err = new Error("No existe carrito con ese ID");
    err.status = 404;
    throw err;
  }

  return prisma.cart.update({
    where: { id },
    data: {
      ...rest,
      usuario: user ? { connect: { id: user.id } } : undefined,
      items: items?.length
        ? {
            deleteMany: {},
            create: await Promise.all(
              items.map(async (i) => {
                const uniqueProduct = await prisma.unique_Product.findUnique({
                  where: { id: i.id_uniqueProduct },
                  include: { product: true },
                });
                if (!uniqueProduct) {
                  throw new Error(`Unique_Product con id ${i.id_uniqueProduct} no existe`);
                }

                const unitPrice = uniqueProduct.product?.unit_price ?? 0;
                const offer = uniqueProduct.product?.offer ?? 0;
                const offerApplied = (unitPrice * offer) / 100;
                const subtotal = i.units * (unitPrice - offerApplied);

                return {
                  units: i.units,
                  unit_price: unitPrice,
                  offer_applied: offerApplied,
                  subtotal,
                  uniqueProduct: { connect: { id: i.id_uniqueProduct } },
                };
              })
            ),
          }
        : undefined,
    },
    include: {
      usuario: true,
      items: { include: { uniqueProduct: true } },
    },
  });
};
