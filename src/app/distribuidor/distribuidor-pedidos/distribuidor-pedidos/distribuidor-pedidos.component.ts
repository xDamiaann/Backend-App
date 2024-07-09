import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DistribuidorService } from '../../distribuidor-service.service';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';

declare var google: any;

interface Coordinates {
  lat: number;
  lng: number;
}

interface RouteLeg {
  end_location: Coordinates;
}

interface Waypoint {
  location: Coordinates;
  stopover: boolean;
}

@Component({
  selector: 'app-distribuidor-pedidos',
  templateUrl: './distribuidor-pedidos.component.html',
  styleUrls: ['./distribuidor-pedidos.component.css']
})
export class DistribuidorPedidosComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('startCoordinatesText') startCoordinatesText!: ElementRef<HTMLSpanElement>;
  @ViewChild('waypointsContainer') waypointsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('exportRouteButton') exportRouteButton!: ElementRef<HTMLButtonElement>;

  pedidospendientes: any[] = [];
  pedidosencamino: any[] = [];
  pedidosentregados: any[] = [];
  idDistribuidor: number = 0;

  ubicacion: string = "";

  private map: any;
  private directionsService: any;
  private directionsRenderer: any;
  private startCoordinates: Coordinates | null = null;
  private waypoints: Waypoint[] = [];
  private currentRoute: RouteLeg[] | null = null;

  constructor(
    private renderer: Renderer2, private distribuidorService: DistribuidorService, private clienteService: ClienteServiceService
  ) { }

  ngOnInit(): void {
    const distribuidorJson = localStorage.getItem('cliente');
    if (distribuidorJson) {
      const distribuidor = JSON.parse(distribuidorJson);
      this.idDistribuidor = distribuidor ? distribuidor.id : '';
    }
    this.cargarPedidosPendientes();
    this.cargarPedidosEntregados();
  }

  ngAfterViewInit(): void {
    // Cargar pedidos en camino antes de inicializar el mapa
    this.cargarPedidosEnCamino().then(() => {
      this.loadGoogleMaps();
    });
  }

  loadGoogleMaps(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBR6xZnxe2B4Kw9VvuKGLNk9RDN_X7O2DU&callback=initMap';
    script.async = true;
    script.defer = true;
    script.setAttribute('loading', 'async');

    (window as any)['initMap'] = () => {
      this.initMap();
    };

    document.body.appendChild(script);
  }

  initMap(): void {
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsService = new google.maps.DirectionsService();
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
      disableDefaultUI: true,
    });

    this.directionsRenderer.setMap(this.map);
    this.directionsRenderer.setPanel(document.getElementById('sidebar'));

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {

          const startCoordinates: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.startCoordinates = startCoordinates;
          this.addPedidosEnCaminoWaypoints();
          this.startCoordinatesText.nativeElement.textContent = `${startCoordinates.lat}, ${startCoordinates.lng}`;
          console.log('dasdsadas');
          // Añadir waypoints de los pedidos en camino

        },
        () => {
          this.handleLocationError(true, this.map.getCenter());
        }
      );
    } else {
      this.handleLocationError(false, this.map.getCenter());
    }
  }

  calculateAndDisplayRoute(directionsService: any, directionsRenderer: any, start: Coordinates, waypoints: Waypoint[]): void {
    if (!start) {
      window.alert('Determining location...');
      return;
    }

    if (waypoints.length === 0) {
      window.alert('No hay waypoints.');
      return;
    }

    console.log('Calculating route with waypoints:', waypoints);

    directionsService.route({
      origin: start,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints.slice(0, -1),
      travelMode: google.maps.TravelMode.DRIVING,
    })
      .then((response: any) => {
        directionsRenderer.setDirections(response);
        this.currentRoute = response.routes[0].legs;
        console.log('Route calculated:', response);
      })
      .catch((e: any) => window.alert('Directions request failed due to ' + e));
  }

  cargarPedidosPendientes() {
    this.distribuidorService.getPedidosPendientes(this.idDistribuidor).subscribe(
      data => {
        this.pedidospendientes = data;
        console.log(this.pedidospendientes);
      },
      error => {
        console.error('Error al cargar pedidos pendientes:', error);
      }
    );
  }

  cargarPedidosEnCamino(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.distribuidorService.getPedidosEnCamino(this.idDistribuidor).subscribe(
        data => {
          this.pedidosencamino = data;
          console.log('Pedidos en camino cargados:', this.pedidosencamino);
          resolve();
        },
        error => {
          console.error('Error al cargar pedidos en camino:', error);
          reject(error);
        }
      );
    });
  }

  cargarPedidosEntregados() {
    this.distribuidorService.getPedidosEntregados(this.idDistribuidor).subscribe(
      data => {
        this.pedidosentregados = data;
      },
      error => {
        console.error('Error al cargar pedidos entregados:', error);
      }
    );
  }

  actualizarEstadoPedido(id_pedido: number, estado: string) {
    const id_estadopedido = estado === 'Aceptar' ? 2 : (estado === 'Rechazar' ? 6 : 3); // 2: En Camino, 6: Rechazado, 3: Entregado
    this.distribuidorService.updateEstadoPedido(id_pedido, id_estadopedido).subscribe(
      () => {
        this.cargarPedidosPendientes();
        this.cargarPedidosEnCamino().then(() => {
          this.addPedidosEnCaminoWaypoints();
        });
        this.cargarPedidosEntregados();
      },
      error => {
        console.error('Error al actualizar estado del pedido:', error);
      }
    );
  }

  addPedidosEnCaminoWaypoints(): void {
    if (this.pedidosencamino.length === 0) {
      console.warn('No hay pedidos en camino.');
      return;
    }

    if (!this.startCoordinates) {
      console.warn('Coordenadas de inicio no definidas.');
      return;
    }

    this.waypoints = this.pedidosencamino.map(pedido => {
      const coords = pedido.ubicacion.split(',').map(Number);
      return { location: { lat: coords[0], lng: coords[1] }, stopover: true };
    });

    console.log('Waypoints added from pedidos en camino:', this.waypoints);

    this.calculateAndDisplayRoute(this.directionsService, this.directionsRenderer, this.startCoordinates, this.waypoints);
  }

  finalizarPedido(pedido: any) {
    this.clienteService.updateEstadoPedido(pedido.id_pedido, 7).subscribe(() => { // 8: Finalizado
      // Generar la factura
      this.distribuidorService.generarFactura(pedido.id_pedido, pedido).subscribe(() => {
        window.location.reload();
      });
    });
  }

  handleLocationError(browserHasGeolocation: boolean, pos: any): void {
    window.alert(browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation.");
  }
}
