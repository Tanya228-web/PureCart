import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  constructor(private http:HttpClient) { }
  createProduct(productData:any){
    let url='http://localhost:3000/products'
    this.http.post(url,productData).subscribe((data:any)=>console.log(data))

  }
  getProduct(){
    let url='http://localhost:3000/products'
    return  this.http.get(url)
  }
  removeProduct(id:any){
    let url=`http://localhost:3000/products/${id}`
    return this.http.delete(url,id)

  }
  editProduct(){
    
  }

}
