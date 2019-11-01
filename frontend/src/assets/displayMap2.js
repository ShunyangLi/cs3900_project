// var str = window.localStorage.getItem('defaultMarkingAddr');
// var defaultAddrList = JSON.parse(str).addrList;
//
// str = window.localStorage.getItem('allAddresses');
// var allAddrList = JSON.parse(str).addrList;
// // if (window.localStorage.getItem(('addrCoords')) === null) {
// var addrCoords = {}; // address coordinates dict: key is the address, value is array of [longitude, latitude]
//
// mapboxgl.accessToken = 'pk.eyJ1IjoiY2F3Y2F3IiwiYSI6ImNrMjRiMDgwMjE0dWszY24wbWZkN3FoaHkifQ.GHrkLXKycCDWwJ-nCI10-A';
// var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

// calculate all the coordinates of all addresses
// var promise = new Promise((resolve, reject) => {
//   allAddrList.forEach(addr => {
//     mapboxClient.geocoding.forwardGeocode({
//       query: addr,
//       autocomplete: false,
//       limit: 1
//     }).send().then(function (response) {
//       if (response && response.body && response.body.features && response.body.features.length) {
//         let feature = response.body.features[0];
//         addrCoords[addr] = feature.center;
//       }
//     });
//   });
//   resolve();
// });
// setTimeout(() => {
//   window.localStorage.setItem('addrCoords', JSON.stringify(addrCoords));
// }, 2000);
// }

var markers = {}; // marker dict: key is the address
var map;

var queryObj = {};
queryObj['query'] = defaultAddrList[0];
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
    markers[defaultAddrList[0]] = new mapboxgl.Marker().setLngLat(feature.center).addTo(map);

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
    map.on('draw.create', () => {console.log('called in create');removeAllMarkers(); updateRoute()});
    map.on('draw.update', () => {console.log('called in update');removeAllMarkers(); updateRoute();});
    map.on('draw.delete', () => {console.log('called in delete');removeAllMarkers(); removeRoute();});


    /* Below is the functions of drawing tool */

    // use the coordinates you just drew to make your directions request
    function updateRoute() {
      removeRoute(); // overwrite any existing layers
      // removeAllMarkers();
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
        document.getElementById('calculated-line').innerHTML = 'Total Distance: ' + distance.toFixed(2) + ' km<br>Total Driving Duration: ' + duration.toFixed(2) + ' minutes';
        document.getElementById('calculated-line').style.fontSize = '17px';
        var coords = jsonResponse.routes[0].geometry;
        // console.log('coords');
        // console.log(coords.coordinates[0][1]);
        // add the route to the map
        addRoute(coords);
        // First remove all the markers on the map
        // removeAllMarkers();
        // when addrCoords are calculated, then we can do comparison
        promise.then(() => {
          // console.log('called');
          // removeAllMarkers();
          // console.log(markers);
          addClosedCoordMarkers(addrCoords, coords.coordinates);
        });
      };
      req.send();
    }

    // adds the route as a layer on the map
    function addRoute (coords) {
      // check if the route is already loaded
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
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
      }
    }

    // remove the layer if it exists
    function removeRoute () {
      // removeAllMarkers();
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
        // removeAllMarkers();
        document.getElementById('calculated-line').innerHTML = 'You can draw the route on the map.';
        document.getElementById('calculated-line').style.fontSize = '27px';
      } else  {
        return;
      }
    }
  }

  function addClosedCoordMarkers(allCoords, routeCoords) {
    for (let i = 0; i < routeCoords.length; ++i) {
      for (const [addr] of Object.entries(allCoords)) {
        let distance = getDistanceFromLatLonInKm(routeCoords[i][1], routeCoords[i][0], allCoords[addr][1], allCoords[addr][0]);
        if (distance < 0.5) {
          markers[addr] = new mapboxgl.Marker().setLngLat(allCoords[addr]).addTo(map);
          console.log(markers);
        }
      }
    }
  }

  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  function removeAllMarkers() {
    console.log('called in remove all markers');
    for (const [addr] of Object.entries(markers)) {
      // markers[addr].remove();
      map.removeLayer(markers[addr]);
      delete markers[addr];
    }
    console.log(markers);
  }

  // load the rest of default markers:
  for (let i = 1; i < defaultAddrList.length; i++) {
    mapboxClient.geocoding.forwardGeocode({
      query: defaultAddrList[i],
      autocomplete: false,
      limit: 1
    }).send().then(function (response) {
      if (response && response.body && response.body.features && response.body.features.length) {
        var feature = response.body.features[0];

        markers[defaultAddrList[i]] = new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
        console.log(markers);
      }
    });
  }
});
