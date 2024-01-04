import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css'
})
export class HelloComponent{
  Username: string= "";
  Password: string= "";

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    console.log('Login attempt with:', this.Username, this.Password);
    // Implement your login logic here
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json' // Telling Angular to expect a text response
    };
    this.http.post('http://143.198.9.41:8080/clinicians/signin', {userName:this.Username,password:this.Password},httpOptions)
      .subscribe(
        response => {
          console.log(response.toString());
          console.log('Login successful', response);
          // Handle successful login here)
          if (response === "signIn successful"){
            console.log("signIn successful");
            this.router.navigate(['/partient-list']);
          }else{
            console.log("signIn failed");
          }
          
        },
        error => {
          console.error('Login error', error);
          // Handle login error here
        }
      );


  }
  clickLogin() {
    console.log('Login attempt with:', this.Username, this.Password);
    // Implement your login logic here
  }
  
}
