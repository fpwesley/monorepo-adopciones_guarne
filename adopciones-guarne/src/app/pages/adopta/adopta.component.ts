import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MascotasService } from '../../services/mascotas.service';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-adopta',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink],
  templateUrl: './adopta.component.html'
})
export class AdoptaComponent implements OnInit {
  mascotas: Animal[] = [];
  filtroEspecie = signal<string>('todos');
  filtroTamano = signal<string>('todos');
  filtroSexo = signal<string>('todos');

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    this.mascotasService.getMascotas().subscribe(data => this.mascotas = data);
  }

  setEspecie(valor: string): void { this.filtroEspecie.set(valor); }
  setTamano(valor: string): void { this.filtroTamano.set(valor); }
  setSexo(valor: string): void { this.filtroSexo.set(valor); }

  animalesFiltrados(): Animal[] {
    return this.mascotas.filter(animal => {
      const coincideEspecie = this.filtroEspecie() === 'todos' || animal.tipo === this.filtroEspecie();
      const coincideTamano = this.filtroTamano() === 'todos' || animal.tamano === this.filtroTamano();
      const coincideSexo = this.filtroSexo() === 'todos' || animal.sexo.toLowerCase() === this.filtroSexo();
      return coincideEspecie && coincideTamano && coincideSexo && animal.estado === 'enAdopcion';
    });
  }
}
