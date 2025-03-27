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
  cartData:any=[]
  constructor(private productService: ProductServicesService) {}
  

  ngOnInit() {
    let userData = localStorage.getItem('users');
    let parseData = userData && JSON.parse(userData);
    let cartDetails: any = [];
    
    this.productService.getCart().subscribe((data: any) => {
      cartDetails = data.filter((d: any) => parseData.id == d.userId);
      let obj:any={}
      cartDetails.forEach((val:any)=>{
        if(obj[val.productId]){
          obj[val.productId].quantity+=val.quantity
        }
        else{
          obj[val.productId]=val
        }

      })
      this.cartData=Object.values(obj)
      


      
    });
  }

}
