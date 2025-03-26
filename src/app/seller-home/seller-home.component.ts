import { Component } from '@angular/core';
import { ProductServicesService } from '../services/product-services.service';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [NgFor,RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  // icon = faTrash;
  // iconEdit=faEdit;

  products: any = []
  constructor(private service: ProductServicesService) {}
  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this.service.getProduct().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
  }
  deleteProduct(item: any) {
    this.service.removeProduct(item).subscribe((data: any) => {
      console.log(data);
      this.getProduct();
    });
  
  }

  
}
