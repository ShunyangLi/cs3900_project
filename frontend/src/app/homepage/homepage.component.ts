import { Component, OnInit } from '@angular/core';
import {SearchInfo} from './SearchInfo';
import {SearchService} from '../services/search.service';
import {SearchRes} from '../search-result/searchRes';
import {Router, ParamMap, ActivatedRoute, Route} from '@angular/router';
import {Output, EventEmitter} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [SearchService]
})
export class HomepageComponent implements OnInit {
  public message: Array<SearchRes> = [];
  private searchInfo: SearchInfo;
  private returnRes: string;
  // private data: DataService;

  constructor(private searchService: SearchService, private router: Router, private data: DataService) {
    this.searchInfo = new SearchInfo('', 'Large');
    this.data = new DataService();
  }

  ngOnInit() {
   //this.data.currentMessage.subscribe(message => this.message = message);
  }


  public onSearchSubmit(): void {
    console.log('run serach serve')
    this.searchService.search(this.searchInfo).subscribe(
      res => {
        this.returnRes = JSON.stringify(res);
        JSON.parse(this.returnRes).res.forEach((obj) => {
          const searchres = new SearchRes('', '', '', '', [], '', ''
          , '', '', '', '');
          searchres.bathroom = obj.bedrooms
          searchres.bedrooms = obj.bedrooms;
          searchres.description = obj.description;
          searchres.email = obj.email;
          searchres.img_url = obj.img_url;
          searchres.location = obj.location;
          searchres.name = obj.name;
          searchres.phone = obj.phone;
          searchres.price = obj.price;
          searchres.roomtype = obj.roomtype;
          searchres.web = obj.web;
          // console.log(searchres.bathroom);
          // console.log(searchres.web);
          // console.log(searchres.img_url);
          // console.log(searchres.price);
          this.message.push(searchres);
          console.log(this.message);

        });
      }
    );
    console.log(this.message[0]);
    this.data.currentMessage.subscribe(message => this.message = message)
    this.router.navigateByUrl('SearchResult');
  }
  spilt_url(imgurl: string): string[] {
    const res = imgurl.toString().replace(/[{}]/g, '').split(/[,]/g);
    return res;
  }
}
