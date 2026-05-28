import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappButtonComponent, NgIf],
  template: `
    <ng-container *ngIf="mostrarLayoutPublico">
      <app-navbar></app-navbar>
    </ng-container>
    <router-outlet></router-outlet>
    <ng-container *ngIf="mostrarLayoutPublico">
      <app-footer></app-footer>
      <app-whatsapp-button></app-whatsapp-button>
    </ng-container>
  `
})
export class AppComponent {
  mostrarLayoutPublico = true;
  rutasPrivadas = ['/login', '/admin'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.mostrarLayoutPublico = !this.rutasPrivadas.some(r => e.urlAfterRedirects.startsWith(r));
    });
  }
}
