// OnInit es el ciclo de vida donde se realizan las peticiones iniciales de datos
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos el servicio y la interfaz ProyectoVenta desde el servicio centralizado
import { ApiService, ProyectoVenta } from '../../services/api.service';

@Component({
  selector: 'app-venta',
  standalone: true,
  // CommonModule provee *ngFor y *ngIf necesarios en el template
  imports: [CommonModule],
  templateUrl: './venta.html',
  styleUrls: ['./venta.css']
})
export class VentaComponent implements OnInit {
  // Array que almacenará los proyectos en venta recibidos del backend PHP
  proyectosVenta: ProyectoVenta[] = [];

  // Controla la visibilidad del indicador de carga
  cargando = true;

  // Mensaje de error en caso de fallo en la petición HTTP
  error = '';

  // Angular inyecta ApiService gracias al sistema de inyección de dependencias
  constructor(private apiService: ApiService) {}

  // Se ejecuta automáticamente al inicializar el componente
  ngOnInit(): void {
    this.apiService.getVentas().subscribe({
      // next recibe los datos exitosamente devueltos por el PHP
      next: (datos) => {
        this.proyectosVenta = datos;  // Asignamos los datos a la tabla
        this.cargando = false;
      },
      // error captura fallos de red o respuestas de error del servidor
      error: () => {
        this.error = 'No se pudieron cargar los proyectos en venta. Intente más tarde.';
        this.cargando = false;
      }
    });
  }
}