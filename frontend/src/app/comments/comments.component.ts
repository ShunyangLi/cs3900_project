import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [AuthenticationService]
})
export class CommentsComponent implements OnInit {
  s = '@Chares<br><br><p>this is a good picture!!</p><img src="../../assets/images/spa.jpg">';
  public myForm: FormGroup = new FormGroup({
    // tslint:disable-next-line:max-line-length
    editor: new FormControl('<p><strong><em><u>Room Name:</u></em></strong></p><br><p><em><u><strong>Write your reviews:</strong></u></em></p><br><p><strong><em><u>Share some pictures:</u></em></strong></p></p>'),
    user: new FormControl('<b>@Anonymous</b><br><br>')
  });

  hotelName: string;
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit() {

    if (window.localStorage.getItem('token')) {

      this.authService.auth(window.localStorage.getItem('token')).subscribe((res) => {
        // @ts-ignore
        const firstName = res.profile.first_name;
        console.log(firstName);
        this.myForm.reset({user: '<b>@' + firstName + '</b><br><br>'});
      });
    }
    const hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
    JSON.parse(window.localStorage.getItem('hotelSearchResults')).addrList.forEach((obj => {
      const tmp = JSON.parse(obj);
      // tslint:disable-next-line:triple-equals
      if (tmp.hotel_id == hotelId) {
        this.hotelName = tmp.hotel_name;
      }
    }));
  }

  public onSubmitComment(): void {
    console.log(this.myForm.controls.user.value);
  }
}
