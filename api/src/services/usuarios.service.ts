import { v4 as uuidv4 } from 'uuid';
import { ActualizarUsuarioDto, CrearUsuarioDto, Usuario } from "./..models/usuario.model";
import { usuarios } from "../data/usuarios.data";
export class UsuariosService {

  getAll(): Usuario[] {
    return usuarios;
  }

  getById(id: string): Usuario | undefined {return usuarios.find((u) => u.id === id);
  }

  create(dto: CrearUsuarioDto): Usuario {
    // Verificar que el email no esté en uso
    const emailExistente = usuarios.find((u) => u.email === dto.email);
    if (emailExistente) {
      throw new Error(`El email '${dto.email}' ya está registrado`);
    }
    const nuevo: Usuario = {
      id: uuidv4(),  // ID único generado automáticamente
      ...dto,
      activo: true,
      creadoEn: new Date().toISOString(),
    };
    usuarios.push(nuevo);
    return nuevo;
  }

  update(id: string, dto: ActualizarUsuarioDto): Usuario | undefined {
    const index = usuarios.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    if (dto.email) {
      const emailExistente = usuarios.find((u) => u.email === dto.email && u.id !== id);
      if (emailExistente) throw new Error(`El email ya está registrado`);
    }
    usuarios[index] = { ...usuarios[index], ...dto };
    return usuarios[index];
  }

  delete(id: string): boolean {
    const index = usuarios.findIndex((u) => u.id === id);
    if (index === -1) return false;
    usuarios.splice(index, 1);
    return true;
  }

  toggleActivo(id: string): Usuario | undefined {
    const usuario = usuarios.find((u) => u.id === id);
    if (!usuario) return undefined;
    usuario.activo = !usuario.activo;
    return usuario;
  }
}