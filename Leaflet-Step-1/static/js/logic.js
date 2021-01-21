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