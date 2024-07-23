import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-distribuidor-login',
  templateUrl: './distribuidor-login.component.html',
  styleUrls: ['./distribuidor-login.component.css']
})
export class DistribuidorLoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  token: any;
  distribuidor: any;
  private watchId: number | null = null;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  navigateToCliente() {
    this.router.navigate(['login-cliente']);
  }
  navigateToDistribuidor() {
    this.router.navigate(['login-distribuidor']);
  }
  navigateToAdmin() {
    this.router.navigate(['login-admin']);
  }

  ngOnInit(): void {
    if (this.authService.isDistribuidorLoggedIn()) {
      this.router.navigate(['/distribuidor-home']);
    }
  }

  onSubmit() {
    this.authService.loginDistribuidor(this.credentials).subscribe(
      response => {
        // Aquí manejas la respuesta del backend
        this.token = response.token;
        this.distribuidor = response.distribuidor;
        localStorage.setItem('token', this.token);
        localStorage.setItem('distribuidor', JSON.stringify(this.distribuidor));
        this.startTrackingLocation();
        this.toastr.success('Inicio de sesión exitoso', 'Bienvenido');
        // Redirigir a la página de inicio del cliente
        this.router.navigate(['/distribuidor-home']);
      },
      error => {
        // Manejar errores de inicio de sesión
        if (error.status === 401) {
          this.toastr.error('Usuario o Contraseña incorrecta', 'Error');
        } else if (error.status === 404) {
          this.toastr.error('Usuario no encontrado', 'Error');
        } else {
          this.toastr.error('Error al iniciar sesión', 'Error');
        }
      }
    );
  }

  startTrackingLocation() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.sendLocationToBackend(userLocation);
        },
        (error) => {
          console.error('Error getting location', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  stopTrackingLocation() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  sendLocationToBackend(userLocation: { latitude: number, longitude: number }) {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:3000/api/users/location', userLocation, { headers }).subscribe(
      response => {
        console.log('Location sent successfully');
      },
      error => {
        console.error('Error sending location', error);
      }
    );
  }

  ngOnDestroy() {
    this.stopTrackingLocation();
  }


  navigateToAbout() {
    this.router.navigate(['about']);
  }

  navigateToShop() {
    this.router.navigate(['shop']);
  }

  navigateToContacto() {
    this.router.navigate(['contacto']);
  }



}

