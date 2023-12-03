import { Injectable } from '@angular/core';
import { Room } from '../../../app/Models/room.enum';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../api/base-api.service';
import { Constants } from '../../../app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
constructor(private http: HttpClient, private baseApi: BaseApiService) { }

getRooms(): Observable<Room[]>{
  return this.http.get<Room[]>(this.baseApi.encodeURL(Constants.API_GET_ROOMS));
}

bookRoom(data: any): Observable<any>{
  return this.http.post<any>(this.baseApi.encodeURL(Constants.API_BOOK_ROOM), data);
}
}
