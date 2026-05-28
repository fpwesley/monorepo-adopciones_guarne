import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf, UpperCasePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MascotasService } from '../../services/mascotas.service';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, UpperCasePipe, NgClass],
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  tarjetas = [
    { icono: 'bi-house-heart', titulo: 'Gestión de Mascotas', descripcion: 'Agregar, editar o eliminar animales en adopción.' },
    { icono: 'bi-people', titulo: 'Solicitudes de Adopción', descripcion: 'Revisar y gestionar las solicitudes recibidas.' },
    { icono: 'bi-chat-dots', titulo: 'Mensajes de Contacto', descripcion: 'Ver mensajes enviados desde el formulario de contacto.' },
    { icono: 'bi-bar-chart', titulo: 'Estadísticas', descripcion: 'Resumen de adopciones, rescates y donantes.' }
  ];

  mascotas: Animal[] = [];
  mostrarFormulario = false;
  editandoSlug: string | null = null;
  slugPreview = '';

  formMascota: Animal = {
    nombre: '', sexo: 'Macho', raza: '', tipo: 'perro',
    tamano: 'mediano', imagen: '', edad: '', descripcion: '',
    estado: 'enAdopcion', slug: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private mascotasService: MascotasService
  ) {}

  ngOnInit(): void {
    document.body.style.paddingTop = '0';
    this.cargarMascotas();
  }

  ngOnDestroy(): void {
    document.body.style.paddingTop = '70px';
  }

  cargarMascotas(): void {
    this.mascotasService.getMascotas().subscribe(data => this.mascotas = data);
  }

  abrirAgregar(): void {
    this.editandoSlug = null;
    this.formMascota = { nombre: '', sexo: 'Macho', raza: '', tipo: 'perro', tamano: 'mediano', imagen: '', edad: '', descripcion: '', estado: 'enAdopcion', slug: '' };
    this.slugPreview = '';
    this.mostrarFormulario = true;
  }

  abrirEditar(animal: Animal): void {
    this.editandoSlug = animal.slug;
    this.formMascota = { ...animal };
    this.slugPreview = animal.slug;
    this.mostrarFormulario = true;
  }

  actualizarSlugPreview(): void {
    if (!this.editandoSlug && this.formMascota.nombre.trim()) {
      const base = this.formMascota.nombre.toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
        .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
        .replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
        .replace(/[^a-z0-9-]/g, '');
      this.slugPreview = `${this.formMascota.tipo}-${base}`;
    } else if (!this.editandoSlug) {
      this.slugPreview = '';
    }
  }

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const reader = new FileReader();
    reader.onload = () => { this.formMascota.imagen = reader.result as string; };
    reader.readAsDataURL(input.files[0]);
  }

  guardarMascota(): void {
    if (this.editandoSlug) {
      this.mascotasService.actualizarMascota(this.editandoSlug, this.formMascota).subscribe(() => {
        this.mostrarFormulario = false;
        this.cargarMascotas();
      });
    } else {
      this.formMascota.slug = this.mascotasService.generarSlug(this.formMascota.nombre);
      this.mascotasService.crearMascota(this.formMascota).subscribe(() => {
        this.mostrarFormulario = false;
        this.cargarMascotas();
      });
    }
  }

  eliminarMascota(slug: string): void {
    this.mascotasService.eliminarMascota(slug).subscribe(() => this.cargarMascotas());
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
