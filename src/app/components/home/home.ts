// HomeComponent agrupa todas las secciones del landing page
// Se separa del AppComponent para poder usar routing: '/' → Home, '/admin' → Admin
import { Component, OnDestroy, HostListener, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HeroComponent } from '../hero/hero';
import { ProyectosComponent } from '../proyectos/proyectos';
import { VentaComponent } from '../venta/venta';
import { ContactoComponent } from '../contacto/contacto';

@Component({
  selector: 'app-home',
  standalone: true,
  // Importamos todos los componentes del landing page
  imports: [HeroComponent, ProyectosComponent, VentaComponent, ContactoComponent],
  templateUrl: './home.html',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  // Controla la visibilidad del botón "volver arriba"
  showBtnTop = false;

  // IntersectionObserver detecta cuándo los elementos .fade-in entran al viewport
  private observer!: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // AfterViewInit garantiza que el DOM ya está listo antes de buscar elementos
  ngAfterViewInit(): void {
    // isPlatformBrowser evita errores en SSR (el servidor no tiene DOM ni window)
    if (isPlatformBrowser(this.platformId)) {
      const fadeElements = document.querySelectorAll('.fade-in');

      // IntersectionObserver observa si un elemento es visible en el viewport
      // threshold: 0.15 significa que se activa cuando el 15% del elemento es visible
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible'); // Activa la animación CSS
              this.observer.unobserve(entry.target); // Deja de observar el elemento (solo anima una vez)
            }
          });
        },
        { threshold: 0.15 }
      );

      fadeElements.forEach((el) => this.observer.observe(el));
    }
  }

  // OnDestroy limpia el observer cuando el componente se destruye para evitar memory leaks
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // HostListener escucha el evento scroll del window para mostrar/ocultar el botón
  @HostListener('window:scroll')
  onScroll(): void {
    if (typeof window !== 'undefined') {
      // Muestra el botón cuando el usuario ha bajado más de 600px
      this.showBtnTop = window.scrollY > 600;
    }
  }

  // Desplaza la página suavemente hacia el inicio al hacer clic en el botón
  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
