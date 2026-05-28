import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios.routes';
import animalesRoutes from './routes/animales.routes';
import { initDB } from './db-init';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' })); // 10mb for base64 images

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mensaje: 'API funcionando' });
});

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/animales', animalesRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error iniciando DB:', err);
  process.exit(1);
});
