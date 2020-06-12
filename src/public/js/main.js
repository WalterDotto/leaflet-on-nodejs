var map = L.map('map-template').setView([-34.646856299999996, -58.5886803], 13); 

//Se ejecuta io() gracias al script insertado en el index.ejs:    <script src="/socket.io/socket.io.js"></script>
const socket = io();

L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.locate({enablehighAccuracy: true});
map.setMaxBounds

map.on('locationfound', e => {

    const coords = [e.latlng.lat, e.latlng.lng];

    const marker = L.marker(coords);

    marker.bindPopup('You are here');
    map.addLayer(marker);    

    socket.emit('userCoordinates', e.latlng);

});

socket.on('newUserCoordinates', (coords) => {

    const marker = L.marker([coords.lat+1, coords.lng+1]);

    marker.bindPopup('Somebody is here');
    map.addLayer(marker); 
})