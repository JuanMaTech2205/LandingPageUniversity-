import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
// provideHttpClient permite usar HttpClient en toda la aplicación para hacer peticiones HTTP
// withFetch usa la API Fetch nativa del navegador, compatible con SSR de Angular
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // Captura errores globales del navegador y los reporta en la consola
    provideBrowserGlobalErrorListeners(),
    // Registra el sistema de rutas de la aplicación
    provideRouter(routes),
    // Hidratación del cliente: reutiliza el HTML generado por SSR en vez de re-renderizar
    // withEventReplay captura eventos del usuario mientras carga el JS y los reproduce después
    provideClientHydration(withEventReplay()),
    // Habilita HttpClient globalmente para poder hacer peticiones al backend PHP
    provideHttpClient(withFetch()),
  ]
};
