import { Component, OnInit } from '@angular/core';
// Service Auth
import { AuthService } from '../../service/auth.service';
// Router
import { Router }  from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // VARIABLES
  loginUser = {
    email: "",
    password: ""
  }

  // CONSTRUCTOR
  constructor(
    private auth : AuthService, //User Auth Service
    private router: Router     //Router
  ) { }

  ngOnInit(): void {
  }

  // METHODS
  login(){
    this.auth.loginUser(this.loginUser)
      .subscribe(
        res => {
          console.log(res)
          // Save token in LocalStorage
          localStorage.setItem('token', res.jwtToken)
          // Navigate to Task page
          this.router.navigate(['/tasks'])
        },
        err => console.log(err)
      )
  }

}
