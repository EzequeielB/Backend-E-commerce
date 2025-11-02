import {
  createUser,
  del,
  list,
  login,
  register,
  searchById,
  update,
} from "../services/userServices.js";

export const createUserController = async (req, res, next) => {
  try {
    const { user_name, email, password, extraRoles } = req.body;

    const user = await createUser({
      user_name,
      email,
      password,
      extraRoles: Array.isArray(extraRoles) ? extraRoles : [],
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
      user,
    });
  } catch (err) {
    next(err);
  }
};


export const userRegister = async (req, res, next) => {
  try {
    const { user_name, email, password, extraRoles } = req.body;
    await register({ user_name, email, password, extraRoles });
    res.status(201).json({
      message: "Usuario registrado correctamente",
    });
  } catch (err) {
    next(err);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { user_name, password } = req.body;
    const result = await login({ user_name, password });
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const result = await list();
    res.status(200).json({
      message: "Usuarios encontrados",
      users: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await searchById(id);
    res.status(200).json({ message: "Usuario encontrado", user: result });
  } catch (err) {
    next(err);
  }
};

export const userUpdate = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { data } = req.body;
    const result = await update({ id, data });
    res.status(200).json({ message: "Usuario actualizado", user: result });
  } catch (err) {
    next(err);
  }
};

export const userDelete = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await del(id);
    res.status(200).json({ message: "Usuario eliminado", user: result });
  } catch (err) {
    next(err);
  }
};
