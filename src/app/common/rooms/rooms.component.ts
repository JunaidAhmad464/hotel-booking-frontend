import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Room } from '../../Models/room.enum';
import { RoomService } from '../../../backend/services/room/room.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseApiService } from '../../../backend/api/base-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  @ViewChild('bookingModal') bookingModal!: TemplateRef<any>;
  rooms: Room[] = [];
  bookingForm: FormGroup;
  roomId: number;
  constructor(
    private roomService: RoomService, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private baseApi: BaseApiService,
    private router: Router
    ) { }

  ngOnInit() {  
    this.createBookingForm(); 
    this.loadRooms();
  }

  createBookingForm(){
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required]
    });
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  openRoomBookingModal(roomId: number){
    const userLoggedIn = this.baseApi.getUserSession();
    if(!userLoggedIn){
      this.router.navigate(['/sign-in']);
    }
    if(userLoggedIn){
      this.roomId = roomId;
      this.modalService.open(this.bookingModal);
    }
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  // request for room booking
  bookRoom(): void {
    const {checkIn, checkOut} = this.bookingForm.value;
    if(new Date(checkIn) > new Date(checkOut)){
      this.toaster.warning("Check In date must be less than check out date");
      return;
    }
    const bookinData = {
      checkIn: checkIn,
      checkOut: checkOut,
      roomId: this.roomId,
      customerId: this.baseApi.getUserSession().userId
    };
    this.roomService.bookRoom(bookinData).subscribe({
      next: (result: any) => {
        this.toaster.success(result?.message);
        this.closeModal();
        this.router.navigate(['/user']);
      },
      error: ({error}) => {
        this.toaster.error(error?.message);
      }
    })
  }

}
