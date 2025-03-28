import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductServicesService } from '../services/product-services.service';

@Component({
  selector: 'app-add-to-cart',
  imports: [NgFor],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})
export class AddToCartComponent {
  cartData: any = [];
  constructor(private productService: ProductServicesService) {}

  ngOnInit() {
    this.getCartData();

    // cartDetails = data.filter((d: any) => parseData.id == d.userId);
    //this.cartData=cartDetails;
    // let obj: any = {};
    // cartDetails.forEach((val: any) => {
    //   if (obj[val.productId]) {
    //     obj[val.productId].quantity += val.quantity;
    //   } else {
    //     obj[val.productId] = val;
    //   }
    // });
    // this.cartData = Object.values(obj);
    // console.log(this.cartData)
  }
  getCartData() {
    let userData = localStorage.getItem('users');
    let parseData = userData && JSON.parse(userData);
    //let cartDetails: any = [];

    this.productService.getCart(parseData.id).subscribe((data: any) => {
      this.cartData = data;
      console.log(this.cartData);
    });
  }
  removeToCart(id: any) {
    this.productService.removeCartItem(id).subscribe((data: any) => {
      console.log(data);
      this.getCartData();
    });
  }
  
}
