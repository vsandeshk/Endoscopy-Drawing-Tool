import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [AuthService, HttpClient],
})
export class UploadComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  uploadImage(event) {
    event.preventDefault()
    const target = event.target
    const endoscopyImage = target.querySelector('#endoscopyImage').files[0];
    const imagetype = target.querySelector('#imagetype').value;
    this.Auth.UploadImage(endoscopyImage, imagetype).subscribe(data => {
      if (data.success) {
        if(imagetype == "Private") {
          this.router.navigate(['/dashboard/images/private'])
        } else {
          this.router.navigate(['/dashboard/images/public'])
        }
      }
      else {
        alert(data.message)
      }
    }, error => {
      alert(error.error);
    })
  }

}
