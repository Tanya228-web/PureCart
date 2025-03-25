import { ProductServicesService } from './../services/product-services.service';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  constructor(private service:ProductServicesService){

  }
  submit(value:any){
    this.service.createProduct(value);

  }
  
}
