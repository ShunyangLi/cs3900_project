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
  constructor(private searchService: SearchService, private localStorageService: LocalStorageService) {
    this.searchReq = new SearchReq('');
  }

  ngOnInit() {
  }


  public onSearchSubmit(): void {
    this.searchService.search(this.searchReq.location).subscribe(
      res => {
        console.log(res);
        this.resStr = JSON.stringify(res);
        JSON.parse(this.resStr).res.forEach((obj) => {
          // const searchResult = new HotelSearchResultInfo('', '',
          //                 '', [], '', '', '');
          // searchResult.hotel_id = obj.hotel_id;
          // searchResult.description = obj.description;
          // searchResult.email = obj.email;
          // searchResult.img_url = obj.img_url;
          // searchResult.hotel_address = obj.hotel_address;
          // searchResult.hotel_name = obj.hotel_name;
          // searchResult.phone = obj.phone;
          this.hotelSearchResultList.push(JSON.stringify(obj));
        });
        this.localStorageService.storeOnLocalStorage(this.hotelSearchResultList, 'hotelSearchResults');
        window.location.assign('/SearchResult');


      }
    );
  }
}
