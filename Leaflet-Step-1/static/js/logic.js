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
// var myMap = L.map("mapid", {
//     center: [15.5994, -28.6731],
//     zoom: 3,
//     layer: [lightmap]
// });
  
// Adding tile layer to the map
// L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "light-v10",
//     accessToken: API_KEY
// }).addTo(myMap);

  
// use this link to get geojson data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
// Grab the data with d3
d3.json(url, function(response) {
    createFeatures(response.features);
});
    //Define and Create features, from website
function createFeatures(earthquakedata){
    // Function that will determine the color of mag
function chooseColor(mag) {
    switch (true) {
    case mag > 3.5:
      return "yellow";
    case mag > 3.0:
      return "red";
    case mag > 2.5:
      return "orange";
    case mag > 2.0:
      return "green";
    case mag >1.5:
      return "purple";
    case mag >1.0:
      return "blue";
    case mag >.5:
        return "white";
    default:
      return "black";
    }
}
    var earthQuakes = L.geoJSON(earthquakedata, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +"</h3>" + "Location: " + feature.properties.place)
        },

        pointToLayer: function(feature, latlng) {
            return new L.circleMarker(latlng,
                {radius: feature.properties.mag * 6,
                fillColor: chooseColor(feature.properties.mag),
                fillOpacity: .8,
                color: "navy",
                weight: 1
            })
        }
    
    });
    createMap (earthQuakes);
}

function createMap (earthquakes){
    console.log(earthquakes)
   // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var colors = ["yellow", "red", "orange", "green", "purple", "blue", "white", "black"].reverse();
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Magnitude</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + "0" + "</div>" +
        "<div class=\"max\">" + "3.5" + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    colors.forEach(function(color, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
}