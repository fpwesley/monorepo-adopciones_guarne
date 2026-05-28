import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Animal } from '../models/animal.model';

@Injectable({ providedIn: 'root' })
export class MascotasService {
  private api = 'http://localhost:3000/api/animales';

  constructor(private http: HttpClient) {}

  getMascotas(): Observable<Animal[]> {
    return this.http.get<{ ok: boolean; data: Animal[] }>(this.api).pipe(map(r => r.data));
  }

  getMascotaPorSlug(slug: string): Observable<Animal> {
    return this.http.get<{ ok: boolean; data: Animal }>(`${this.api}/${slug}`).pipe(map(r => r.data));
  }

  crearMascota(animal: Animal): Observable<Animal> {
    return this.http.post<{ ok: boolean; data: Animal }>(this.api, animal).pipe(map(r => r.data));
  }

  actualizarMascota(slug: string, animal: Partial<Animal>): Observable<Animal> {
    return this.http.put<{ ok: boolean; data: Animal }>(`${this.api}/${slug}`, animal).pipe(map(r => r.data));
  }

  eliminarMascota(slug: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${slug}`);
  }

  generarSlug(nombre: string): string {
    const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
    const base = nombre.toLowerCase().trim()
      .replace(/\s+/g, '-')
      .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
      .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
      .replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
      .replace(/[^a-z0-9-]/g, '');
    return `${base}-${numeroAleatorio}`;
  }
}
