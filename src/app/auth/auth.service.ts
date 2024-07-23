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

  checkUsernameForUpdate(username: string, id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/check-usernameupdate/${username}/${id}`);
  }

  checkCedula(cedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/check-cedula/${cedula}`);
  }

  isClienteLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isDistribuidorLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  recoverAccount(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/recover-account`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, { token, password });
  }

  // Otros métodos como login, logout, etc.
}
