import { ProductServicesService } from './../services/product-services.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-edit',
  imports: [FormsModule],
  templateUrl: './seller-edit.component.html',
  styleUrl: './seller-edit.component.css',
})
export class SellerEditComponent {
  sellerData: any = {};
  sellerId: any = '';
  constructor(
    private route: ActivatedRoute,
    private service: ProductServicesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((data: any) => {
      this.sellerId = data.params.id;
      // console.log(this.sellerId);
      this.getSeller();
    });
  }
  editHandler(data: any) {
    this.service.editProduct(data, this.sellerId).subscribe((data: any) => {
      this.router.navigate(['seller-home']);
    });
  }
  getSeller() {
    this.service.getSellerData(this.sellerId).subscribe((data: any) => {
      this.sellerData = data;
      // console.log(this.sellerData);
    });
  }
}
