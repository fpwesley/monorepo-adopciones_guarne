import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgIf, NgClass } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MascotasService } from '../../services/mascotas.service';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-detalle-mascota',
  standalone: true,
  imports: [CommonModule, NgIf, NgClass, RouterModule],
  templateUrl: './detalle-mascota.component.html',
  styleUrl: './detalle-mascota.component.css'
})
export class DetalleMascotaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private mascotasService = inject(MascotasService);

  mascota = signal<Animal | undefined>(undefined);
  mascotasSugeridas = signal<Animal[]>([]);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('id');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (!slug) { this.mascota.set(undefined); return; }

      this.mascotasService.getMascotaPorSlug(slug).subscribe({
        next: (animal) => {
          this.mascota.set(animal);
          // load suggestions
          this.mascotasService.getMascotas().subscribe(todas => {
            const mismoTipo = todas.filter(a => a.slug !== slug && a.estado === 'enAdopcion' && a.tipo === animal.tipo);
            const otros = todas.filter(a => a.slug !== slug && a.estado === 'enAdopcion' && a.tipo !== animal.tipo);
            this.mascotasSugeridas.set([...mismoTipo, ...otros].slice(0, 3));
          });
        },
        error: () => this.mascota.set(undefined)
      });
    });
  }
}
