import { Component } from '@angular/core';
import { FormsModule , NgForm} from '@angular/forms';

import { user } from '../interface/user';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-seller',
  imports: [FormsModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {
  isShow=true;
  errorMsg='';
 
  constructor(private service:AuthserviceService){}
  ngOnInit(){
  this.service.reloadSeller()}
  signUp(value:user){
    this.service.userSignUp(value)

  }
  login(data:any){
    this.service.userlogin(data)
    if(this.service.isError){
      this.errorMsg="email and password are not correct"
      
    }


  }

}
