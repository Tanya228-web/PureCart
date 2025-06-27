import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { UserService } from '../services/user.service';
import { ProductServicesService } from '../services/product-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenu = true;
  sellerName = '';
  isLogin = false;
  mobileMenuOpen = false;
  searchQuery = '';
  searchResults: any[] = [];
  cartCount = 0;
  isLoading = false;

  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private userService: UserService,
    private productService: ProductServicesService
  ) {}

  ngOnInit() {
    this.checkAuthState();
    this.router.events.subscribe(() => {
      this.checkAuthState();
      this.mobileMenuOpen = false;
    });
    
    this.loadCartCount();
  }

  checkAuthState() {
    const sellerData = localStorage.getItem('result');
    const userData = localStorage.getItem('users');
    
    if (this.router.url.includes('seller') && sellerData) {
      this.isMenu = false;
      try {
        const parsedData = JSON.parse(sellerData);
        this.sellerName = parsedData[0]?.name || parsedData?.name || 'Seller';
      } catch (e) {
        console.error('Error parsing seller data:', e);
        this.sellerName = 'Seller';
      }
    } else {
      this.isMenu = true;
    }
    
    this.isLogin = !!userData;
  }

  loadCartCount() {
    const userData = localStorage.getItem('users');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.productService.getCart(user.id).subscribe({
          next: (cartItems: any) => {
            this.cartCount = Array.isArray(cartItems) ? cartItems.length : 0;
          },
          error: (err) => {
            console.error('Error loading cart:', err);
            this.cartCount = 0;
          }
        });
      } catch (e) {
        console.error('Error parsing user data:', e);
        this.cartCount = 0;
      }
    } else {
      this.cartCount = 0;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.productService.getProduct().subscribe({
        next: (products: any) => {
          this.searchResults = Array.isArray(products) 
            ? products.filter(product => 
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
              ).slice(0, 5)
            : [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Search error:', err);
          this.searchResults = [];
          this.isLoading = false;
        }
      });
    } else {
      this.searchResults = [];
    }
  }

  sellerLogout() {
    this.authService.sellerlogout();
    this.isMenu = true;
    this.isLogin = false;
    this.router.navigate(['/']);
  }

  userLogout() {
    this.userService.userlogout();
    this.isLogin = false;
    this.cartCount = 0;
    this.router.navigate(['/userlogin']);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
  }
}