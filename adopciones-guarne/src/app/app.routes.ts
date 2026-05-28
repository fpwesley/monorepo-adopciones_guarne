import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdoptaComponent } from './pages/adopta/adopta.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { DetalleMascotaComponent } from './pages/detalle-mascota/detalle-mascota.component'; // NUEVO COMPONENTE
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adopta', component: AdoptaComponent },
  { path: 'mascota/:id', component: DetalleMascotaComponent }, //nuevo compo
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
