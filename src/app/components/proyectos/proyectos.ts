// OnInit es un ciclo de vida de Angular que se ejecuta una vez al inicializar el componente
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos el servicio y la interfaz Proyecto desde el servicio centralizado
import { ApiService, Proyecto } from '../../services/api.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  // CommonModule provee directivas como *ngFor y *ngIf en el template
  imports: [CommonModule],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
// Implementamos OnInit para cargar los datos cuando el componente está listo
export class ProyectosComponent implements OnInit {
  // Array que almacenará los proyectos recibidos del backend PHP
  proyectos: Proyecto[] = [];

  // Controla si se muestra el indicador de carga en el template
  cargando = true;

  // Almacena el mensaje de error si la petición HTTP falla
  error = '';

  // Angular inyecta ApiService automáticamente al declararlo en el constructor
  constructor(private apiService: ApiService) {}

  // ngOnInit se ejecuta automáticamente después de que Angular inicializa el componente
  ngOnInit(): void {
    // subscribe() inicia la petición HTTP y recibe la respuesta de forma asíncrona
    this.apiService.getProyectos().subscribe({
      // next se ejecuta cuando la petición es exitosa
      next: (datos) => {
        this.proyectos = datos;  // Guardamos los proyectos recibidos del PHP
        this.cargando = false;   // Ocultamos el indicador de carga
      },
      // error se ejecuta si el servidor no responde o devuelve un error HTTP
      error: () => {
        this.error = 'No se pudieron cargar los proyectos. Intente más tarde.';
        this.cargando = false;
      }
    });
  }
}