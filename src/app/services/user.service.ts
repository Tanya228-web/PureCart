import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router:Router) {}
  getProducts() {
    let url = 'http://localhost:3000/products';
    return this.http.get(url);
  }
  getProduct(id: any) {
    let url = `http://localhost:3000/products/${id}`;
    return this.http.get(url);
  }

  userSignUp(value: any) {
    let url = 'http://localhost:3000/users';
    return this.http.post(url, value);
  }
  userLogin(data: any) {
    let url = `http://localhost:3000/users?email=${data.Email}&password=${data.Password}`;
    return this.http.get(url, { observe: 'response' });
  }
  userlogout() {
    localStorage.removeItem('users');
    this.router.navigate(['userlogin'])
  }
}
