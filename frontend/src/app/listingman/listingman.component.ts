import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EditFormService} from '../services/edit-form.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import {State, process, SortDescriptor} from '@progress/kendo-data-query';
import {Observable} from 'rxjs';
import {ListingInfo} from './listingInfo';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listingman',
  templateUrl: './listingman.component.html',
  styleUrls: ['./listingman.component.css', './page-template.css', './pdf-styles.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [EditFormService]
})
export class ListingmanComponent implements OnInit {

  // public editListing: ListingInfo;
  // public isNew: boolean;
  public token;
  // public listingArray: Array<ListingInfo>;
  public gridData: GridDataResult;
  public view: Observable<GridDataResult>;
  constructor(private editService: EditFormService) {
    this.view = editService;
  }

  public ngOnInit(): void {
    this.token = window.localStorage.getItem('token');
    this.editService.read(this.token);
    this.view.subscribe(res => {
      console.log(res);
      this.gridData = res;
    });
  }

}
