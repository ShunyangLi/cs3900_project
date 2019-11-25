import { Component, OnInit } from '@angular/core';
import {SearchReq} from './searchReq';
import {SearchService} from '../services/search.service';
import {HotelSearchResultInfo} from '../search-result/hotelSearchResultInfo';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [SearchService, LocalStorageService]
})

export class HomepageComponent implements OnInit {
  private searchReq: SearchReq;
  private resStr: string;
  public hotelSearchResultList: Array<string> = [];

  /**
   * This class is the controller for homepage especially handle search
   * @param searchService Http connection service for homepage controller
   * @param localStorageService store the search result on local storage service
   */
  constructor(private searchService: SearchService, private localStorageService: LocalStorageService) {
    this.searchReq = new SearchReq('');
  }

  ngOnInit() {
  }

  /**
   * this submit is send search information to backend and get result
   * then storage the result on local storage service
   */
  public onSearchSubmit(): void {
    this.searchService.search(this.searchReq.location).subscribe(
      res => {
        this.resStr = JSON.stringify(res);
        JSON.parse(this.resStr).res.forEach((obj) => {
          this.hotelSearchResultList.push(JSON.stringify(obj));
        });
        this.localStorageService.storeOnLocalStorage(this.hotelSearchResultList, 'hotelSearchResults');
        window.location.assign('/SearchResult');


      }
    );
  }
}
