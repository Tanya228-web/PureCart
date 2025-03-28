import { ProductDetailsComponent } from './../product-details/product-details.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root',
})
export class ProductServicesService {
  constructor(private http: HttpClient) {}
  createProduct(productData: any) {
    let url = 'http://localhost:3000/products';
    this.http
      .post(url, productData)
      .subscribe((data: any) => console.log(data));
  }
  getProduct() {
    let url = 'http://localhost:3000/products';
    return this.http.get(url);
  }
  removeProduct(id: any) {
    let url = `http://localhost:3000/products/${id}`;
    return this.http.delete(url);
  }
  editProduct(data: any, id: any) {
    let url = `http://localhost:3000/products/${id}`;
    return this.http.patch(url, data);
  }
  getSellerData(id: any) {
    let url = `http://localhost:3000/products/${id}`;
    return this.http.get(url);
  }
  addCart(data: any) {
    let url = 'http://localhost:3000/cart?';
    return this.http.post(url, data);
  }
  getCart(id: any) {
    let url = 'http://localhost:3000/cart?userId=' + id;
    return this.http.get(url);
  }
  removeCartItem(id: any) {
    let url = `http://localhost:3000/cart/${id}`;
    return this.http.delete(url);
  }
  order(value: any) {
    let url = 'http://localhost:3000/orders';
    return this.http.post(url, value);
  }
  getOrder(id: any) {
    let url = 'http://localhost:3000/orders?userId=' + id;
    return this.http.get(url);
  }
  deleteOrder(id: any) {
    let url = `http://localhost:3000/orders/${id}`;
    return this.http.delete(url);
  }
}
