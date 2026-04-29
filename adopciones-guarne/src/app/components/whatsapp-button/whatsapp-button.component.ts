import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  template: `
    <a href="https://wa.me/573242790914"
       target="_blank"
       class="btn-whatsapp-flotante"
       title="Contáctanos por WhatsApp">
      <img src="assets/img/whatsapp-color.svg" width="30" height="30" alt="WhatsApp">
    </a>
  `
})
export class WhatsappButtonComponent {}
