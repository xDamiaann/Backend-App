import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';

@Component({
  selector: 'app-menu-cliente',
  standalone: true,
  imports: [],
  templateUrl: './menu-cliente.component.html',
  styleUrl: './menu-cliente.component.css'
})
export class MenuClienteComponent {
  idCliente: any;
  constructor(private authService: AuthService, private ClienteService: ClienteServiceService, private router: Router) { }


  username: string = '';

  ngOnInit(): void {
    const clienteJson = localStorage.getItem('cliente');
    if (clienteJson) {
      const cliente = JSON.parse(clienteJson);
      this.username = cliente ? cliente.username : '';
      this.idCliente = cliente ? cliente.id : '';
    }
  }

  navigateToCliente() {
    this.router.navigate(['login-cliente']);
  }
  navigateToDistribuidor() {
    this.router.navigate(['login-distribuidor']);
  }
  navigateToAdmin() {
    this.router.navigate(['login-admin']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Navega a la ruta '/register'
  }

  navigateToAbout() {
    this.router.navigate(['about']);
  }

  navigateToShop() {
    this.router.navigate(['shop']);
  }

  navigateToClienteHome() {
    this.router.navigate(['cliente-home']);
  }


  navigateToClienteProfile() {
    this.router.navigate(['/perfil']);
  }

  navigateToContacto() {
    this.router.navigate(['contacto']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cliente');
    this.router.navigate(['/']);
  }

  //navegar por pedidos

  navigateToPedido() {
    this.router.navigate(['/cliente-pedido']);
  }

  navigateVerPedido() {
    this.router.navigate(['/cliente-pedidos']);
  }

  navigateVerFactura() {
    this.router.navigate(['/cliente-facturas']);
  }
}
