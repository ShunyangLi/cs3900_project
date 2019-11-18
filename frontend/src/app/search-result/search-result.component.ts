import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router, ParamMap, ActivatedRoute, Route} from '@angular/router';
import {HomepageComponent} from '../homepage/homepage.component';
import {HotelSearchResultInfo} from './hotelSearchResultInfo';
import {DataService} from '../services/data.service';
import {SearchService} from '../services/search.service';
import {LocalStorageService} from '../services/local-storage.service';
import {SearchReq} from '../homepage/searchReq';

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
  public show: Array<HotelSearchResultInfo> = [];
  constructor(private searchService: SearchService, private localStorageService: LocalStorageService) {
    this.searchReq = new SearchReq('');
  }

  ngOnInit() {
    JSON.parse(window.localStorage.getItem('hotelSearchResults')).addrList.forEach((obj => {
      const tmp = JSON.parse(obj);
      this.show.push(tmp);
    }));
  }

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

  public onPriceClick(): void {
    console.log('change price');
  }

  public onRatingClick(): void {
    console.log('change rating');
  }

  public onSortNameClick(): void {
    console.log('clicked sort name');
    this.show.sort((a, b) => (a.hotel_name > b.hotel_name) ? 1 : (b.hotel_name > a.hotel_name) ? -1 : 0);
  }

  // public onFindRoomClick(): void {
  // }

  public counter(starNum: string): Array<number> {
    const n: Array<number>  = [];
    // tslint:disable-next-line:radix
    for (let i = 1; i <= parseInt(starNum); i++) {
      n.push(i);
    }
    return n;
  }
}
