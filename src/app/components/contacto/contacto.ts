import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class ContactoComponent {
  formData = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  mensajeContador = 0;
  mensajeColor = '#8a8070';

  onMensajeInput(): void {
    this.mensajeContador = this.formData.mensaje.length;
    this.mensajeColor = this.mensajeContador > 900 ? '#c9a84c' : '#8a8070';
  }

  onSubmit(): void {
    const { nombre, email, mensaje } = this.formData;
    if (nombre && email && mensaje) {
      alert('¡Mensaje enviado con éxito!, recuerda estar atento a tu email');
      this.formData = { nombre: '', email: '', mensaje: '' };
      this.mensajeContador = 0;
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}