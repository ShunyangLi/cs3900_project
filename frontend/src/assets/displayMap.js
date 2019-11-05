let str = window.localStorage.getItem('defaultMarkingAddr');
const defaultAddrList = JSON.parse(str).addrList;

str = window.localStorage.getItem('allAddresses');
const allAddrList = JSON.parse(str).addrList;
const addrCoords = {}; // address coordinates dict: key is the address, value is array of [longitude, latitude]
let tmpAddrListOnMap = {};
mapboxgl.accessToken = 'pk.eyJ1IjoiY2F3Y2F3IiwiYSI6ImNrMjRiMDgwMjE0dWszY24wbWZkN3FoaHkifQ.GHrkLXKycCDWwJ-nCI10-A';
const mapboxClient = mapboxSdk({accessToken: mapboxgl.accessToken});

// calculate all the coordinates of all addresses
const promise = new Promise((resolve, reject) => {
  allAddrList.forEach(addr => {
    mapboxClient.geocoding.forwardGeocode({
      query: addr,
      autocomplete: false,
      limit: 1
    }).send().then(function (response) {
      if (response && response.body && response.body.features && response.body.features.length) {
        let feature = response.body.features[0];
        addrCoords[addr] = feature.center;
      }
    });
  });
  resolve();
});


let map;
let geojsonList = [];
const queryObj = {};
queryObj['query'] = defaultAddrList[0];
queryObj['autocomplete'] = false;
queryObj['limit'] = 1;
let prevIds = [];

// create a map container:
map = new mapboxgl.Map({
  container: mapEle,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [151.2095, -33.8660],
  zoom: 10, // starting zoom
  minZoom: 3 // keep it local style: 'mapbox://styles/mapbox/streets-v9'
});

map.loadImage('./assets/5-star-hotel-red-35.png', function(error, image) {
  if (error) throw error;
  map.addImage('hotel-red', image);
});

map.loadImage('./assets/5-star-hotel-blue-35.png',  function(error, image) {
  if (error) throw error;
  // load default address list
  map.addImage('hotel-blue', image);
  for(let i = 0; i < defaultAddrList.length; ++ i) {
    mapboxClient.geocoding.forwardGeocode({
      query: defaultAddrList[i],
      autocomplete: false,
      limit: 1
    }).send().then(function (response) {
      if (response && response.body && response.body.features && response.body.features.length) {
        let feature = response.body.features[0];
        const tmpGeojson = createTmpGeojson(feature.center);
        map.addSource(defaultAddrList[i] + '_geojson', {type: 'geojson', data: tmpGeojson});
        const tmpLayObj = createLayerObj(defaultAddrList[i], 'hotel-blue', '');
        map.addLayer(tmpLayObj);
      }
    });
  }


});

// inserting draw tool container:
const draw = new MapboxDraw({
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
map.on('draw.create', () => {
  console.log('create');
  removeTmpAddrListOnMapAndDots();
  removeAllDefaultLayers();
  updateRoute();
});

map.on('draw.update', () => {
  console.log('update');
  removeTmpAddrListOnMapOnly();
  updateRoute();
});

map.on('draw.delete', () => {
  console.log('delete');
  removeTmpAddrListOnMapAndDots();
  removeRoute();
});


/* Below is the functions of drawing tool */

// use the coordinates you just drew to make your directions request
function updateRoute() {
  removeRoute(); // overwrite any existing layers
  const data = draw.getAll();
  prevIds = data.features.map(({id}) => id);
  const answer = document.getElementById('calculated-line');
  const lastFeature = data.features.length - 1;
  const coords = data.features[lastFeature].geometry.coordinates;
  const newCoords = coords.join(';');
  getMatch(newCoords);
}

// make a directions request
function getMatch(e) {
  const url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + e + '?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
  const req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', url, true);
  req.onload  = function() {
    const jsonResponse = req.response;
    if (jsonResponse.routes) {
      const distance = jsonResponse.routes[0].distance * 0.001;
      const duration = jsonResponse.routes[0].duration / 60;
      document.getElementById('calculated-line').innerHTML = 'Total Distance: ' + distance.toFixed(2) + ' km<br>Total Driving Duration: ' + duration.toFixed(2) + ' minutes';
      document.getElementById('calculated-line').style.fontSize = '17px';
      const coords = jsonResponse.routes[0].geometry;
      // add the route to the map
      addRoute(coords);
      // when addrCoords are calculated, then we can do comparison
      promise.then(() => {
        addClosedCoordMarkers(addrCoords, coords.coordinates);
      });
    }
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
  if (map.getSource('route')) {
    map.removeLayer('route');
    map.removeSource('route');
    document.getElementById('calculated-line').innerHTML = 'You can draw the route on the map.';
    document.getElementById('calculated-line').style.fontSize = '27px';
  } else  {
    return;
  }
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   // distance = R * c, Distance in km
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

function addClosedCoordMarkers(allCoords, routeCoords) {
  tmpAddrListOnMap = {};
  for (let i = 0; i < routeCoords.length; ++i) {
    for (const [addr] of Object.entries(allCoords)) {
      let distance = getDistanceFromLatLonInKm(routeCoords[i][1], routeCoords[i][0], allCoords[addr][1], allCoords[addr][0]);
      if (distance < 0.5) {
        tmpAddrListOnMap[addr] += 1;
        if (map.getSource(addr + '_geojson') === undefined) {
          const tmpGeojson = createTmpGeojson(allCoords[addr]);
          map.addSource(addr + '_geojson', {type: 'geojson', data: tmpGeojson});
        }
        const layer = map.getLayer(addr + '_layer');
        if (layer === undefined) {
          const tmpLayerObj = createLayerObj(addr, 'hotel-blue', '');
          map.addLayer(tmpLayerObj);
        }
      }
    }
  }

  console.log(tmpAddrListOnMap);
  let event = new CustomEvent(
    "updateMapSidebar",
    {
      detail: {
        message: tmpAddrListOnMap,
        time: new Date()
      },
      bubbles: true,
      cancelable: true
    }
  );
  document.getElementById('mapsidebar').dispatchEvent(event);
}

function removeAllDefaultLayers() {
  for (let i = 0; i < defaultAddrList.length; ++ i) {
    // if (map.getSource(defaultAddrList[i] + '_geojson')) {
    //   map.removeSource(defaultAddrList[i] + '_geojson');
    // }
    if (map.getLayer(defaultAddrList[i] + '_layer')) {
      map.removeLayer(defaultAddrList[i] + '_layer');
    }
  }
}

function removeTmpAddrListOnMapOnly() {
  for (let i = 0; i < tmpAddrListOnMap.length; ++ i) {
    if (map.getLayer(tmpAddrListOnMap[i] + '_layer')) {
      map.removeLayer(tmpAddrListOnMap[i] + '_layer');
    }
  }
}

function removeTmpAddrListOnMapAndDots() {
  for (let i = 0; i < tmpAddrListOnMap.length; ++ i) {
    if (map.getLayer(tmpAddrListOnMap[i] + '_layer')) {
      map.removeLayer(tmpAddrListOnMap[i] + '_layer');
    }
  }
  // draw.deleteAll();
  if (prevIds.length !== 0) {
    draw.delete(prevIds);
    prevIds = [];
  }
}
function createTmpGeojson(coords) {
  return {
    'type': 'FeatureCollection',
    'features': [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': coords
      },
      'properties': {
        'title': '',
        'icon': 'lodging'
      }
    }]
  };
}

function createLayerObj(addrId, iconImage, title) {
  return {
    'id': addrId + '_layer',
    'type': 'symbol',
    'source': addrId + '_geojson',
    'layout': {
      'icon-image': iconImage,
      'text-field': title,
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.6],
      'text-anchor': "top"
    }
  };
}

document.getElementById('mapEle').addEventListener('updateIcon', () => {
  let location = event.detail.message;
  // let coord = addrCoords[location];
  if (map.getLayoutProperty(location + '_layer', 'icon-image') === 'hotel-blue') {
    map.setLayoutProperty(location + '_layer', 'icon-image', 'hotel-red');
  } else {
    map.setLayoutProperty(location + '_layer', 'icon-image', 'hotel-blue');
  }
});
