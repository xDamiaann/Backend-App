import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cliente-register',
  templateUrl: './cliente-register.component.html',
  styleUrls: ['./cliente-register.component.css']
})
export class RegisterComponent {
  cliente = {
    cedula:'',
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    email: '',
    username: '',
    password: '',
    id_barrio: null
  };

  barrio: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getBarrios().subscribe(
      response => {
        this.barrio = response;
        console.log("datos",this.barrio);
      },
      error => {
        console.error('Error al obtener los barrios', error);
      }
    );
  }


  onSubmit() {
    this.authService.registerClient(this.cliente).subscribe(
      response => {
        console.log('Cliente registrado', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error al registrar el cliente', error);
      }
    );
  }
}
