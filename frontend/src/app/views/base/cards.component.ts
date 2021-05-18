import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  providers: [AuthService, HttpClient],
})
export class CardsComponent implements OnInit {

  public images;
  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.getimage();
  }
  getimage() {
    this.Auth.getImages().subscribe(
      data => {
        this.images = [];
        for (let x in data) {
          if (data[x].imagePath) {
            this.images.push(data[x]);
          }
        }
        console.log(data);
       },
      err => alert(err.error),
      () => console.log('done Loading Users', this.images)
    )
  }
  myFunction(img) {
    console.log(img)
    localStorage.setItem("imgurl", img)
    this.router.navigate(['/dashboard/images/edit'])
  }





}
