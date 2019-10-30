import { Component, OnInit } from '@angular/core';
import {MapService} from '../services/map.service';

@Component({
  selector: 'app-map-sidebar',
  templateUrl: './map-sidebar.component.html',
  styleUrls: ['./map-sidebar.component.css'],
  providers: [MapService]
})
export class MapSidebarComponent implements OnInit {

  private result: any;
  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.getAllHotels().subscribe(
      res => this.result = res
    );
  }

}
