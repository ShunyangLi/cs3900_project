// import mapboxgl from 'mapbox-gl';
var str = window.localStorage.getItem('addrListToBeMarked');
var addrList = JSON.parse(str).addrList;
console.log(addrList);
var markers = {}; // marker dict: key is the address
mapboxgl.accessToken = 'pk.eyJ1IjoiY2F3Y2F3IiwiYSI6ImNrMjRiMDgwMjE0dWszY24wbWZkN3FoaHkifQ.GHrkLXKycCDWwJ-nCI10-A';
var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

var map;
var queryObj = {};
queryObj['query'] = addrList[0];
queryObj['autocomplete'] = false;
queryObj['limit'] = 1;
mapboxClient.geocoding.forwardGeocode(queryObj).send().then(function (response) {
    if (response && response.body && response.body.features && response.body.features.length) {
      var feature = response.body.features[0];
      map = new mapboxgl.Map({
        container: mapEle,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [151.2095, -33.8660],
        zoom: 10, // starting zoom
        minZoom: 3 // keep it local style: 'mapbox://styles/mapbox/streets-v9'
      });
      markers[addrList[0]] = new mapboxgl.Marker().setLngLat(feature.center).addTo(map);

      var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          line_string: true,
          trash: true
        },
        styles: [
          // ACTIVE (being drawn)
          // line stroke
          {
            "id": "gl-draw-line",
            "type": "line",
            "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
            "layout": {
              "line-cap": "round",
              "line-join": "round"
            },
            "paint": {
              "line-color": "#3b9ddd",
              "line-dasharray": [0.2, 2],
              "line-width": 4,
              "line-opacity": 0.7
            }
          },
          // vertex point halos
          {
            "id": "gl-draw-polygon-and-line-vertex-halo-active",
            "type": "circle",
            "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            "paint": {
              "circle-radius": 10,
              "circle-color": "#FFF"
            }
          },
          // vertex points
          {
            "id": "gl-draw-polygon-and-line-vertex-active",
            "type": "circle",
            "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            "paint": {
              "circle-radius": 6,
              "circle-color": "#3b9ddd",
            }
          },
        ]
      });

      // add the draw tool to the map
      map.addControl(draw);

      // add create, update, or delete actions
      map.on('draw.create', updateRoute);
      map.on('draw.update', updateRoute);
      map.on('draw.delete', removeRoute);


      /* Below is the functions of drawing tool */

      // use the coordinates you just drew to make your directions request
      function updateRoute() {
        removeRoute(); // overwrite any existing layers
        var data = draw.getAll();
        var answer = document.getElementById('calculated-line');
        var lastFeature = data.features.length - 1;
        var coords = data.features[lastFeature].geometry.coordinates;
        var newCoords = coords.join(';');
        getMatch(newCoords);
      }

      // make a directions request
      function getMatch(e) {
        var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + e +'?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
        var req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', url, true);
        req.onload  = function() {
          var jsonResponse = req.response;
          var distance = jsonResponse.routes[0].distance*0.001;
          var duration = jsonResponse.routes[0].duration/60;
          document.getElementById('calculated-line').innerHTML = 'Distance: ' + distance.toFixed(2) + ' km<br>Driving Duration: ' + duration.toFixed(2) + ' minutes';
          var coords = jsonResponse.routes[0].geometry;
          // add the route to the map
          addRoute(coords);
        };
        req.send();
      }

      // adds the route as a layer on the map
      function addRoute (coords) {
        // check if the route is already loaded
        if (map.getSource('route')) {
          map.removeLayer('route')
          map.removeSource('route')
        } else{
          map.addLayer({
            "id": "route",
            "type": "line",
            "source": {
              "type": "geojson",
              "data": {
                "type": "Feature",
                "properties": {},
                "geometry": coords
              }
            },
            "layout": {
              "line-join": "round",
              "line-cap": "round"
            },
            "paint": {
              "line-color": "#3b9ddd",
              "line-width": 8,
              "line-opacity": 0.8
            }
          });
        };
      }

      // remove the layer if it exists
      function removeRoute () {
        if (map.getSource('route')) {
          map.removeLayer('route');
          map.removeSource('route');
          document.getElementById('calculated-line').innerHTML = '';
        } else  {
          return;
        }
      }
    }

    // load the rest of markers:
    for (let i = 1; i < addrList.length; i++) {
      mapboxClient.geocoding.forwardGeocode({
        query: addrList[i],
        autocomplete: false,
        limit: 1
      }).send().then(function (response) {
          if (response && response.body && response.body.features && response.body.features.length) {
            var feature = response.body.features[0];

            // var map = new mapboxgl.Map({
            //   container: 'map',
            //   style: 'mapbox://styles/mapbox/streets-v11',
            //   center: [151.2095, -33.8660],
            //   zoom: 10
            // });
            markers[addrList[i]] = new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
          }
      });
    }
});

/*var map = new mapboxgl.Map({
  container: mapEle,
  style: 'mapbox://styles/mapbox/streets-v9', // hosted style id
  center: [151.2095, -33.8660], // starting position
  zoom: 10, // starting zoom
  minZoom: 3 // keep it local style: 'mapbox://styles/mapbox/streets-v9'
});*/


// var draw = new MapboxDraw({
//   displayControlsDefault: false,
//   controls: {
//     line_string: true,
//     trash: true
//   },
//   styles: [
//     // ACTIVE (being drawn)
//     // line stroke
//     {
//       "id": "gl-draw-line",
//       "type": "line",
//       "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
//       "layout": {
//         "line-cap": "round",
//         "line-join": "round"
//       },
//       "paint": {
//         "line-color": "#3b9ddd",
//         "line-dasharray": [0.2, 2],
//         "line-width": 4,
//         "line-opacity": 0.7
//       }
//     },
//     // vertex point halos
//     {
//       "id": "gl-draw-polygon-and-line-vertex-halo-active",
//       "type": "circle",
//       "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
//       "paint": {
//         "circle-radius": 10,
//         "circle-color": "#FFF"
//       }
//     },
//     // vertex points
//     {
//       "id": "gl-draw-polygon-and-line-vertex-active",
//       "type": "circle",
//       "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
//       "paint": {
//         "circle-radius": 6,
//         "circle-color": "#3b9ddd",
//       }
//     },
//   ]
// });
//
// // add the draw tool to the map
// map.addControl(draw);
//
// // add create, update, or delete actions
// map.on('draw.create', updateRoute);
// map.on('draw.update', updateRoute);
// map.on('draw.delete', removeRoute);
//
//
// /* Below is the functions of drawing tool */
//
// // use the coordinates you just drew to make your directions request
// function updateRoute() {
//   removeRoute(); // overwrite any existing layers
//   var data = draw.getAll();
//   var answer = document.getElementById('calculated-line');
//   var lastFeature = data.features.length - 1;
//   var coords = data.features[lastFeature].geometry.coordinates;
//   var newCoords = coords.join(';');
//   getMatch(newCoords);
// }
//
// // make a directions request
// function getMatch(e) {
//   var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + e +'?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
//   var req = new XMLHttpRequest();
//   req.responseType = 'json';
//   req.open('GET', url, true);
//   req.onload  = function() {
//     var jsonResponse = req.response;
//     var distance = jsonResponse.routes[0].distance*0.001;
//     var duration = jsonResponse.routes[0].duration/60;
//     document.getElementById('calculated-line').innerHTML = 'Distance: ' + distance.toFixed(2) + ' km<br>Driving Duration: ' + duration.toFixed(2) + ' minutes';
//     var coords = jsonResponse.routes[0].geometry;
//     // add the route to the map
//     addRoute(coords);
//   };
//   req.send();
// }
//
// // adds the route as a layer on the map
// function addRoute (coords) {
//   // check if the route is already loaded
//   if (map.getSource('route')) {
//     map.removeLayer('route')
//     map.removeSource('route')
//   } else{
//     map.addLayer({
//       "id": "route",
//       "type": "line",
//       "source": {
//         "type": "geojson",
//         "data": {
//           "type": "Feature",
//           "properties": {},
//           "geometry": coords
//         }
//       },
//       "layout": {
//         "line-join": "round",
//         "line-cap": "round"
//       },
//       "paint": {
//         "line-color": "#3b9ddd",
//         "line-width": 8,
//         "line-opacity": 0.8
//       }
//     });
//   };
// }
//
// // remove the layer if it exists
// function removeRoute () {
//   if (map.getSource('route')) {
//     map.removeLayer('route');
//     map.removeSource('route');
//     document.getElementById('calculated-line').innerHTML = '';
//   } else  {
//     return;
//   }
// }

