import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contactanos.component.html'
})
export class ContactanosComponent {

  contactForm: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulario enviado:', this.contactForm.value);
      this.enviado = true;
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  get nombre() { return this.contactForm.get('nombre'); }
  get email() { return this.contactForm.get('email'); }
  get mensaje() { return this.contactForm.get('mensaje'); }
}
