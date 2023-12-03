import { Component, OnInit } from '@angular/core';
import { BaseApiService } from '../../../backend/api/base-api.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../backend/services/auth/auth.service';
import { filter } from 'rxjs';
import { Constants } from '../constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  anyLoggedIn: boolean = false;
  isCustomerLogin: boolean = false;
  isAdminLoggedIn: boolean = false;
  constructor(private baseApi: BaseApiService, private authService: AuthService, private router: Router) { }

  ngOnInit() {     
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Handle navigation end event, refresh your component here
      this.checkUserLoggedIn();
    });
  }

  checkUserLoggedIn(){    
    const loggenInUser = this.baseApi.getUserSession();
    if(loggenInUser){
      if(loggenInUser.roles.indexOf(Constants.CUSTOMER) > -1){
        this.isCustomerLogin = true;
        this.isAdminLoggedIn = false;
      }
      if(loggenInUser.roles.indexOf(Constants.ADMIN) > -1){
        this.isCustomerLogin = false;
        this.isAdminLoggedIn = true;
      }
      this.anyLoggedIn = true;
    }else{
      this.anyLoggedIn = false;
      this.isAdminLoggedIn = false;
      this.isCustomerLogin = false;
    }
  }

  openBookingPage(){
    const loggenInUser = this.baseApi.getUserSession();
    if(loggenInUser && loggenInUser.roles.indexOf(Constants.CUSTOMER) > -1){
      this.router.navigate(['/user']);
    }else{
      this.router.navigate(['/sign-in']);
    }
  }

  signOut(){
    this.anyLoggedIn = false;
    this.isAdminLoggedIn = false;
    this.isCustomerLogin = false;
    this.authService.signOut();
  }
}
