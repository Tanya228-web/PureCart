import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getProducts(){
    let url='http://localhost:3000/products'
    return  this.http.get(url)
  }


}
