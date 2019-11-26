import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {EditFormService} from '../services/edit-form.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import {State, process, SortDescriptor} from '@progress/kendo-data-query';
import {Observable} from 'rxjs';
import {ListingInfo} from './listingInfo';
import { map } from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {RoomInfo} from './roomInfo';

@Component({
  selector: 'app-listingman',
  templateUrl: './listingman.component.html',
  styleUrls: ['./listingman.component.css', './page-template.css', './pdf-styles.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [EditFormService]
})
export class ListingmanComponent implements OnInit {

  public curHotelName: string;
  public curHotelId: string;
  public showRoom = false;
  public token;
  public gridData: GridDataResult;
  public view: Observable<GridDataResult>;
  public loading = true;
  // public roomPageLoading = true;

  // Edit hotel form variables:
  public isNew: boolean;
  public active = false;
  public editListing: ListingInfo;
  public editHotelForm: FormGroup = new FormGroup({
    hotel_name: new FormControl(),
    hotel_address: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    description: new FormControl()
  });

  // Edit room form variables:
  public isNewRoom: boolean;
  public roomActive = false;
  public editRoom: RoomInfo;
  public editRoomForm: FormGroup = new FormGroup({
    adults: new FormControl(),
    bathroom: new FormControl(),
    bedroom: new FormControl(),
    children: new FormControl(),
    name: new FormControl(),
    price: new FormControl()
  });

  /**
   * This class is controller for add hotel , delete hotel and edit hotel
   * @param editService Http connection service fro edit hotel information
   */
  constructor(private editService: EditFormService) {
    this.view = editService;
  }

  /**
   * initialisation of the data
   */
  public ngOnInit(): void {
    this.getAllData();
  }

  /**
   * Through the user's token to get all hotel that user has
   */
  public getAllData(): void {
    this.token = window.localStorage.getItem('token');
    this.editService.read(this.token);
    this.view.subscribe(res => {
      console.log(res);
      this.gridData = res;
    });
    this.loading = false;
  }

  /**
   * get the room data
   * @param hotelId the hotel id
   */
  public getAllRoomData(hotelId: string): void {
    this.token = window.localStorage.getItem('token');
    this.editService.readRoom(this.token, hotelId);
    this.view.subscribe(res => {
      console.log('in get all room data');
      console.log(res);
      this.gridData = res;
    });
  }

  /**
   * show the rooms
   * @param dataItem the data contain hotel name and hotel id
   */
  // Hotel grid three buttons handlers:
  public onShowRooms(dataItem): void {
    this.showRoom = true;
    this.curHotelName = dataItem.hotel_name;
    this.curHotelId = dataItem.hotel_id;
    // this.roomPageLoading = true;
    this.loading = true;
    this.getAllRoomData(this.curHotelId);
    // this.roomPageLoading = false;
    this.loading = false;
  }

  /**
   * remove the hotel
   * @param dataItem the data contain hotel name and hotel id
   */
  public onRemoveHotel({dataItem}): void {
    console.log(dataItem);
    this.editService.remove(dataItem.hotel_id, this.token).subscribe(() => {
        this.loading = true;
        this.getAllData();
        this.loading = false;
    });
  }

  /**
   * edit the hotel information
   * @param rowIndex
   * @param dataItem the data contain hotel name and hotel id
   */
  public onEditHotel({rowIndex, dataItem}): void {
    console.log(rowIndex);
    console.log(dataItem);
    this.isNew = false;
    // tslint:disable-next-line:max-line-length
    this.editListing = new ListingInfo(dataItem.description, dataItem.email, '', dataItem.hotel_address, dataItem.hotel_id, dataItem.hotel_name, dataItem.phone, '', []);
    this.active = true;
    this.editHotelForm.reset(this.editListing);
  }

  /**
   * add new hotel to hotel list
   */
  // Edit Hotel Form handlers:
  public addNewHotel(): void {
    this.isNew = true;
    this.editListing = new ListingInfo('', '', '', '', '', '', '', '', []);
    this.active = true;
    this.editHotelForm.reset(this.editListing);
  }

  /**
   * close the hotel form
   */
  public closeHotelForm(): void {
    this.active = false;
  }

  /**
   * cancel the hotel form
   */
  public cancelHotelForm(): void {
    this.closeHotelForm();
  }

  /**
   * save the hotel form
   */
  public saveHotelForm(): void {
    // console.log(this.editHotelForm.value);
    this.editListing.hotel_name = this.editHotelForm.value.hotel_name;
    this.editListing.hotel_address = this.editHotelForm.value.hotel_address;
    this.editListing.description = this.editHotelForm.value.description;
    this.editListing.email = this.editHotelForm.value.email;
    this.editListing.phone = this.editHotelForm.value.phone;
    this.editService.saveHotel(this.editListing, this.token, this.isNew).subscribe(res => {
      console.log(res);
      this.closeHotelForm();
      // window.location.reload();
      this.loading = true;
      this.getAllData();
      this.loading = false;
    });
  }

  /**
   * edit the room of hotel
   * @param dataItem the data contain room information
   */
  // Room Grid button handlers:
  public onEditRoom({dataItem}): void {
    this.isNewRoom = false;
    // tslint:disable-next-line:max-line-length
    this.editRoom = new RoomInfo(dataItem.adults, dataItem.bathroom, dataItem.bedroom, dataItem.children, this.curHotelId, dataItem.name, dataItem.price, dataItem.room_id);
    this.roomActive = true;
    this.editRoomForm.reset(this.editRoom);
  }

  /**
   * remove room of hotel
   * @param dataItem the data contain room and hotel information
   */
  public onRemoveRoom({dataItem}): void {
    this.token = window.localStorage.getItem('token');
    this.editService.removeRoom(this.curHotelId, dataItem.room_id, this.token).subscribe(() => {
      // this.roomPageLoading = true;
      this.loading = true;
      this.getAllRoomData(this.curHotelId);
      // this.roomPageLoading = false;
      this.loading = false;
    });
  }

  /**
   * add new room to hotel
   */
  public addNewRoom(): void {
    this.isNewRoom = true;
    this.editRoom = new RoomInfo('', '', '', '', this.curHotelId, '', '', '');
    this.roomActive = true;
    this.editRoomForm.reset(this.editRoom);
  }

  /**
   * back to hotel page
   */
  public goBack(): void {
    this.showRoom = false;
    this.getAllData();
  }

  /**
   * save the room form
   */
  public saveRoomForm(): void {
    this.editRoom.adults = this.editRoomForm.value.adults;
    this.editRoom.children = this.editRoomForm.value.children;
    this.editRoom.name = this.editRoomForm.value.name;
    this.editRoom.bathroom = this.editRoomForm.value.bathroom;
    this.editRoom.bedroom = this.editRoomForm.value.bedroom;
    this.editRoom.price = this.editRoomForm.value.price;
    this.editService.saveRoom(this.editRoom, this.token, this.isNewRoom).subscribe(res => {
      console.log(res);
      this.closeRoomForm();
      // window.location.reload();
      // this.roomPageLoading = true;
      this.loading = true;
      this.getAllRoomData(this.curHotelId);
      // this.roomPageLoading = false;
      this.loading = false;
    });
  }

  /**
   * close room form
   */
  public closeRoomForm(): void {
    this.roomActive = false;
  }

  /**
   * cancel the room form
   */
  public cancelRoomForm(): void {
    this.closeRoomForm();
  }

  /**
   * open the room page
   * @param dataItem the data contain room and hotel information
   */
  public onImages(dataItem): void {
    if (this.showRoom) {
      window.open('/images/room/' + dataItem.room_id, '_blank');
    } else {
      window.open('/images/hotel/' + dataItem.hotel_id, '_blank');
    }
  }
}
