import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-com-recommendation',
  templateUrl: './booking-com-recommendation.component.html',
  styleUrls: ['./booking-com-recommendation.component.css']
})
export class BookingComRecommendationComponent implements OnInit {

  public today = new Date().toLocaleDateString();
  constructor() { }

  ngOnInit() {
  }

}
