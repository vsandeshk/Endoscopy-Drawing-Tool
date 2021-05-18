import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, HttpClient],
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value


    this.Auth.getUserDetails(username, password).subscribe(data => {
      if (data.success) {
        localStorage.setItem("token", data.accessToken)
        console.log(localStorage.getItem("token"))

        this.router.navigate(['/dashboard/images/public'])

      }
      else {
        alert("eror")
      }
    }, error => {
      alert(error.error);
    })
  }

}
