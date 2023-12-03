import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../api/base-api.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(public baseApi: BaseApiService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add custom logic here, e.g., headers, logging, etc.
    
    //add a custom header to each outgoing request
    const tokenizedReq = request.clone({
      setHeaders: this.baseApi.getHeaders(),
    });

    // Pass the modified request to the next handler in the chain
    return next.handle(tokenizedReq);
  }
}
