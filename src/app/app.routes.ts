import { Component } from '@angular/core';
import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';

import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';

import { SellerEditComponent } from './seller-edit/seller-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller', component: SellerComponent },
  //{ path: 'login', component: LoginComponent },
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
  path:'seller/:id/edit',
  component:SellerEditComponent,
  canActivate:[authGuard]
  }
];
