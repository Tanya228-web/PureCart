import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  loginError=""
  
  isShow = true;
  constructor(private service: UserService,private router:Router) {}
  
  signUp(value: any) {
    this.service.userSignUp(value).subscribe((data:any)=>console.log(data))



  }
 
  Login(value: any) {
    this.service.userLogin(value).subscribe((data:any)=>{
      if(data.body.length==1){
        this.loginError=""
        localStorage.setItem("users",JSON.stringify(data.body[0]))
       this.router.navigate([''])
      }
      else{
        this.loginError="wrong username and password"

      }
    })



  }
}
