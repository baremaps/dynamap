import "./style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import mapboxgl from "maplibre-gl/dist/maplibre-gl.js";

let map = new mapboxgl.Map({
    container: "map",
    style: "https://tiles.baremaps.com/style.json",
    center: [6.5743, 46.5189],
    zoom: 14,
    minZoom: 6,
    maxZoom: 18,
});

map.addControl(new mapboxgl.NavigationControl());

let layer = document.getElementById('layer');

/* Colors */
let swatches = document.getElementById('swatches');
let colors = [
    '#ffffcc',
    '#a1dab4',
    '#41b6c4',
    '#2c7fb8',
    '#253494',
    '#fed976',
    '#feb24c',
    '#fd8d3c',
    '#f03b20',
    '#bd0026'
];
colors.forEach(function (color) {
    let swatch = document.createElement('button');
    swatch.style.backgroundColor = color;
    swatch.addEventListener('click', function () {
        map.setPaintProperty(layer.value, 'fill-color', color);
    });
    swatches.appendChild(swatch);
});

/* Opacity */
let opacity = document.getElementById('opacity');
opacity.addEventListener('change', function () {
    console.log(layer.value);
    console.log(opacity.value);
    map.setPaintProperty(layer.value, 'fill-opacity', opacity.value / 100);
});

/* Features */
let info = document.getElementById('info');
let feature = document.getElementById('feature');
map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point);
    var displayProperties = [
        'properties',
    ];
    var firstFeature = features[0];
    if (firstFeature) {
        info.style.display = 'block';
        feature.innerHTML = JSON.stringify(
            firstFeature.properties,
            null,
            2
        );
        layer.value = firstFeature.layer.id;
    } else {
        info.style.display = 'none';
    }
    
});