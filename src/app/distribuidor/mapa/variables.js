function initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 },
        disableDefaultUI: true,
    });

    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById("sidebar"));

    const control = document.getElementById("floating-panel");

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    document.getElementById("add-waypoint").addEventListener("click", () => {
        addWaypoint();
    });

    document.getElementById("waypoints-container").addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-waypoint")) {
            event.target.parentElement.remove();
            onChangeHandler();
        } else if (event.target.classList.contains("confirm-waypoint")) {
            const input = event.target.previousElementSibling;
            if (input.value) {
                input.disabled = true;
                event.target.remove();
                onChangeHandler();
            } else {
                alert("Please enter coordinates.");
            }
        }
    });

    document.getElementById("export-route").addEventListener("click", exportRoute);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const startCoordinates = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                document.getElementById('start-coordinates').textContent = `${startCoordinates.lat},${startCoordinates.lng}`;
                window.startCoordinates = startCoordinates;
                calculateAndDisplayRoute(directionsService, directionsRenderer);
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

function addWaypoint() {
    const waypointContainer = document.getElementById("waypoints-container");
    const newWaypoint = document.createElement("div");
    newWaypoint.className = "waypoint";
    newWaypoint.innerHTML = `
    <input type="text" class="waypoint-coordinates" placeholder="lat,lng">
    <button class="confirm-waypoint">Confirm</button>
    <button class="remove-waypoint">Remove</button>
  `;
    waypointContainer.appendChild(newWaypoint);
}

function parseCoordinates(input) {
    const [lat, lng] = input.split(",").map(Number);
    return { lat, lng };
}

function calculateDistance(point1, point2) {
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

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const start = window.startCoordinates;

    console.log("start", start);
    if (!start) {
        window.alert("Determining location...");
        return;
    }

    let waypoints = Array.from(document.getElementsByClassName("waypoint-coordinates"))
        .filter(input => input.disabled)
        .map(input => parseCoordinates(input.value))
        .map(coords => ({ location: coords, stopover: true }));

    if (waypoints.length === 0) {
        window.alert("Please add waypoints.");
        return;
    }

    // Sort waypoints by distance to the start point
    waypoints.sort((a, b) => calculateDistance(start, a.location) - calculateDistance(start, b.location));

    directionsService.route({
        origin: start,
        destination: waypoints[waypoints.length - 1].location,
        waypoints: waypoints.slice(0, -1),
        travelMode: google.maps.TravelMode.DRIVING,
    })
        .then((response) => {
            directionsRenderer.setDirections(response);
            window.currentRoute = response.routes[0].legs;
        })
        .catch((e) => window.alert("Directions request failed due to " + e));
}

function exportRoute() {
    const start = window.startCoordinates;
    if (!start || !window.currentRoute) {
        window.alert("Route not available for export.");
        return;
    }

    const waypoints = window.currentRoute.slice(0, -1).map(leg => `${leg.end_location.lat()},${leg.end_location.lng()}`);
    const destination = `${window.currentRoute[window.currentRoute.length - 1].end_location.lat()},${window.currentRoute[window.currentRoute.length - 1].end_location.lng()}`;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${start.lat},${start.lng}&destination=${destination}&waypoints=${waypoints.join('|')}&travelmode=driving`;

    window.open(url, "_blank");
}

function handleLocationError(browserHasGeolocation, pos) {
    window.alert(browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.");
}

window.initMap = initMap;

