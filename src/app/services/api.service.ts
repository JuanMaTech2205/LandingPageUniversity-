// Injectable marca esta clase como un servicio que Angular puede inyectar en componentes
import { Injectable } from '@angular/core';
// HttpClient es el módulo de Angular para hacer peticiones HTTP (GET, POST, etc.)
import { HttpClient } from '@angular/common/http';
// Observable es un flujo de datos asíncrono de la librería RxJS
import { Observable } from 'rxjs';

// Interfaces que definen la estructura de los datos que devuelve el backend PHP

export interface Proyecto {
  num: string;      // Número del proyecto (ej: "01")
  nombre: string;   // Nombre del proyecto
  descripcion: string;
}

export interface ProyectoVenta {
  proyecto: string;  // Nombre del proyecto
  ubicacion: string;
  estado: string;    // Ej: "En construcción", "Preventa"
  precio: string;
}

export interface RespuestaContacto {
  success: boolean;  // true si el servidor guardó el mensaje, false si hubo error
  mensaje: string;   // Mensaje de respuesta del servidor
}

// providedIn: 'root' hace que el servicio esté disponible en toda la aplicación
// sin necesidad de declararlo en cada módulo
@Injectable({ providedIn: 'root' })
export class ApiService {
  // URL base del backend PHP — debe coincidir con la ruta donde está la carpeta backend/
  // Cambiar esto si el servidor tiene una ruta diferente
  private baseUrl = 'http://localhost/constructora/backend/api';

  // Angular inyecta HttpClient automáticamente gracias al sistema de inyección de dependencias
  constructor(private http: HttpClient) {}

  // Hace una petición GET al PHP y devuelve un Observable con el array de proyectos
  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.baseUrl}/proyectos.php`);
  }

  // Hace una petición GET al PHP y devuelve un Observable con el array de ventas
  getVentas(): Observable<ProyectoVenta[]> {
    return this.http.get<ProyectoVenta[]>(`${this.baseUrl}/ventas.php`);
  }

  // Hace una petición POST al PHP enviando los datos del formulario de contacto
  // El segundo parámetro (data) se convierte automáticamente a JSON en el cuerpo del request
  enviarContacto(data: { nombre: string; email: string; mensaje: string }): Observable<RespuestaContacto> {
    return this.http.post<RespuestaContacto>(`${this.baseUrl}/contacto.php`, data);
  }
}
