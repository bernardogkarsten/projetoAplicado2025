const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const userRoutes = require('./src/routes/userRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');
const motoboyRoutes = require('./src/routes/motoboyRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pasta de uploads (se necessário)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas da API
app.use('/api', loginRoutes);
app.use('/api', userRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', motoboyRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
