import { Component } from '@angular/core';
// FormsModule habilita [(ngModel)] para el binding bidireccional del formulario
import { FormsModule } from '@angular/forms';
// CommonModule provee *ngIf para mostrar/ocultar mensajes de estado
import { CommonModule } from '@angular/common';
// RouterLink permite navegar entre rutas desde el template con [routerLink]
import { RouterLink } from '@angular/router';
// Importamos el servicio centralizado que maneja las peticiones HTTP al PHP
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminComponent {
  // Objeto que almacena los valores del formulario de nuevo proyecto
  // Cada propiedad está enlazada con [(ngModel)] a un input del template
  formData = {
    num: '',          // Número del proyecto (ej: "04")
    nombre: '',       // Nombre del proyecto
    descripcion: '',  // Descripción del proyecto
  };

  // Estados para controlar la interfaz mientras se guarda el proyecto
  guardando = false;   // true mientras espera respuesta del PHP
  guardado = false;    // true si el PHP confirmó que se guardó en MySQL
  errorGuardar = '';   // Mensaje de error si algo falla

  // Angular inyecta ApiService automáticamente gracias a la inyección de dependencias
  constructor(private apiService: ApiService) {}

  // Se ejecuta cuando el usuario envía el formulario (evento ngSubmit)
  onGuardar(): void {
    const { num, nombre, descripcion } = this.formData;

    // Validación: todos los campos son obligatorios
    if (!num || !nombre || !descripcion) {
      this.errorGuardar = 'Por favor completa todos los campos.';
      return; // Detiene la ejecución si hay campos vacíos
    }

    // Reiniciamos estados anteriores antes de un nuevo intento
    this.guardando = true;
    this.errorGuardar = '';
    this.guardado = false;

    // Llamamos al método del servicio que hace POST al backend PHP
    this.apiService.crearProyecto({ num, nombre, descripcion }).subscribe({
      // next se ejecuta cuando el PHP responde exitosamente
      next: (respuesta) => {
        this.guardando = false;
        if (respuesta.success) {
          this.guardado = true;  // Mostramos mensaje de éxito
          // Limpiamos el formulario para poder agregar otro proyecto
          this.formData = { num: '', nombre: '', descripcion: '' };
        } else {
          // El servidor respondió pero con un error de lógica (ej: num duplicado)
          this.errorGuardar = respuesta.mensaje;
        }
      },
      // error se ejecuta si hay fallo de red o el servidor devuelve código de error HTTP
      error: () => {
        this.guardando = false;
        this.errorGuardar = 'Error al conectar con el servidor. Intente más tarde.';
      },
    });
  }
}
