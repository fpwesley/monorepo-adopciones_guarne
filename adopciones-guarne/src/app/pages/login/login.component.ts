import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  usuario = '';
  password = '';
  error = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    document.body.style.paddingTop = '0';
  }

  ngOnDestroy(): void {
    document.body.style.paddingTop = '70px';
  }

  onSubmit(): void {
    this.error = false;
    if (this.authService.login(this.usuario, this.password)) {
      this.router.navigate(['/admin']);
    } else {
      this.error = true;
    }
  }
}
