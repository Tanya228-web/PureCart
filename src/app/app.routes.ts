import { Component } from '@angular/core';
import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';

import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';

import { SellerEditComponent } from './seller-edit/seller-edit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserComponent } from './user/user.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'userlogin', component:UserComponent },
  //{ path: 'cart', component: CartComponent },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'seller-addProduct',
    component: SellerAddProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'seller/:id/edit',
    component: SellerEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'product/:id/productDetails',
    component:ProductDetailsComponent
  },
  {
    path: 'user-auth',
    component:UserComponent
  },
  {
    path:'addToCart',
    component:AddToCartComponent
  }

];
