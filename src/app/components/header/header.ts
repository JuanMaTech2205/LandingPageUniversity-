import { Component } from '@angular/core';
// RouterLink permite usar [routerLink] en el template para navegar entre rutas
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  // RouterLink es necesario para el enlace al panel de administración
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {}