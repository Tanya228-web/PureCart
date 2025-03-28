import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { ProductServicesService } from '../services/product-services.service';

@Component({
  selector: 'app-product-details',
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productCount: number = 1;
  id: any = '';
  singleDetail: any = {};
  constructor(
    private router: ActivatedRoute,
    private service: UserService,
    private productservice: ProductServicesService,
    private route:Router
  ) {}
  ngOnInit() {
    this.router.paramMap.subscribe((data: any) => {
      this.id = data.params.id;
    });
    this.service.getProduct(this.id).subscribe((d: any) => {
      this.singleDetail = d;
      console.log(this.singleDetail);
    });
  }
  productCounter(value: any) {
    if (value == 'dec') {
      if (this.productCount > 1) {
        this.productCount--;
      }
    } else {
      this.productCount++;
    }
  }

  addToCart() {
    let userData = localStorage.getItem('users');
    let getData = userData && JSON.parse(userData);
    
    let cartData={...this.singleDetail,"userid":getData.id,"productId":this.singleDetail.id,"quantity":this.productCount}
    delete cartData.id
    console.log(cartData)
  
    
    // let cartData = {
    //   name: this.singleDetail.name,
    //   price: this.singleDetail.price,
    //   category: this.singleDetail.category,
    //   color: this.singleDetail.color,
    //   description: this.singleDetail.description,
    //   image: this.singleDetail.image,
    //   quantity: this.productCount,
    //   productId: this.singleDetail.id,
    //   userId: getData.id,//current user id
    // };
    // console.log("data",data)
    // console.log("cartdata",cartData)

    this.productservice
      .addCart(cartData)
      .subscribe((data: any) => data);
      this.route.navigate(['addToCart'])


  }
}
