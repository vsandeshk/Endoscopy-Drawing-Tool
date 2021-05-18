import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService, HttpClient],
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  registerUser(event) {
    event.preventDefault()
    const errors = []
    const target = event.target
    const username = target.querySelector("#username").value
    const password = target.querySelector('#password').value
    const cpassword = target.querySelector('#cpassword').value
    const fName = target.querySelector('#fName').value
    const lName = target.querySelector('#lName').value
    const dob = target.querySelector('#dob').value
    const gender = target.querySelector('#gender').value

    if (password != cpassword) {
      errors.push("Passwords Do Not Match")
    }

    if (errors.length === 0) {
      this.auth.registerUser(username, password, fName, lName, dob, gender).subscribe(data => {
        console.log(data)
        if (data.success) {
          this.router.navigate([''])
        }
      }, error => {
        alert(error.error);
      })
    }

  }

}
