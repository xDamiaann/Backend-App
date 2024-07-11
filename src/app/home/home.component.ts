
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { WOW } from 'wowjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ]
})

export class HomeComponent {

  constructor(private router: Router) { }
  
  navigateToCliente() {
    this.router.navigate(['login-cliente']);
  }
  navigateToDistribuidor() {
    this.router.navigate(['login-distribuidor']);
  }
  navigateToAdmin() {
    this.router.navigate(['login-admin']);
  }

  navigateToAbout() {
    this.router.navigate(['about']);
  }

  ngOnInit() {
    new WOW().init();
  }



  currentDate: Date = new Date();


}

