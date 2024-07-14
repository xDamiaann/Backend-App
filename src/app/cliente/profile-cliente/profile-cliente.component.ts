import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-cliente',
  templateUrl: './profile-cliente.component.html',
  styleUrl: './profile-cliente.component.css'
})
export class ProfileClienteComponent {
  cliente: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const clienteJson = localStorage.getItem('cliente');
    if (clienteJson) {
      this.cliente = JSON.parse(clienteJson);
    }
  }
}
