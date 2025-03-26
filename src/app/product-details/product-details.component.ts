import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';

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
  constructor(private router: ActivatedRoute, private service: UserService) {}
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
  
}
