import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  registerClient(cliente: any): Observable<any> {
    // console.log(cliente);
    return this.http.post(`${this.apiUrl}/cliente/`, cliente);
  }

  loginCliente(credentials: any): Observable<any> {
    console.log(credentials);
    return this.http.post(`${this.apiUrl}/auth/cliente/login`, credentials);
  }

  loginDistribuidor(credentials: any): Observable<any> {
    console.log(credentials);
    return this.http.post(`${this.apiUrl}/auth/distribuidor/login`, credentials);
  }

  loginAdmin(credentials: any): Observable<any> {
    console.log(credentials);
    return this.http.post(`${this.apiUrl}/auth/admin/login`, credentials);
  }

  getBarrios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/barrio/`);
  }

  checkUsername(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/check-username/${username}`);
  }

  checkCedula(cedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/check-cedula/${cedula}`);
  }


  // Otros métodos como login, logout, etc.
}
