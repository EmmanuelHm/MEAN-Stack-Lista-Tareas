import { Component, OnInit } from '@angular/core';
// Service Auth
import { AuthService } from '../../service/auth.service';
// Router
import { Router }  from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // VARIABLES
  signUpUser = {
    name: "",
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
  signUp(){
    this.auth.signUpUser(this.signUpUser)
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
