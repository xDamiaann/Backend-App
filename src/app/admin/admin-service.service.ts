import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  actualizarSolicitud(id: number,estado:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/distribuidor/${id}`, {
      "id_estadosolicitud":estado
    });
  }

  cargarEstadosSolicitud() {
    return this.http.get(`${this.apiUrl}/estado-solicitud/`);
  }

  cargarSolicitudes(){
    return this.http.get(`${this.apiUrl}/distribuidor/`);
  }

}
