const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cadastro de usuário
exports.signup = async (req, res, next) => {
  try {
    const { nome, cpf, email, senha, telefone, endereco, tipo } = req.body;

    if (!nome || !cpf || !email || !senha || !tipo) {
      return res.status(400).json({ success: false, message: 'Campos obrigatórios ausentes' });
    }

    const [existe] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    if (existe.length > 0) {
      return res.status(400).json({ success: false, message: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const [result] = await pool.query(
      `INSERT INTO Usuarios (nome, cpf, email, senha_hash, telefone, endereco, tipo)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, cpf, email, senhaHash, telefone || '', endereco || '', tipo]
    );

    res.status(201).json({
      success: true,
      message: 'Usuário cadastrado',
      id_usuario: result.insertId
    });

  } catch (err) {
    next(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    const usuario = rows[0];

    if (!usuario) {
      return res.status(401).json({ success: false, message: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        email: usuario.email,
        tipo: usuario.tipo
      },
      process.env.JWT_SECRET || 'segredo123',
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      message: 'Login bem-sucedido',
      token
    });

  } catch (err) {
    next(err);
  }
};

// Listar todos os usuários
exports.getAllUsers = async (req, res, next) => {
  try {
    const [users] = await pool.query('SELECT id_usuario, nome, email, tipo FROM Usuarios');
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

// Atualizar usuário
exports.editarUsuario = async (req, res, next) => {
  try {
    const { id_usuario, nome, telefone, endereco } = req.body;

    await pool.query(
      `UPDATE Usuarios SET nome = ?, telefone = ?, endereco = ? WHERE id_usuario = ?`,
      [nome, telefone, endereco, id_usuario]
    );

    res.json({ success: true, message: 'Usuário atualizado' });
  } catch (err) {
    next(err);
  }
};

// Deletar usuário
exports.deletarUsuario = async (req, res, next) => {
  try {
    const { id_usuario } = req.body;

    await pool.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id_usuario]);

    res.json({ success: true, message: 'Usuário deletado com sucesso' });
  } catch (err) {
    next(err);
  }
};
