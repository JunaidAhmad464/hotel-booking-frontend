import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../api/base-api.service';
import { Constants } from '../../../app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

constructor(private http: HttpClient, private baseApi: BaseApiService) { }

getCustomerData(customerId: string): Observable<any>{
  return this.http.get<any>(this.baseApi.encodeURL(Constants.API_GET_CUSTOMER_DATA) + '/' + customerId);
}

}
