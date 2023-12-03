import { Injectable } from '@angular/core';
import { Constants, LoggedUser } from '../../app/common/constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWTTokenValidation } from '../../app/common/enum';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  constructor(private jwtHelperService: JwtHelperService) {}

  saveToken(token: string) {
    if (token) {
      localStorage.setItem(Constants.AUTH_TOKEN, token);
    }
  }
  removeCurrentToken() {
    localStorage.removeItem(Constants.AUTH_TOKEN);
  }

  isThereValidToken(): JWTTokenValidation {
    const token = localStorage.getItem(Constants.AUTH_TOKEN);
    if (token) {
      if (this.isTokenExpired(token)) {
        return JWTTokenValidation.Expired;
      } else {
        return JWTTokenValidation.Valid;
      }
    }
    return JWTTokenValidation.NotFound;
  }

  isTokenExpired(authToken: any) {
    return authToken == null || this.jwtHelperService.isTokenExpired(authToken);
  }

  getDecodedToken() {
    const token = localStorage.getItem(Constants.AUTH_TOKEN);
    const user = this.getTokenJson(token);
    return user;
  }

  getCurrentUserFromJWTToken() {
    const payloadMap = this.getDecodedToken();
    if (payloadMap) {
      return payloadMap;
    }
    return null;
  }

  editCurrentUserJWTToken(userInfo: LoggedUser) {
    const user = this.getDecodedToken();
    user.email = userInfo.email;
    user.userName = userInfo.userName;
    user.fullName = userInfo.fullName;
    localStorage.setItem(Constants.AUTH_TOKEN, JSON.stringify(user));
  }

  getTokenJson(token: any) {
    return this.jwtHelperService.decodeToken(token);
  }

}
