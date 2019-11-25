import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EditFormService} from '../services/edit-form.service';
import {HotelSearchResultInfo} from '../search-result/hotelSearchResultInfo';
import {ImageService} from '../services/image.service';

@Component({
  selector: 'app-imagesman',
  templateUrl: './imagesman.component.html',
  styleUrls: ['./imagesman.component.css'],
  providers: [EditFormService, ImageService]
})
export class ImagesmanComponent implements OnInit {

  isRoom = false;
  hotelId: string;
  roomId: string;
  token: string;
  noImage = true;
  curHotel: HotelSearchResultInfo;
  // tslint:disable-next-line:max-line-length
  /**
   * This class is the controller for hotel image update
   * @param router
   * @param activatedRoute get the current activated route
   * @param editService Http connection service for edit information of hotel
   * @param imageService Http connection service for send image
   */
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private editService: EditFormService, private imageService: ImageService) { }

  /**
   * Initialisation for update image
   */
  ngOnInit() {
    this.token = window.localStorage.getItem('token');
    if (window.location.href.match('.*/images/hotel/.*')) {
      this.hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
      this.editService.getHotels(this.token).subscribe((res) => {
        // console.log(res);
        // @ts-ignore
        res.res.forEach((obj) => {
          // tslint:disable-next-line:triple-equals
          if (obj.hotel_id == this.hotelId) {
            window.localStorage.setItem('update_hotel', JSON.stringify(obj));
            // tslint:disable-next-line:max-line-length
            this.curHotel = new HotelSearchResultInfo(obj.hotel_id, obj.description, obj.email, obj.img_url, obj.hotel_address, obj.hotel_name, obj.phone, obj.host, obj.rating);
            // tslint:disable-next-line:triple-equals
            if (this.curHotel.img_url.length != 0) {
              this.noImage = false;
            }
            // console.log(this.curHotel.img_url);
          }
        });
      });
    } else {
      this.isRoom = true;
      this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
    }

  }

  /**
   *  The handler for submitting the image form
   *  it will send the image to backend server
   * @param imageInput any image
   */
  public onHotelImageSubmit(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file);
    // this.imageService.saveHotelImage(this.token, file, this.curHotel).subscribe(res =>
    // console.log(res));
  }
}
