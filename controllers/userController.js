import User from '../models/User.js';
import { generateToken } from '../jwt/Jwt.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username já está em uso' });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar conta', error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    const token = generateToken(user);
    res.status(200).json({
      message: 'Login realizado com sucesso',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    const newToken = generateToken(user);
    res.status(200).json({
      message: 'Token renovado com sucesso',
      token: newToken
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao renovar token', error: error.message });
  }
};
