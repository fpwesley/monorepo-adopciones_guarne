import { Usuario } from '../models/usuario.model';

export const usuarios: Usuario[] = [
  {
    id: '1',
    nombre: 'Ana García',
    email: 'ana.garcia@email.com',
    edad: 28,
    activo: true,
    creadoEn: new Date().toISOString(),
  },
  {
    id: '2',
    nombre: 'Carlos López',
    email: 'carlos.lopez@email.com',
    edad: 34,
    activo: true,
    creadoEn: new Date().toISOString(),
  }
];