import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Proyecto } from '../../services/api.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];
  cargando = true;
  error = '';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiService.getProyectos().subscribe({
      next: (datos) => {
        this.proyectos = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar los proyectos. Intente más tarde.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}