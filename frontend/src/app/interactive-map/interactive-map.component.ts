import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import mapboxgl from 'mapbox-gl';
// import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent implements OnInit {

  map: mapboxgl.map;
  // @ts-ignore
  @ViewChild('mapElement') mapElement: ElementRef;
  constructor() {}
  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2F3Y2F3IiwiYSI6ImNrMjRiMDgwMjE0dWszY24wbWZkN3FoaHkifQ.GHrkLXKycCDWwJ-nCI10-A';
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement, // container id
      style: 'mapbox://styles/mapbox/streets-v9', // hosted style id
      center: [-122.675246, 45.529431], // starting position
      zoom: 13, // starting zoom
      minZoom: 1 // keep it local
    });

    // const draw = new MapboxDraw();
    //
    // this.map.addControl(draw);
    //
    // this.map.on('load', {});
  //   const draw = new MapboxDraw({
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
  //   // add the draw tool to the map
  //   this.map.addControl(draw);
  }
}
