import { pool } from '../db';

export interface Animal {
  id?: number;
  nombre: string;
  sexo: string;
  raza: string;
  tipo: string;
  tamano: string;
  imagen: string;
  edad: string;
  descripcion: string;
  estado: string;
  slug: string;
}

export class AnimalesService {

  async getAll(): Promise<Animal[]> {
    const { rows } = await pool.query('SELECT * FROM animales ORDER BY id ASC');
    return rows;
  }

  async getBySlug(slug: string): Promise<Animal | null> {
    const { rows } = await pool.query('SELECT * FROM animales WHERE slug = $1', [slug]);
    return rows[0] || null;
  }

  async create(animal: Animal): Promise<Animal> {
    const { rows } = await pool.query(
      `INSERT INTO animales (nombre, sexo, raza, tipo, tamano, imagen, edad, descripcion, estado, slug)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [animal.nombre, animal.sexo, animal.raza, animal.tipo, animal.tamano,
       animal.imagen, animal.edad, animal.descripcion, animal.estado, animal.slug]
    );
    return rows[0];
  }

  async update(slug: string, animal: Partial<Animal>): Promise<Animal | null> {
    const { rows } = await pool.query(
      `UPDATE animales SET
        nombre=$1, sexo=$2, raza=$3, tipo=$4, tamano=$5,
        imagen=$6, edad=$7, descripcion=$8, estado=$9
       WHERE slug=$10 RETURNING *`,
      [animal.nombre, animal.sexo, animal.raza, animal.tipo, animal.tamano,
       animal.imagen, animal.edad, animal.descripcion, animal.estado, slug]
    );
    return rows[0] || null;
  }

  async delete(slug: string): Promise<boolean> {
    const { rowCount } = await pool.query('DELETE FROM animales WHERE slug = $1', [slug]);
    return (rowCount ?? 0) > 0;
  }
}
