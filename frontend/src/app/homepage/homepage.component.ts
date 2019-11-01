import { Component, OnInit } from '@angular/core';
import {SearchInfo} from './SearchInfo';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [SearchService]
})
export class HomepageComponent implements OnInit {

  private searchInfo: SearchInfo;

  constructor(private searchService: SearchService) {
    this.searchInfo = new SearchInfo('', 'Large');
  }

  ngOnInit() {

  }

  public onSearchSubmit(): void {
    console.log(this.searchInfo.location);
    this.searchService.search(this.searchInfo).subscribe(
      res => console.log(res)
    );
  }
}
