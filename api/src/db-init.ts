import { pool } from './db';

export async function initDB(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS animales (
      id        SERIAL PRIMARY KEY,
      nombre    TEXT NOT NULL,
      sexo      TEXT NOT NULL,
      raza      TEXT NOT NULL,
      tipo      TEXT NOT NULL,
      tamano    TEXT NOT NULL,
      imagen    TEXT,
      edad      TEXT,
      descripcion TEXT,
      estado    TEXT NOT NULL DEFAULT 'enAdopcion',
      slug      TEXT NOT NULL UNIQUE,
      creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  console.log('✅ Tabla animales lista');
}
