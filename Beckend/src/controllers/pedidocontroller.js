
const pool = require('../config/db');

// Criar novo pedido
exports.criarPedido = async (req, res, next) => {
  try {
    const { cliente_id, peso, distancia_km, tempo_estimado } = req.body;

    const [[{ preco }]] = await pool.query(
      'SELECT calcular_preco(?, ?, ?) AS preco',
      [peso, distancia_km, tempo_estimado]
    );

    const [result] = await pool.query(
      `INSERT INTO Pedidos (cliente_id, peso, distancia_km, tempo_estimado, preco)
       VALUES (?, ?, ?, ?, ?)`,
      [cliente_id, peso, distancia_km, tempo_estimado, preco]
    );

    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status)
       VALUES (?, 'criado')`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      id_pedido: result.insertId
    });
  } catch (err) {
    next(err);
  }
};

// Buscar todos os pedidos
exports.listarPedidos = async (req, res, next) => {
  try {
    const [pedidos] = await pool.query('SELECT * FROM Pedidos');
    res.json({ success: true, data: pedidos });
  } catch (err) {
    next(err);
  }
};

// Filtrar por cliente, motoboy ou status
exports.filtrarPedidos = async (req, res, next) => {
  try {
    const { cliente_id, motoboy_id, status } = req.query;
    let query = 'SELECT * FROM Pedidos WHERE 1=1';
    const params = [];

    if (cliente_id) {
      query += ' AND cliente_id = ?';
      params.push(cliente_id);
    }

    if (motoboy_id) {
      query += ' AND motoboy_id = ?';
      params.push(motoboy_id);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    const [result] = await pool.query(query, params);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// Atualizar status do pedido e salvar histórico
exports.atualizarStatus = async (req, res, next) => {
  try {
    const { id_pedido, status, motoboy_id } = req.body;

    await pool.query(
      `UPDATE Pedidos SET status = ?, motoboy_id = ? WHERE id_pedido = ?`,
      [status, motoboy_id || null, id_pedido]
    );

    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status)
       VALUES (?, ?)`,
      [id_pedido, status]
    );

    res.json({ success: true, message: 'Status atualizado com sucesso' });
  } catch (err) {
    next(err);
  }
};

// Obter histórico de entregas de um pedido
exports.historicoPedido = async (req, res, next) => {
  try {
    const { id_pedido } = req.params;
    const [historico] = await pool.query(
      'SELECT * FROM HistoricoEntregas WHERE pedido_id = ? ORDER BY data_mudanca',
      [id_pedido]
    );
    res.json({ success: true, data: historico });
  } catch (err) {
    next(err);
  }
};

// mudar status do pedido 
exports.mudarStatus = async (req, res, next) => {
  try {
    const { id_pedido, status, motoboy_id } = req.body;

    if (!id_pedido || !status) {
      return res.status(400).json({ success: false, message: 'id_pedido e status são obrigatórios' });
    }

    await pool.query(
      `UPDATE Pedidos SET status = ?, motoboy_id = ? WHERE id_pedido = ?`,
      [status, motoboy_id || null, id_pedido]
    );

    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, ?)`,
      [id_pedido, status]
    );

    res.json({ success: true, message: 'Status do pedido atualizado com sucesso' });
  } catch (err) {
    next(err);
  }
};