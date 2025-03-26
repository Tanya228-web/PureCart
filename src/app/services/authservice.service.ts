
import { EventEmitter, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  
   isSellerLoggedIn = new BehaviorSubject<boolean>(false);
    isError = new EventEmitter<boolean>(false);
  
    constructor(private http: HttpClient, private router: Router) {}
    userSignUp(data: any) {
      this.http
        .post('http://localhost:3000/seller', data, { observe: 'response' })
        .subscribe((result: any) => {
          console.log(result);
          if (result) {
            localStorage.setItem('result', JSON.stringify(result.body));
            this.router.navigate(['seller-home']);
          }
        });
    }
    reloadSeller() {
      if (localStorage.getItem('result')) {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
      }
    }
    userlogin(data: any) {
      let url = `http://localhost:3000/seller?email=${data.Email}&password=${data.Password}`;
  
      this.http.get(url, { observe: 'response' }).subscribe((result: any) => {
        if (result.body.length == 1) {
          this.isError.emit(false);
  
          localStorage.setItem('result', JSON.stringify(result.body));
  
          this.router.navigate(['seller-home']);
        } else {
          console.log('error');
          this.isError.emit(true);
        }
      });
    }
    sellerlogout() {
      localStorage.removeItem('result');
      this.router.navigate(['seller']);
    }
   
}
