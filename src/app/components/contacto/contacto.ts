import { Component } from '@angular/core';
// FormsModule habilita el binding bidireccional [(ngModel)] en el template
import { FormsModule } from '@angular/forms';
// CommonModule provee *ngIf para mostrar/ocultar mensajes de estado
import { CommonModule } from '@angular/common';
// Importamos el servicio para hacer la petición POST al backend PHP
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class ContactoComponent {
  // Objeto que almacena los valores de los campos del formulario
  // [(ngModel)] mantiene estos valores sincronizados con los inputs del HTML
  formData = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  // Contador de caracteres del textarea del mensaje
  mensajeContador = 0;
  // Color del contador: se vuelve dorado al acercarse al límite de 1000 caracteres
  mensajeColor = '#8a8070';

  // Estados para controlar la interfaz durante el envío del formulario
  enviando = false;      // true mientras espera respuesta del servidor
  enviado = false;       // true si el servidor confirmó que guardó el mensaje
  errorEnvio = '';       // Mensaje de error si la petición falla

  // Angular inyecta ApiService en el constructor automáticamente
  constructor(private apiService: ApiService) {}

  // Se ejecuta cada vez que el usuario escribe en el textarea del mensaje
  onMensajeInput(): void {
    this.mensajeContador = this.formData.mensaje.length;
    // Cambia el color del contador a dorado cuando supera los 900 caracteres
    this.mensajeColor = this.mensajeContador > 900 ? '#c9a84c' : '#8a8070';
  }

  // Se ejecuta cuando el usuario envía el formulario (evento ngSubmit del form)
  onSubmit(): void {
    const { nombre, email, mensaje } = this.formData;

    // Validación básica: verifica que ningún campo esté vacío antes de enviar
    if (!nombre || !email || !mensaje) {
      this.errorEnvio = 'Por favor completa todos los campos.';
      return; // Detiene la ejecución si hay campos vacíos
    }

    // Reiniciamos estados anteriores al iniciar un nuevo envío
    this.enviando = true;
    this.errorEnvio = '';
    this.enviado = false;

    // Llamamos al servicio que hace el POST al backend PHP con los datos del formulario
    this.apiService.enviarContacto({ nombre, email, mensaje }).subscribe({
      // next se ejecuta cuando el servidor PHP responde con éxito
      next: (respuesta) => {
        this.enviando = false;
        if (respuesta.success) {
          this.enviado = true;  // Mostramos el mensaje de éxito en el template
          // Limpiamos el formulario después de un envío exitoso
          this.formData = { nombre: '', email: '', mensaje: '' };
          this.mensajeContador = 0;
        } else {
          // El servidor respondió pero indicó un error (ej: email inválido en el servidor)
          this.errorEnvio = respuesta.mensaje;
        }
      },
      // error se ejecuta si hubo un fallo de red o el servidor devolvió un código de error HTTP
      error: () => {
        this.enviando = false;
        this.errorEnvio = 'Error al conectar con el servidor. Intente más tarde.';
      }
    });
  }
}