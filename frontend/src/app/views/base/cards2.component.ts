import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards2',
  templateUrl: './cards2.component.html',
  styleUrls: ['./cards2.component.scss'],
  providers: [AuthService, HttpClient],
})
export class Cards2Component implements OnInit {

  public images;
  constructor(private Auth: AuthService) { }

  ngOnInit() {
    this.getimage();
  }
  getimage() {
    this.Auth.getPublicImages().subscribe(
      data => { this.images = data; console.log(this.images);
       },
      err => alert(err.error),
      () => console.log('done Loading Images: ', this.images)
    )
  }

}
