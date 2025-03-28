import { Component } from '@angular/core';
import { ProductServicesService } from '../services/product-services.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [NgFor],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  orderDetails: any = [];
  constructor(private productservice: ProductServicesService) {}

  ngOnInit() {
    this.getOrder();
  }
  getOrder() {
    let userData = localStorage.getItem('users');
    let userDataId = userData && JSON.parse(userData).id;
    if (userDataId) {
      this.productservice.getOrder(userDataId).subscribe((data: any) => {
        this.orderDetails = data;
      });
    }
  }
  cancelOrder(id: any) {
    this.productservice.deleteOrder(id).subscribe((data: any) => {
      console.log(data);
      this.getOrder();
    });
  }
}
