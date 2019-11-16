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
  public showRoom = false;
  public active = false;
  public token;
  // public listingArray: Array<ListingInfo>;
  public gridData: GridDataResult;
  public view: Observable<GridDataResult>;
  public curEditAction = 'Edit';
  public curHotelName: string;
  constructor(private editService: EditFormService) {
    this.view = editService;
  }

  public ngOnInit(): void {
    this.getAllData();
  }

  public getAllData(): void {
    this.token = window.localStorage.getItem('token');
    this.editService.read(this.token);
    this.view.subscribe(res => {
      console.log(res);
      this.gridData = res;
    });
  }

  public onShowRooms(dataItem): void {
    this.showRoom = true;
    this.curHotelName = dataItem.hotel_name;
  }

  public onRemoveHotel({dataItem}): void {
    console.log(dataItem);
  }

  public onEditHotel({rowIndex, dataItem}): void {
    console.log(rowIndex);
    console.log(dataItem);
  }

}
