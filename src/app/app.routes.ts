import { Routes } from '@angular/router';
// Importamos los dos componentes que representan las páginas de la aplicación
import { HomeComponent } from './components/home/home';
import { AdminComponent } from './components/admin/admin';

export const routes: Routes = [
  // Ruta raíz: muestra el landing page completo
  { path: '', component: HomeComponent },
  // Ruta admin: muestra el panel para agregar proyectos
  // Accesible desde http://localhost:4200/admin
  { path: 'admin', component: AdminComponent },
  // Ruta comodín: redirige cualquier URL desconocida al inicio
  { path: '**', redirectTo: '' },
];
