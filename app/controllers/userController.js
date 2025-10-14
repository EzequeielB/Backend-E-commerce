import {
  del,
  list,
  login,
  register,
  searchById,
  update,
} from "../services/userServices.js";

export const userRegister = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;
    const result = await register({ user_name, email, password });
    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const result = await login({ user_name, password });
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      ...result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const result = await list();
    res.status(200).json({
      message: "Usuarios encontrados",
      users: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const userById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await searchById({ id });
    res.status(200).json({ message: "Usuario encontrado", user: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { data } = req.body;
    const result = await update({ id, data });
    res.status(200).json({ message: "Usuario actualizado", user: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const userDelete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await del({ id });
    res.status(200).json({ message: "Usuario eliminado", user: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
