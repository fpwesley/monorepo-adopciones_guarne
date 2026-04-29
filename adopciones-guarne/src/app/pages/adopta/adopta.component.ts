import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-adopta',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './adopta.component.html'
})
export class AdoptaComponent {

  filtroEspecie = signal<string>('todos');
  filtroTamano = signal<string>('todos');
  filtroSexo = signal<string>('todos');

  animales: Animal[] = [
    { nombre: 'Astro', sexo: 'Macho', raza: 'Pastor Alemán', tipo: 'perro', tamano: 'grande', imagen: 'assets/img/Astro.jpeg' },
    { nombre: 'Mango', sexo: 'Macho', raza: 'Criollo', tipo: 'perro', tamano: 'mediano', imagen: 'assets/img/Mango.jpeg' },
    { nombre: 'Laika', sexo: 'Hembra', raza: 'Labrador', tipo: 'perro', tamano: 'grande', imagen: 'assets/img/Laika.jpeg' },
    { nombre: 'Toto', sexo: 'Macho', raza: 'Criollo', tipo: 'gato', tamano: 'pequeno', imagen: 'assets/img/gato1.jpg' },
    { nombre: 'Luna', sexo: 'Hembra', raza: 'Mestizo', tipo: 'gato', tamano: 'mediano', imagen: 'assets/img/gato2.jpg' },
    { nombre: 'Carla', sexo: 'Hembra', raza: 'Mestizo', tipo: 'gato', tamano: 'pequeno', imagen: 'assets/img/gato3.jpg' }
  ];

  animalesFiltrados = computed(() => {
    const especie = this.filtroEspecie();
    const tamano = this.filtroTamano();
    const sexo = this.filtroSexo();

    return this.animales.filter(a => {
      const cumpleEspecie = especie === 'todos' || a.tipo === especie;
      const cumpleTamano = tamano === 'todos' || a.tamano === tamano;
      const cumpleSexo = sexo === 'todos' || a.sexo.toLowerCase() === sexo;
      return cumpleEspecie && cumpleTamano && cumpleSexo;
    });
  });

  setEspecie(val: string) { this.filtroEspecie.set(val); }
  setTamano(val: string) { this.filtroTamano.set(val); }
  setSexo(val: string) { this.filtroSexo.set(val); }
}
