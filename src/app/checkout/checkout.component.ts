import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServicesService } from '../services/product-services.service';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartData: any = [];
  parseData: any = {};

  priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 100, // Set delivery fee
    total: 0,
  };

  constructor(
    private productService: ProductServicesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCartData();
  }

  getCartData() {
    let userData = localStorage.getItem('users');
    this.parseData = userData ? JSON.parse(userData) : null;

    if (!this.parseData || !this.parseData.id) {
      console.error('User data not found or invalid');
      return;
    }

    this.productService.getCart(this.parseData.id).subscribe((data: any) => {
      this.cartData = data;

      // Reset priceSummary before recalculating
      this.priceSummary = {
        price: 0,
        discount: 0,
        tax: 0,
        delivery: 100,
        total: 0,
      };

      this.cartData.forEach((item: any) => {
        let itemPrice = Number(item.price) || 0;
        let itemQuantity = Number(item.quantity) || 0;

        this.priceSummary.price += itemPrice * itemQuantity;
      });

      // Apply proper rounding
      this.priceSummary.discount = Math.round(this.priceSummary.price * 0.1);
      this.priceSummary.tax = Math.round(this.priceSummary.price * 0.2);
      this.priceSummary.total =
        this.priceSummary.price +
        this.priceSummary.tax +
        this.priceSummary.delivery -
        this.priceSummary.discount;

      console.log(this.priceSummary);
    });
  }

  orderDetails(value: any) {
    let obj = {
      ...value,
      totalPrice: this.priceSummary.price,
      userId: this.parseData.id

      
    };
    this.productService.order(obj).subscribe((data:any)=>{
      this.cartData.forEach((data:any)=>{
        this.productService.removeCartItem(data.id).subscribe((data:any)=>console.log(data))
      })
      this.router.navigate(['order'])
    })
  
  }
}
