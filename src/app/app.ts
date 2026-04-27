import { Component, OnDestroy, HostListener, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { ProyectosComponent } from './components/proyectos/proyectos';
import { VentaComponent } from './components/venta/venta';
import { ContactoComponent } from './components/contacto/contacto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ProyectosComponent,
    VentaComponent,
    ContactoComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  showBtnTop = false;
  private observer!: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const fadeElements = document.querySelectorAll('.fade-in');

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              this.observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      fadeElements.forEach((el) => this.observer.observe(el));
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (typeof window !== 'undefined') {
      this.showBtnTop = window.scrollY > 600;
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}