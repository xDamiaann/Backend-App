import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { latLng, tileLayer, Map, Icon, Marker, marker, LatLngBounds } from 'leaflet';

const defaultIcon = new Icon({
  iconUrl: 'assets/icons/marker-icon.png',
  shadowUrl: 'assets/icons/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = defaultIcon;

@Component({
  selector: 'app-admin-barrios',
  templateUrl: './admin-barrios.component.html',
  styleUrls: ['./admin-barrios.component.css']
})
export class AdminBarriosComponent implements OnInit, AfterViewInit, OnDestroy {
  barrios: any[] = [];
  parroquias: any[] = [];
  nuevoBarrio = { id_admin: '', id_parroquia: '', nombre: '', ubicacion: '', descripcion: '' };
  idAdmin: string = '';
  map!: Map;
  mapMarker!: Marker;

  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.cargarBarrios();
    this.cargarParroquias();
    const adminJson = localStorage.getItem('admin');
    if (adminJson) {
      const admin = JSON.parse(adminJson);
      this.idAdmin = admin ? admin.id : '';
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  cargarBarrios() {
    this.adminService.cargarBarrios().subscribe(
      data => {
        this.barrios = data;
        console.log(this.barrios)
      },
      error => {
        console.error('Error al cargar barrios:', error);
      }
    );
  }

  cargarParroquias() {
    this.adminService.cargarParroquias().subscribe(
      data => {
        this.parroquias = data;
        console.log(this.parroquias)
      },
      error => {
        console.error('Error al cargar parroquias:', error);
      }
    );
  }

  agregarBarrio() {
    this.nuevoBarrio.id_admin = this.idAdmin;
    this.adminService.agregarBarrio(this.nuevoBarrio).subscribe(
      data => {
        this.barrios.push(data);
        this.nuevoBarrio = { id_admin: '', id_parroquia: '', nombre: '', ubicacion: '', descripcion: '' };
        (document.getElementById('agregarBarrioModal') as HTMLElement).style.display = 'none';
        (document.querySelector('.modal-backdrop') as HTMLElement).remove();
      },
      error => {
        console.error('Error al agregar barrio:', error);
      }
    );
  }

  eliminarBarrio(id: number) {
    this.adminService.eliminarBarrio(id).subscribe(
      () => {
        this.barrios = this.barrios.filter(b => b.id_barrio !== id);
      },
      error => {
        console.error('Error al eliminar barrio:', error);
      }
    );
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.nuevoBarrio.ubicacion = `${lat}, ${lng}`;
      if (this.mapMarker) {
        this.mapMarker.setLatLng(e.latlng);
      } else {
        this.mapMarker = marker(e.latlng).addTo(this.map);
      }
    });
  }

  initMap() {
    this.map = new Map('map', {
      center: latLng(-1.6632716903431275, -78.65832484645108),
      zoom: 14,
      maxBounds: new LatLngBounds(latLng(-90, -180), latLng(90, 180)),
      maxBoundsViscosity: 1.0,
      zoomControl: true
    });

    tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoieGRhbWlhYW5uIiwiYSI6ImNseWFkZGxzODB5bXAycXB1NHNwNHlibXIifQ.9_c_LTuL9Su8FNafAJt7pw', {
      maxZoom: 21,
      id: 'mapbox/streets-v11', // Puedes cambiar esto por el estilo que prefieras, como 'mapbox/outdoors-v11'
      tileSize: 512,
      zoomOffset: -1,
      attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
      accessToken: 'sk.eyJ1IjoieGRhbWlhYW5uIiwiYSI6ImNseWFkZGxzODB5bXAycXB1NHNwNHlibXIifQ.9_c_LTuL9Su8FNafAJt7pw'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.nuevoBarrio.ubicacion = `${lat}, ${lng}`;
      if (this.mapMarker) {
        this.mapMarker.setLatLng(e.latlng);
      } else {
        this.mapMarker = marker(e.latlng).addTo(this.map);
      }
    });

    setTimeout(() => {
      this.map.invalidateSize();
    }, 1000);
  }

  onModalShown() {
    if (!this.map) {
      this.initMap();
    } else {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 1000);
    }
  }
}
