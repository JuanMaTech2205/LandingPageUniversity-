import { Component } from '@angular/core';
// RouterOutlet renderiza el componente correspondiente a la URL activa
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  // AppComponent ahora solo necesita el header y el router-outlet
  // La lógica del landing page (scroll, animaciones) se movió a HomeComponent
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}