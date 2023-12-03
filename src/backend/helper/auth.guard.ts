import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Constants } from '../../app/common/constants';
import { BaseApiService } from '../api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private baseApi: BaseApiService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url.indexOf(Constants.ADMIN) > -1){
      const loggedInUser = this.baseApi.getUserSession();
      if(this.authService.isLoggedIn()){
        // check if admin login the re route to admin page
        if(loggedInUser?.roles.indexOf(Constants.ADMIN_ROLE) > -1){
          return true;
        }else{
          this.router.navigate(['/sign-in']);
          return false;
        }
      }else{
        this.router.navigate(['/sign-in']);
        return false;
      }
    } 
    if (this.authService.isLoggedIn()) {      
      // check if customer login the re route to customer page
      const loggedInUser = this.baseApi.getUserSession();
      if(loggedInUser?.roles.indexOf(Constants.CUSTOMER) > -1){        
        return true;
      }
    }
    this.router.navigate(['/room']);
    return false;
  }
}
