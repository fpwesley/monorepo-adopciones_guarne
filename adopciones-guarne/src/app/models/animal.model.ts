export interface Animal {
  id?: number;
  nombre: string;
  sexo: 'Macho' | 'Hembra';
  raza: string;
  tipo: 'perro' | 'gato' | 'otro';
  tamano: 'pequeno' | 'mediano' | 'grande';
  imagen: string;
  edad: string;
  descripcion: string;
  estado: 'enAdopcion' | 'adoptado';
  slug: string;
}
