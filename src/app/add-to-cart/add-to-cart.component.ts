import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductServicesService } from '../services/product-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  imports: [NgFor],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})
export class AddToCartComponent {
  cartData: any = [];
  
  priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 100, // Set delivery fee
    total: 0,
  };

  constructor(private productService: ProductServicesService,private router:Router) {}

  ngOnInit() {
    this.getCartData();
  }

  getCartData() {
    let userData = localStorage.getItem('users');
    let parseData = userData ? JSON.parse(userData) : null;

    if (!parseData || !parseData.id) {
      console.error('User data not found or invalid');
      return;
    }

    this.productService.getCart(parseData.id).subscribe((data: any) => {
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

  removeToCart(id: any) {
    this.productService.removeCartItem(id).subscribe((data: any) => {
      console.log('Item removed:', data);
      this.getCartData(); // Refresh cart after removal
    });
  }
  checkOut(){
  this.router.navigate(['checkout'])
  }
}
