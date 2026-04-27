import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProyectoVenta {
  proyecto: string;
  ubicacion: string;
  estado: string;
  precio: string;
}

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venta.html',
  styleUrls: ['./venta.css']
})
export class VentaComponent {
  proyectosVenta: ProyectoVenta[] = [
    {
      proyecto: 'Edificio Central',
      ubicacion: 'Bogotá, Centro',
      estado: 'En construcción',
      precio: '$1.000.000 COP'
    },
    {
      proyecto: 'Conjunto Residencial',
      ubicacion: 'Medellín, El Poblado',
      estado: 'Preventa',
      precio: '$800.000 COP'
    }
  ];
}