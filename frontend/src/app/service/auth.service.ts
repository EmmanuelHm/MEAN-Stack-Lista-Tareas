import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // VARIABLES
  private signUpURL = "http://localhost:3030/api/user";
  private loginURL = "http://localhost:3030/api/auth";

  // CONTRUCTOR
  constructor(
    private http: HttpClient, //My http variable (from HttpClient)
    private router: Router
  ) { }
  
  //METHODS 

    // SignUp User (Registro)
    public signUpUser(user){
      return this.http.post<any>(this.signUpURL, user)
    }

    // Login User (Ingreso)
    public loginUser(user){
      return this.http.post<any>(this.loginURL, user)
    }

    // Check if user is Logged
    isLogged(){
       return !!localStorage.getItem('token') //Answer will be true or false
    }

    // Get Token
    getToken(){
      return localStorage.getItem('token')
    }

    logoutUser(){
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    }
}
