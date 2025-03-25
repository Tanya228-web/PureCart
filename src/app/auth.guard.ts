import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AuthserviceService } from './services/authservice.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthserviceService);
  if(localStorage.getItem('result')){
    return true;
    
 }

  
  
  return authService.isSellerLoggedIn;
}
