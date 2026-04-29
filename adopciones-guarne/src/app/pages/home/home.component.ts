import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor, NgClass],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  cifras = [
    { numero: '+1000', label: 'Animales rescatados' },
    { numero: '+850', label: 'Adoptados con éxito' },
    { numero: '+500', label: 'Donantes' },
    { numero: '+10', label: 'Años de servicio' }
  ];

  servicios = [
    { icono: 'bi-heart-pulse', titulo: 'Consultas veterinarias gratuitas', items: ['Desparasitación', 'Vacunación antirrábica'], cta: false },
    { icono: 'bi-scissors', titulo: 'Esterilización gratuita', items: ['De acuerdo a programación'], cta: false },
    { icono: 'bi-house-heart', titulo: 'Adopción de mascotas', items: ['Caninos', 'Felinos'], cta: false },
    { icono: 'bi-megaphone', titulo: 'Denuncias de atropellamientos', items: ['Casos de maltrato animal', 'Tráfico de especies silvestres'], cta: false },
    { icono: 'bi-people', titulo: '¿Cómo puedes ayudar?', items: ['Esterilizando', 'Adoptando', 'Donaciones no monetarias'], cta: true }
  ];

  pasos = [
    { numero: 1, icono: 'bi-search-heart', titulo: 'Elige tu compañero', texto: 'Navega por nuestro catálogo de mascotas disponibles y encuentra al que roba tu corazón.' },
    { numero: 2, icono: 'bi-whatsapp', titulo: 'Contáctanos', texto: 'Escríbenos por WhatsApp o visítanos en el albergue para conocer más sobre el animal.' },
    { numero: 3, icono: 'bi-clipboard-check', titulo: 'Proceso de adopción', texto: 'Completamos un formulario sencillo para asegurarnos de que el animal va a un hogar amoroso.' },
    { numero: 4, icono: 'bi-house-heart', titulo: '¡Llévalo a casa!', texto: 'Tu nuevo compañero va a casa contigo. Una nueva vida comienza para los dos.' }
  ];

  carouselImages = [
    { src: 'assets/img/Fotogrupal.jpeg', alt: 'Foto grupal' },
    { src: 'assets/img/jornada.png', alt: 'Jornada' },
    { src: 'assets/img/Carousel2.png', alt: 'Carousel' }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      const carouselEl = document.getElementById('carouselHome');
      if (carouselEl && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(carouselEl, { interval: 4000 });
      }
    }, 0);
  }
}
