import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

declare var google: any; // Declaración para usar la variable global 'google'

interface Coordinates {
  lat: number;
  lng: number;
}

interface RouteLeg {
  end_location: Coordinates;
  // Puedes añadir más propiedades si es necesario
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

  constructor(private renderer: Renderer2) { }

  @ViewChild('addWaypointButton') addWaypointButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('waypointsContainer') waypointsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('exportRouteButton') exportRouteButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('startCoordinatesText') startCoordinatesText!: ElementRef<HTMLSpanElement>;

  private startCoordinates: Coordinates | null = null;
  private currentRoute: RouteLeg[] | null = null;

  ngAfterViewInit(): void {
    this.loadGoogleMaps();
  }

  loadGoogleMaps(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBR6xZnxe2B4Kw9VvuKGLNk9RDN_X7O2DU&callback=initMap';
    script.async = true;
    script.defer = true;
    script.setAttribute('loading', 'async');

    // Definir el callback global initMap
    (window as any)['initMap'] = () => {
      this.initMap();
    };

    // Añadir el script al final del body
    document.body.appendChild(script);
  }

  initMap(): void {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
      disableDefaultUI: true,
    });

    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('sidebar'));

    const control = document.getElementById('floating-panel');

    if (control) {
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    }

    const onChangeHandler = () => {
      this.calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    if (this.addWaypointButton.nativeElement) {
      this.addWaypointButton.nativeElement.addEventListener('click', () => {
        this.addWaypoint();
      });
    }

    if (this.waypointsContainer.nativeElement) {
      this.waypointsContainer.nativeElement.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('remove-waypoint')) {
          target.parentElement?.remove();
          onChangeHandler();
        } else if (target.classList.contains('confirm-waypoint')) {
          const input = target.previousElementSibling as HTMLInputElement;
          if (input.value) {
            input.disabled = true;
            target.remove();
            onChangeHandler();
          } else {
            alert('Please enter coordinates.');
          }
        }
      });
    }

    if (this.exportRouteButton.nativeElement) {
      this.exportRouteButton.nativeElement.addEventListener('click', () => {
        this.exportRoute();
      });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const startCoordinates: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.startCoordinates = startCoordinates;
          if (this.startCoordinatesText.nativeElement) {
            this.startCoordinatesText.nativeElement.textContent = `${startCoordinates.lat},${startCoordinates.lng}`;
          }
          this.calculateAndDisplayRoute(directionsService, directionsRenderer);
        },
        () => {
          this.handleLocationError(true, map.getCenter());
        }
      );
    } else {
      this.handleLocationError(false, map.getCenter());
    }
  }

  addWaypoint(): void {
    const waypointContainer = this.waypointsContainer.nativeElement;
    if (waypointContainer) {
      const newWaypoint = document.createElement('div');
      newWaypoint.className = 'waypoint';
      newWaypoint.innerHTML = `
        <input type="text" class="waypoint-coordinates" placeholder="lat,lng">
        <button class="confirm-waypoint">Confirm</button>
        <button class="remove-waypoint">Remove</button>
      `;
      waypointContainer.appendChild(newWaypoint);
    }
  }

  parseCoordinates(input: string): Coordinates {
    const [lat, lng] = input.split(',').map(Number);
    return { lat, lng };
  }

  calculateDistance(point1: Coordinates, point2: Coordinates): number {
    const radLat1 = Math.PI * point1.lat / 180;
    const radLat2 = Math.PI * point2.lat / 180;
    const theta = point1.lng - point2.lng;
    const radTheta = Math.PI * theta / 180;
    let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344; // Convert to kilometers
    return dist;
  }

  calculateAndDisplayRoute(directionsService: any, directionsRenderer: any): void {
    const start = this.startCoordinates;

    if (!start) {
      window.alert('Determining location...');
      return;
    }

    const waypointInputs = Array.from(document.getElementsByClassName('waypoint-coordinates')) as HTMLInputElement[];
    let waypoints = waypointInputs
      .filter((input) => input.disabled)
      .map((input) => this.parseCoordinates(input.value))
      .map((coords) => ({ location: coords, stopover: true }));

    if (waypoints.length === 0) {
      window.alert('Please add waypoints.');
      return;
    }

    // Sort waypoints by distance to the start point
    waypoints.sort((a, b) => this.calculateDistance(start, a.location) - this.calculateDistance(start, b.location));

    directionsService.route({
      origin: start,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints.slice(0, -1),
      travelMode: google.maps.TravelMode.DRIVING,
    })
      .then((response: any) => {
        directionsRenderer.setDirections(response);
        this.currentRoute = response.routes[0].legs as RouteLeg[];
      })
      .catch((e: any) => window.alert('Directions request failed due to ' + e));
  }

  exportRoute(): void {
    const start = this.startCoordinates;
    if (!start || !this.currentRoute) {
      window.alert('Route not available for export.');
      return;
    }

    const waypoints = this.currentRoute.slice(0, -1).map((leg: RouteLeg) => `${leg.end_location.lat},${leg.end_location.lng}`);
    const destination = `${this.currentRoute[this.currentRoute.length - 1].end_location.lat},${this.currentRoute[this.currentRoute.length - 1].end_location.lng}`;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${start.lat},${start.lng}&destination=${destination}&waypoints=${waypoints.join('|')}&travelmode=driving`;

    window.open(url, '_blank');
  }

  handleLocationError(browserHasGeolocation: boolean, pos: any): void {
    window.alert(browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation.");
  }
}
