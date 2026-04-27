import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Proyecto {
  num: string;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class ProyectosComponent {
  proyectos: Proyecto[] = [
    {
      num: '01',
      nombre: 'Edificio Central',
      descripcion: 'Torre empresarial de 22 pisos ubicada en el corazón financiero de la ciudad, con diseño sostenible y certificación LEED.'
    },
    {
      num: '02',
      nombre: 'Conjunto Residencial',
      descripcion: 'Unidades familiares con zonas comunes, seguridad 24/7 y amplias áreas verdes para una vida en comunidad de calidad.'
    },
    {
      num: '03',
      nombre: 'Centro Comercial',
      descripcion: 'Espacio comercial moderno con más de 120 locales, zona de comidas y estacionamiento para 500 vehículos.'
    }
  ];
}