import { Router, Request, Response } from 'express';
import { AnimalesService } from '../services/animales.service';

const router = Router();
const service = new AnimalesService();

// GET /api/animales
router.get('/', async (_req: Request, res: Response) => {
  const data = await service.getAll();
  res.json({ ok: true, total: data.length, data });
});

// GET /api/animales/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  const animal = await service.getBySlug(req.params.slug);
  if (!animal) {
    res.status(404).json({ ok: false, mensaje: 'Animal no encontrado' });
    return;
  }
  res.json({ ok: true, data: animal });
});

// POST /api/animales
router.post('/', async (req: Request, res: Response) => {
  const { nombre, sexo, raza, tipo, tamano, imagen, edad, descripcion, estado, slug } = req.body;
  if (!nombre || !sexo || !raza || !tipo || !tamano || !slug) {
    res.status(400).json({ ok: false, mensaje: 'Campos requeridos: nombre, sexo, raza, tipo, tamano, slug' });
    return;
  }
  try {
    const nuevo = await service.create({ nombre, sexo, raza, tipo, tamano, imagen, edad, descripcion, estado: estado || 'enAdopcion', slug });
    res.status(201).json({ ok: true, data: nuevo });
  } catch (err: any) {
    res.status(409).json({ ok: false, mensaje: err.message });
  }
});

// PUT /api/animales/:slug
router.put('/:slug', async (req: Request, res: Response) => {
  const actualizado = await service.update(req.params.slug, req.body);
  if (!actualizado) {
    res.status(404).json({ ok: false, mensaje: 'Animal no encontrado' });
    return;
  }
  res.json({ ok: true, data: actualizado });
});

// DELETE /api/animales/:slug
router.delete('/:slug', async (req: Request, res: Response) => {
  const eliminado = await service.delete(req.params.slug);
  if (!eliminado) {
    res.status(404).json({ ok: false, mensaje: 'Animal no encontrado' });
    return;
  }
  res.json({ ok: true, mensaje: 'Animal eliminado' });
});

export default router;
