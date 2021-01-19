// function createMap(earthQuakes) {

//     // Create the tile layer that will be the background of our map
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "light-v10",
//       accessToken: API_KEY
//     });
  
//     // Create a baseMaps object to hold the lightmap layer
//     var baseMaps = {
//       "Light Map": lightmap
//     };
  
//     // Create an overlayMaps object to hold the bikeStations layer
//     var overlayMaps = {
//       "Earthsquakes": earthQuakes
//     };
  
//     // Create the map object with options
//     var map = L.map("mapid", {
//       center: [15.5994, -28.6731],
//       zoom: 3,
//       layers: [lightmap, earthQuakes]
//     });
  
//     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);
//   }
  
//   function createMarkers(response) {
  
//     // Pull the "stations" property off of response.data
//     var quakes = response.features;
  
//     // Initialize an array to hold bike markers
//     var quakeMarkers = [];
  
//     // Loop through the stations array
//     for (var index = 0; index < quakes.length; index++) {
//       var quake = quakes[index];
  
//       // For each station, create a marker and bind a popup with the station's name
//       var quakeMarker = L.marker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]])
//         .bindPopup("<h3>" + quake.properties.place + "</h3>");
  
//       // Add the marker to the bikeMarkers array
//       quakeMarkers.push(quakeMarker);
//     }
  
//     // Create a layer group made from the bike markers array, pass it into the createMap function
//     createMap(L.layerGroup(quakeMarkers));
//   }
  
  
//   // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
//   d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);

// Creating map object
var myMap = L.map("mapid", {
    center: [15.5994, -28.6731],
    zoom: 3,
    layer: [lightmap]
});
  
// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
}).addTo(myMap);

  
// use this link to get geojson data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
// Grab the data with d3
d3.json(url, function(response) {
    createFeatures(response.features);
});
    //Define and Create features, from website
function createFeatures(earthquakedata){
    var earthQuakes = L.geojson(earthquakedata, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +"</h3")
        },

        pointToLayer: function(feature, latlng) {
            return new L.circle(latlng,
                {radius: 8,
                fillColor: "blue",
                fillOpacity: .8,
                color: "navy",
                weight: 1
            })
        }
    
    });
    createMap (earthQuakes);
}

function createMap (earthQuakes){
    var 
}