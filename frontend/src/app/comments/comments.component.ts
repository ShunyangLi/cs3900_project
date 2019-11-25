import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {CommentsService} from '../services/comments.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [AuthenticationService, CommentsService]
})

export class CommentsComponent implements OnInit {
  public comments: Array<string> = new Array<string>();
  public myForm: FormGroup = new FormGroup({
    // tslint:disable-next-line:max-line-length
    editor: new FormControl('<p><strong><em><u>Room Name:</u></em></strong></p><br><p><em><u><strong>Write your reviews:</strong></u></em></p><br><p><strong><em><u>Share some pictures:</u></em></strong></p></p>'),
    user: new FormControl('<b>@Anonymous</b><br><br>')
  });
  hotelId: string;
  hotelName: string;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto'
  };

  /**
   * This class is the controller for comments web page
   * @param activatedRoute the helper object to grab hotel_id string from the URL
   * @param authService HTTP connection service for authenticating users when writing comments
   * so that the user first name can be displayed.
   * @param cs HTTP connection service for comment web page controller: sending comment strings to backend
   */
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService, private cs: CommentsService) { }

  /**
   * Initialisation of rendering comment web page:
   * 1. It authenticate users who is currently logging in
   * 2. It shows all comments written by other people and stored in our database
   */
  ngOnInit() {
    console.log(this.myForm.controls.editor.value);
    if (window.localStorage.getItem('token')) {

      // authenticating user login token
      this.authService.auth(window.localStorage.getItem('token')).subscribe((res) => {
        // @ts-ignore
        const firstName = res.profile.first_name;
        console.log(firstName);
        // tslint:disable-next-line:max-line-length
        this.myForm.reset({user: '<b>@' + firstName + '</b><br><br>', editor: '<p><strong><em><u>Room Name:</u></em></strong></p><br><p><em><u><strong>Write your reviews:</strong></u></em></p><br><p><strong><em><u>Share some pictures:</u></em></strong></p></p>'});
      });
    }
    const hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
    this.hotelId = hotelId;
    JSON.parse(window.localStorage.getItem('hotelSearchResults')).addrList.forEach((obj => {
      const tmp = JSON.parse(obj);
      // tslint:disable-next-line:triple-equals
      if (tmp.hotel_id == hotelId) {
        this.hotelName = tmp.hotel_name;
      }
    }));

    // getting all existing comments:
    this.cs.getComments(hotelId).subscribe((res) => {
      // @ts-ignore
      res.res.forEach((obj) => {
        this.comments.push(obj.review);
      });
      console.log(res);
    });
  }

  /**
   * The handler for transmitting the comment string to the backend via HTTP connection
   */
  public onSubmitComment(): void {
    // console.log(this.myForm.controls.editor.value);
    this.cs.postComments(this.myForm.controls.user.value + this.myForm.controls.editor.value, this.hotelId).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }
}
