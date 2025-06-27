// home.component.ts
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductServicesService } from '../services/product-services.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, NgbCarouselModule],
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any[] = [];
  filterProduct: any[] = [];
  isLoading = true;

  constructor(
    private userService: UserService,
    private productService: ProductServicesService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.userService.getProducts().subscribe({
      next: (data: any) => {
        this.products = Array.isArray(data) ? data : [];
        this.filterProduct = this.products.filter((d: any) => d.price > 5000);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.isLoading = false;
      }
    });
  }

  addToCart(product: any) {
    const userData = localStorage.getItem('users');
    if (!userData) {
      // Redirect to login if user not logged in
      // this.router.navigate(['/userlogin']);
      alert('Please login to add items to cart');
      return;
    }

    const userId = JSON.parse(userData).id;
    const cartItem = {
      productId: product.id,
      userId: userId,
      quantity: 1,
      price: product.price,
      name: product.name,
      image: product.image
    };

    this.productService.addCart(cartItem).subscribe({
      next: () => {
        alert('Product added to cart successfully');
        // You can update cart count here if needed
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        alert('Failed to add product to cart');
      }
    });
  }
}