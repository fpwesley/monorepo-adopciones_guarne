import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [NgFor],
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  tarjetas = [
    { icono: 'bi-house-heart', titulo: 'Gestión de Mascotas', descripcion: 'Agregar, editar o eliminar animales en adopción.' },
    { icono: 'bi-people', titulo: 'Solicitudes de Adopción', descripcion: 'Revisar y gestionar las solicitudes recibidas.' },
    { icono: 'bi-chat-dots', titulo: 'Mensajes de Contacto', descripcion: 'Ver mensajes enviados desde el formulario de contacto.' },
    { icono: 'bi-bar-chart', titulo: 'Estadísticas', descripcion: 'Resumen de adopciones, rescates y donantes.' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    document.body.style.paddingTop = '0';
  }

  ngOnDestroy(): void {
    document.body.style.paddingTop = '70px';
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
