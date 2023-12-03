import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtDecoderService } from '../../helper/jwt-decoder.service';
import { BaseApiService } from '../../api/base-api.service';
import { Constants, LoggedUser } from '../../../app/common/constants';
import { JWTTokenValidation } from '../../../app/common/enum';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public redirectionURL = '';
public signInError: string = '';
constructor(
  private http: HttpClient,
  private jwtDecoderService: JwtDecoderService,
  private baseApi: BaseApiService,
  private router: Router,
) { }

signIn(signInInfo: any) {
  return this.http
    .post<any>(this.baseApi.encodeURL(Constants.API_SIGN_IN), signInInfo)
    .subscribe({
      next: (user) => {
        const userDetails: LoggedUser = {
          userName: user.userName,
          email: user.email,
          fullName: user.fullName,
          userId: user.userId,
          roles: user.roles,
          roleIds: user.roleIds,
        };
        this.baseApi.saveUserSession(userDetails);
        this.jwtDecoderService.saveToken(user.accessToken);        
        if(userDetails.roles.indexOf(Constants.ADMIN) > -1){
          this.router.navigate(['/admin']);
        }else if(userDetails.roles.indexOf(Constants.CUSTOMER) > -1){
          this.router.navigate(['/user']);      
        }
        this.signInError = '';
      },
      error: ({ error }) => {
        this.signInError = '';
        this.signInError = error?.message;
      },
    });
}

signUp(data: any): Observable<any>{
  return this.http.post<any>(this.baseApi.encodeURL(Constants.API_SIGN_UP), data);
}

signOut(){
  const loggedIn = this.baseApi.getUserSession();
    if(loggedIn){
      this.baseApi.removeUserSession();
      this.baseApi.removeTokenFromStorage();
      this.router.navigate(['/room']);
    }
}

isLoggedIn() {
  const isValidToken: JWTTokenValidation =
    this.jwtDecoderService.isThereValidToken();
  if (
    isValidToken === JWTTokenValidation.Expired ||
    isValidToken === JWTTokenValidation.NotFound
  ) {
    return false;
  }
  return true;
}

}
