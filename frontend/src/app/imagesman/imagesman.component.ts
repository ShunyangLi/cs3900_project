import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EditFormService} from "../services/edit-form.service";

@Component({
  selector: 'app-imagesman',
  templateUrl: './imagesman.component.html',
  styleUrls: ['./imagesman.component.css']
})
export class ImagesmanComponent implements OnInit {

  isRoom = false;
  hotelId: string;
  roomId: string;
  token: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private editService: EditFormService) { }


  ngOnInit() {
    this.token = window.localStorage.getItem('token');
    if (window.location.href.match('.*/images/hotel/.*')) {
      this.hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
    } else {
      this.isRoom = true;
      this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
    }

  }

}
