import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distribuidor-home',
  templateUrl: './distribuidor-home.component.html',
  styleUrls: ['./distribuidor-home.component.css']
})
export class DistribuidorHomeComponent implements OnInit {
  username: string = ''; // Inicializar la propiedad

  constructor(private router: Router) { }

  ngOnInit(): void {
    const distribuidorJson = localStorage.getItem('distribuidor');
    if (distribuidorJson) {
      const distribuidor = JSON.parse(distribuidorJson);
      this.username = distribuidor ? distribuidor.username : '';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('distribuidor');
    this.router.navigate(['/']);
  }
}
