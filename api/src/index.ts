import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios.routes';

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mensaje: 'API funcionando' });
});

app.use('/api/usuarios', usuariosRoutes);

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});