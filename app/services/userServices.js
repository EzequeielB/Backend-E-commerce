import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/index.js";
import { SECRET } from "../globals/globalConstans.js";

const prisma = new PrismaClient();

export const register = async ({ user_name, email, password }) => {
  const usedData = await prisma.user.findFirst({
    where: {
      OR: [{ user_name }, { email }],
    },
  });

  if (usedData) {
    const err = new Error("El usuario o email ya están registrados");
    err.status = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      user_name,
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const login = async ({ user_name, password }) => {
  const user = await prisma.user.findUnique({
    where: { user_name },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const err = new Error("Usuario o contraseña incorrectos");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign({ id: user.id, username: user.user_name }, SECRET, {
    expiresIn: "1h",
  });

  const { password: _, ...userData } = user;

  return { user: userData, token };
};

export const searchById = async (id) => {
  const foundUser = await prisma.user.findUnique({ where: { id } });
  if (!foundUser) {
    const err = new Error("No existe usuario con ese ID");
    err.status = 404;
    throw err;
  }
  return foundUser;
};

export const list = async () => prisma.user.findMany();

export const del = async (id) => {
  const foundUser = await prisma.user.findUnique({ where: { id } });
  if (!foundUser) {
    const err = new Error("No existe usuario con ese ID");
    err.status = 404;
    throw err;
  }
  return prisma.user.delete({ where: { id } });
};

export const update = async ({ id, data }) => {
  const foundUser = await prisma.user.findUnique({ where: { id } });
  if (!foundUser) {
    const err = new Error("No existe usuario con ese ID");
    err.status = 404;
    throw err;
  }
  return prisma.user.update({ where: { id }, data });
};
