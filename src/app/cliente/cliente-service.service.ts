import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  realizarPedido(pedido: any): Observable<any> {
    console.log(pedido);
    return this.http.post<any>(`${this.apiUrl}/pedido`, pedido);
  }

  getProductosDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos/disponibles`);
  }
  /*
    getDistribuidoresDisponibles(pedido: any): Observable<any[]> {
      return this.http.post<any[]>(`${this.apiUrl}/distribuidor/disponibles`, pedido);
    }*/

  obtenerPresentacionesPorID(id_presentacion: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/presentacion/${id_presentacion}`);
  }

  getDistribuidoresConStock(pedidoDetalles: any[]): Observable<any[]> {
    console.log(pedidoDetalles);
    return this.http.post<any[]>(`${this.apiUrl}/distribuidor/disponibles`, pedidoDetalles);
  }


  getDistribuidoresConStockR(pedidoDetalles: any[]): Observable<any[]> {
    console.log(pedidoDetalles);
    return this.http.post<any[]>(`${this.apiUrl}/distribuidor/disponiblesR`, pedidoDetalles);
  }
  getPedidosCliente(id_cliente: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/pedido/cliente/${id_cliente}`);
  }

  reasignarDistribuidor(id_pedido: number, id_distribuidor_actual: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pedido/reasignar/${id_pedido}`, { id_distribuidor_actual });
  }

  updatePedido(id_distribuidor: number, id_pedido: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pedido/${id_pedido}`, {
      id_distribuidor: id_distribuidor
    });
  }

  updateDistribuidorPedido(id_pedido: number, pedido: any): Observable<any> {
    console.log(pedido);
    return this.http.put<any>(`${this.apiUrl}/pedido/${id_pedido}/distribuidor`, pedido);
  }

  pagarPedido(id_pedido: number, metodo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pedido/pagar/${id_pedido}`, { metodo });
  }

  updateEstadoPedido(id_pedido: number, id_estadopedido: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pedido/finalizar/${id_pedido}`, { id_estadopedido });
  }

  createPayPalOrder(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payments/create-order`, { data });
  }

  capturePayPalOrder(orderId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payments/capture-order`, { orderId });
  }

}