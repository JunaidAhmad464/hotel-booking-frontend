import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from '../../api/base-api.service';
import { Observable } from 'rxjs';
import { Constants } from '../../../app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http: HttpClient, private baseApi: BaseApiService) { }

getCustomerRequest(): Observable<any>{
  return this.http.get<any>(this.baseApi.encodeURL(Constants.API_GET_CUSTOMER_REQUESTS));
}

confirmBooking(data: any): Observable<any>{
  return this.http.post<any>(this.baseApi.encodeURL(Constants.API_CONFIRM_BOOKING), data);
}

addRoom(data: any): Observable<any>{
  return this.http.post<any>(this.baseApi.encodeURL(Constants.API_ADD_ROOMS), data);
}

getRoomTypes(): Observable<any>{
  return this.http.get<any>(this.baseApi.encodeURL(Constants.API_GET_ROOM_TYPES));
}

}
