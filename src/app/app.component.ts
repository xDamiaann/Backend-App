import { Component, OnInit, AfterViewInit } from '@angular/core';
import WOW from 'wowjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'proyecto';

  ngOnInit() {
    if (typeof MutationObserver === 'undefined') {
      console.error('MutationObserver is not supported by your browser.');
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(mutation);
      });
    });

    const targetNode = document.getElementById('someElement');
    if (targetNode) {
      observer.observe(targetNode, { attributes: true, childList: true, subtree: true });
    } else {
      console.error('Target element not found.');
    }
  }

  ngAfterViewInit() {
    // Initialize WOW.js after the view has been initialized
    new WOW.WOW().init();
  }
}
