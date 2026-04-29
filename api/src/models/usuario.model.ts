export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  edad: number;
  activo: boolean;
  creadoEn: string;
}

export type CrearUsuarioDto = Omit<Usuario, 'id' | 'creadoEn' | 'activo'>;
export type ActualizarUsuarioDto = Partial<CrearUsuarioDto>;