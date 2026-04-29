import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './quienes-somos.component.html'
})
export class QuienesSomosComponent {

  valores = [
    { icono: 'bi-heart', titulo: 'Amor', texto: 'Cada animal merece ser tratado con afecto y dignidad.' },
    { icono: 'bi-shield-check', titulo: 'Responsabilidad', texto: 'Promovemos la tenencia responsable en nuestra comunidad.' },
    { icono: 'bi-people', titulo: 'Comunidad', texto: 'Trabajamos juntos por un Guarne más humano y compasivo.' },
    { icono: 'bi-star', titulo: 'Compromiso', texto: 'No descansamos hasta que cada animal encuentre su hogar.' }
  ];
}
