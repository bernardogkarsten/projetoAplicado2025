const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../middlewares/authMiddleware');

// Criar novo pedido (requer autenticação)
router.post('/pedidos', auth, pedidoController.criarPedido);

// Listar todos os pedidos (requer autenticação)
router.get('/pedidos', auth, pedidoController.listarPedidos);

// Filtrar pedidos por cliente, motoboy ou status (requer autenticação)
router.get('/pedidos/filtro', auth, pedidoController.filtrarPedidos);

// Atualizar status de pedido e salvar histórico (requer autenticação)
router.put('/pedidos/status', auth, pedidoController.atualizarStatus);

// Ver histórico de um pedido (requer autenticação)
router.get('/pedidos/:id_pedido/historico', auth, pedidoController.historicoPedido);

//mudar status
router.put('/pedidos/mudarStatus', auth, pedidoController.mudarStatus);

module.exports = router;