import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductServicesService } from '../services/product-services.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, FormsModule,RouterLink,NgFor],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productCount: number = 1;
  id: string = '';
  singleDetail: any = null;
  activeTab: string = 'details';
  isLoading: boolean = true;

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private productService: ProductServicesService,
    private route: Router
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      this.loadProductDetails();
    });
  }

  loadProductDetails() {
    this.isLoading = true;
    this.userService.getProduct(this.id).subscribe({
      next: (product: any) => {
        this.singleDetail = product;
        // Initialize with default values if missing
        this.singleDetail.stock = this.singleDetail.stock || 10;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.isLoading = false;
      }
    });
  }

  productCounter(operation: string) {
    if (operation === 'dec' && this.productCount > 1) {
      this.productCount--;
    } else if (operation === 'inc' && this.productCount < (this.singleDetail?.stock || 10)) {
      this.productCount++;
    }
  }

  addToCart() {
    const userData = localStorage.getItem('users');
    if (!userData) {
      this.route.navigate(['/userlogin']);
      return;
    }

    const user = JSON.parse(userData);
    const cartData = {
      ...this.singleDetail,
      userId: user.id,
      productId: this.singleDetail.id,
      quantity: this.productCount
    };
    delete cartData.id;

    this.productService.addCart(cartData).subscribe({
      next: () => {
        this.route.navigate(['/addToCart']);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        alert('Failed to add product to cart');
      }
    });
  }

  buyNow() {
    this.addToCart();
    this.route.navigate(['/checkout']);
  }

  addToWishlist() {
    // Implement wishlist functionality
    alert('Added to wishlist');
  }

  shareProduct() {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: this.singleDetail.name,
        text: this.singleDetail.description,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      alert('Share this product: ' + window.location.href);
    }
  }

  changeMainImage(imgUrl: string) {
    this.singleDetail.image = imgUrl;
  }
}