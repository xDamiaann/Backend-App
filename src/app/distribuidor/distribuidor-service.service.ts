import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistribuidorService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPedidosPendientes(id_distribuidor: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedido/pendientes/${id_distribuidor}`);
  }

  updateEstadoPedido(id_pedido: number, id_estadopedido: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pedido/${id_pedido}`, { id_estadopedido });
  }

  getPedidosEnCamino(id_distribuidor: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedido/en_camino/${id_distribuidor}`);
  }

  getPedidosEntregados(id_distribuidor: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedido/entregados/${id_distribuidor}`);
  }



  //facturas
  generarFactura(id_pedido: number, pedido: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/factura/${id_pedido}`, { pedido });
  }
}