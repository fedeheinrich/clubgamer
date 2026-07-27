const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad
app.use(helmet());

// Orígenes permitidos
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CORS_ORIGIN
].filter(Boolean);

// CORS
app.use(
  cors({
    origin(origin, callback) {
      // Permite solicitudes sin Origin, como Postman o health checks.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origen no permitido por CORS'));
    },
    credentials: true
  })
);

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rutas de la API
app.use('/api', routes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Manejo general de errores
app.use((err, req, res, next) => {
  console.error(err.stack || err);

  if (err.message === 'Origen no permitido por CORS') {
    return res.status(403).json({
      success: false,
      error: 'Origen no permitido por CORS'
    });
  }

  return res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Internal server error'
  });
});

// Inicializar servidor
async function startServer() {
  try {
    await sequelize.authenticate();

    console.log('✅ Database connection established successfully.');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(
        `📝 Environment: ${process.env.NODE_ENV || 'development'}`
      );
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

startServer();

// Cierre controlado
async function shutdown(signal) {
  console.log(`${signal} received, shutting down gracefully`);

  try {
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error closing database:', error);
  }

  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = app;