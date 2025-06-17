const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const path = require('path');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Expor pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api', userRoutes);
app.use('/api', pedidoRoutes);

// Middleware de erro
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${3000}`);
});
