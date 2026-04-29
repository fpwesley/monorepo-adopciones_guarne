import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ADMIN_KEY = 'adminUser';
  private readonly SESSION_KEY = 'adminLoggedIn';

  constructor() {
    // Inicializar usuario admin por defecto si no existe
    if (!localStorage.getItem(this.ADMIN_KEY)) {
      localStorage.setItem(this.ADMIN_KEY, JSON.stringify({ user: 'admin', password: 'admin123' }));
    }
  }

  login(user: string, password: string): boolean {
    const adminUser = JSON.parse(localStorage.getItem(this.ADMIN_KEY) || '{}');
    if (user === adminUser.user && password === adminUser.password) {
      localStorage.setItem(this.SESSION_KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.SESSION_KEY) === 'true';
  }
}
