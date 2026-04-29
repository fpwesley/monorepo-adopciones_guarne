import { Router, Request, Response } from 'express';
import { UsuariosService } from '../services/usuarios.service';

const router = Router();
const service = new UsuariosService();

// GET /api/usuarios — obtener todos
router.get('/', (_req: Request, res: Response) => {
  const data = service.getAll();
  res.json({ ok: true, total: data.length, data });
});

// GET /api/usuarios/:id — obtener uno por ID
router.get('/:id', (req: Request, res: Response) => {
  const usuario = service.getById(req.params.id);
  if (!usuario) {
    res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
    return;
  }
  res.json({ ok: true, data: usuario });
});

// POST /api/usuarios — crear usuario
router.post('/', (req: Request, res: Response) => {
  const { nombre, email, edad } = req.body;
  if (!nombre || !email || edad === undefined) {
    res.status(400).json({ ok: false, mensaje: 'Campos requeridos: nombre, email, edad' });
    return;
  }
  try {
    const nuevo = service.create({ nombre, email, edad });
    res.status(201).json({ ok: true, data: nuevo });
  } catch (err: any) {
    res.status(409).json({ ok: false, mensaje: err.message });
  }
});

// DELETE /api/usuarios/:id — eliminar usuario
router.delete('/:id', (req: Request, res: Response) => {
  const eliminado = service.delete(req.params.id);
  if (!eliminado) {
    res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
    return;
  }
  res.json({ ok: true, mensaje: 'Usuario eliminado correctamente' });
});

export default router;