import { Component, OnInit, AfterViewInit } from '@angular/core';
import WOW from 'wowjs';
import jQuery from 'jquery'; // Importa jQuery como un módulo


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'proyecto';

  ngOnInit() {

    jQuery(document).ready(function() {
      // Puedes usar jQuery aquí
      jQuery('body').addClass('example-class');
    });

    // Verifica si MutationObserver está soportado por el navegador
    if (typeof MutationObserver === 'undefined') {
      console.error('MutationObserver is not supported by your browser.');
      return;
    }

    // Crea un observador de mutaciones
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(mutation);
      });
    });

    // Obtiene el elemento por su ID para observarlo
    const targetNode = document.getElementById('someElement');
    if (targetNode) {
      observer.observe(targetNode, { attributes: true, childList: true, subtree: true });
    } else {
      console.error('Target element not found.');
    }
  }

  ngAfterViewInit() {
    // Inicializa WOW.js después de que la vista se ha inicializado
    new WOW.WOW().init();

  }
}
