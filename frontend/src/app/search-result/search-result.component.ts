import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router, ParamMap, ActivatedRoute, Route} from '@angular/router';
import {HomepageComponent} from '../homepage/homepage.component';
import {HotelSearchResultInfo} from './hotelSearchResultInfo';
import {DataService} from '../services/data.service';
import {SearchService} from '../services/search.service';
import {LocalStorageService} from '../services/local-storage.service';
import {SearchReq} from '../homepage/searchReq';
import {HotelSearchResultInfoPrice} from './hotelSearchInfoPrice';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  providers: [SearchService, LocalStorageService]
})

export class SearchResultComponent implements OnInit {
  private searchReq: SearchReq;
  private resStr: string;
  public hotelSearchResultList: Array<string> = [];
  public show: Array<HotelSearchResultInfoPrice> = [];

  /**
   * This class is the controller for search result
   * @param searchService Http connection service for search hotel
   * @param localStorageService Http connection service for storage information
   */
  constructor(private searchService: SearchService, private localStorageService: LocalStorageService) {
    this.searchReq = new SearchReq('');
  }

  /**
   * Initialisation of the Search results list page
   */
  ngOnInit() {
    JSON.parse(window.localStorage.getItem('hotelSearchResults')).addrList.forEach((obj => {
      const tmp = JSON.parse(obj);
      this.show.push(tmp);
    }));
  }

  /**
   * The handler for get search Result from backend and open the SearchResult url
   * It will pass the location to the backend
   */
  public onSearchSubmit(): void {
    this.searchService.search(this.searchReq.location).subscribe(
      res => {
        console.log(res);
        this.resStr = JSON.stringify(res);
        JSON.parse(this.resStr).res.forEach((obj) => {
          this.hotelSearchResultList.push(JSON.stringify(obj));
        });
        this.localStorageService.storeOnLocalStorage(this.hotelSearchResultList, 'hotelSearchResults');
        window.open('/SearchResult', '_blank');
      }
    );
  }

  /**
   * this sort hotel by price
   */
  public onPriceClick(): void {
    console.log('change price');
    this.show.sort((a, b) => (a.min_price > b.min_price) ? 1 : (b.min_price > a.min_price) ? -1 : 0);
  }

  /**
   * this sort hotel by rating
   */
  public onRatingClick(): void {
    console.log('change rating');
  }

  /**
   * this sort hotel by name
   */
  public onSortNameClick(): void {
    console.log('clicked sort name');
    this.show.sort((a, b) => (a.hotel_name > b.hotel_name) ? 1 : (b.hotel_name > a.hotel_name) ? -1 : 0);
  }

  // public onFindRoomClick(): void {
  // }
  /**
   * this counter the star of hotel
   * @param starNum the star of each hotel
   */
  public counter(starNum: string): Array<number> {
    const n: Array<number>  = [];
    // tslint:disable-next-line:radix
    for (let i = 1; i <= parseInt(starNum); i++) {
      n.push(i);
    }
    return n;
  }
}
