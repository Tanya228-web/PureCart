import { Component } from '@angular/core';
import { ProductServicesService } from '../services/product-services.service';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-seller-home',
  imports: [NgFor],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  products: any = [];
  constructor(private service: ProductServicesService) {}
  ngOnInit() {
    this.service.getProduct().subscribe((data) => {
      this.products = data;
      console.log(this.products)
    });
  }
}
