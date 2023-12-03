import { Injectable } from '@angular/core';
import { Constants, LoggedUser } from '../../app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

constructor() { }
public getHeaders(): any {
  const token = this.getTokenFromStorage();
  return {
    Authorization: `Bearer ${token}`
  };
}

public encodeURL(url: string): string {
  return url.replace(' ', '%20');
}

public getTokenFromStorage(): string | null {
  return localStorage.getItem(Constants.AUTH_TOKEN);
}

public removeTokenFromStorage() {
  localStorage.removeItem(Constants.AUTH_TOKEN);
}

public saveUserSession(user: LoggedUser): void {
  localStorage.setItem(Constants.LOGGED_IN_USER, JSON.stringify(user));
}
public removeUserSession() {
  localStorage.removeItem(Constants.LOGGED_IN_USER);
}

public getUserSession(): LoggedUser | null {
  const user = localStorage.getItem(Constants.LOGGED_IN_USER);
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

}
