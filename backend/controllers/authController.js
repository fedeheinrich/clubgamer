const { User } = require('../models');
const { generarToken } = require('../middleware/auth');

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Nombre, email y password son obligatorios' });
    }

    const existente = await User.findOne({ where: { email } });

    if (existente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const user = await User.create({ nombre, email, password });

    const token = generarToken(user);

    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user,
      token
    });
  } catch (error) {
    console.error('Error en register:', error);
    return res.status(500).json({
      error: 'Error al registrar usuario',
      detalle: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password son obligatorios' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordValida = await user.validarPassword(password);

    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generarToken(user);

    return res.status(200).json({
      message: 'Login exitoso',
      user,
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      error: 'Error al iniciar sesión',
      detalle: error.message
    });
  }
};

const perfil = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error en perfil:', error);
    return res.status(500).json({
      error: 'Error al obtener perfil',
      detalle: error.message
    });
  }
};

module.exports = { register, login, perfil };