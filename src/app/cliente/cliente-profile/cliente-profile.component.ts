import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-cliente-profile',
  templateUrl: './cliente-profile.component.html',
  styleUrls: ['./cliente-profile.component.css']
})
export class ClienteProfileComponent implements OnInit {
  cliente: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const clienteJson = localStorage.getItem('cliente');
    if (clienteJson) {
      this.cliente = JSON.parse(clienteJson);
    }
  }
}
