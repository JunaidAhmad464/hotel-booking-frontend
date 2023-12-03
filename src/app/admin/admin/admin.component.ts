import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'font-awesome/css/font-awesome.min.css';
import { BaseApiService } from '../../../backend/api/base-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../../backend/services/admin/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  @ViewChild('roomModal') roomModal! : TemplateRef<any>;
  @ViewChild('approveOrRejectModal') approveRejectModal! : TemplateRef<any>;
  columnDefs: any;
  customerRequestData: any;
  gridApi: any;
  roomForm: FormGroup;
  roomTypes: any[] = [];
  modalTitle: string = '';
  buttonName: string = '';
  requestData:any = {};

  constructor(
    private baseApi: BaseApiService, 
    private toaster: ToastrService,
    private modalService: NgbModal,
    private adminService: AdminService,
    private fb: FormBuilder
    ){
    // ag-grid column definition
    this.columnDefs = [
      {
        field: 'action',
        headerName: 'Action',
        cellRenderer: (params: any) => {
           if(params.data?.status == 'Pending'){
             return `<button type="button" ngbTooltip="Approve Request" style="height: 28px;width:40px; padding: 0px; margin: 0px" class="approve btn btn-success">
             <i class="approve fa fa-lg fa-check" aria-hidden="true"></i>
             </button>
   
             <button type="button" ngbTooltip="Reject Request" style="margin-left: 5px;height: 28px;width:40px; padding: 0px; margin: 0px; background-color: #D52A46;border-color: #D52A46" class="reject btn btn-success">
             <i class="reject fa fa-lg fa-times" aria-hidden="true"></i>
             </button>          
             `            
           }else{
            return `<button type="button" ngbTooltip="Approve Request" style="margin-left: 5px;height: 28px;width:40px; padding: 0px; margin: 0px;background-color: lightgrey;;border-color: lightgrey" class="btn btn-success">
             <i class="fa fa-lg fa-check" aria-hidden="true"></i>
             </button>
   
             <button type="button" ngbTooltip="Reject Request" style="height: 28px;width:40px; padding: 0px; margin: 0px; background-color: lightgrey;border-color: lightgrey" class="btn btn-success">
             <i class="fa fa-lg fa-times" aria-hidden="true"></i>
             </button>          
             `   
           }
        },
        resizable: true,
        sortable: true,
        width: 220
      },
      {
        field: 'roomName',
        headerName: 'Room',
        resizable: true,
        sortable: true,
        width: 220
      },
      {
        field: 'customerName',
        headerName: 'Customer',
        resizable: true,
        sortable: true,
        width: 180
      },
      {
        field: 'checkIn',
        headerName: 'Check In',
        resizable: true,
        sortable: true,
        width: 180
      },
      {
        field: 'checkOut',
        headerName: 'Check Out',
        resizable: true,
        sortable: true,
        width: 180
      },
      {
        field: 'bookingDate',
        headerName: 'Booking Date',
        resizable: true,
        sortable: true,
        width: 180
      },
      {
        field: 'status',
        headerName: 'Status',
        resizable: true,
        sortable: true,
        width: 130
      },
    ];
  }

  ngOnInit(): void {
    this.getRoomTypes();
    this.getCustomerRequests();
    this.createRoomSavingForm();
  }

  createRoomSavingForm(){
    this.roomForm = this.fb.group({
      name: ['', Validators.required],
      roomType: ['', Validators.required],
      description: [''],
      price: ['', Validators.required]
    })
  }

  getCustomerRequests(){
    this.adminService.getCustomerRequest().subscribe((requests) => {
      this.customerRequestData = requests?.data;
    })
  }

  confirmBooking(bookingData: any){
    const data = {
      customerId: bookingData?.customerId,
      roomId: bookingData?.roomId,
      bookingId: bookingData?.bookingId
    };
    this.adminService.confirmBooking(data).subscribe({
      next: (result: any) => {
        this.toaster.success(result?.message);
      },
      error: ({error}) => {
        this.toaster.error(error?.message);
      }
    })
  }

  openRoomModal(){
    this.roomForm.reset();
    this.modalService.open(this.roomModal);
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi?.setDomLayout('autoHeight');
    const element: HTMLElement = document.querySelector(
      '#myGrid'
    ) as HTMLElement;
    
    if (element !== null) {
      element.style.height = '';
    }
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  getRoomTypes(){
    this.adminService.getRoomTypes().subscribe((result) =>{
      this.roomTypes = result?.data;
    })
  }

  addRoom(){
    const roomData = {
      name: this.roomForm.value.name,
      description: this.roomForm.value.description,
      price: this.roomForm.value.price,
      roomType: this.roomForm.value.roomType
    }
    this.adminService.addRoom(roomData).subscribe({
      next: (result: any) => {
        this.closeModal();
        this.toaster.success(result?.message);
      },
      error: ({error}) => {
        this.toaster.error(error?.message);
      }
    })
  }

  // filter ag grid data
  onFilterChanged(event: any) {
    this.gridApi?.setQuickFilter(event.value);
  }

  approveOrRejectRequest(){
    this.adminService.confirmBooking(this.requestData).subscribe({
      next: (result: any) => {
        this.getCustomerRequests();
        this.closeModal();
        this.toaster.success(result?.message);
      },
      error: ({error}) => {
        this.toaster.error(error?.message);
      }
    })
  }

  openApproveRejectModal(){    
    this.modalService.open(this.approveRejectModal);
  }

  // call when clicked on ag grid cell
  onCellClicked(rowData: any){
    const columnName = rowData.colDef.field;
    const btnType = rowData.event.target.classList[0];
    if(columnName == 'action'){
      this.requestData.bookingId = rowData.data?.bookingId;
      this.requestData.customerId = rowData.data?.customerId;
      this.requestData.roomId = rowData.data?.roomId;
      if(btnType == 'approve'){
        this.requestData.status = 'Approved';
        this.modalTitle = 'Approve Request';
        this.buttonName = 'Approve';
        this.openApproveRejectModal();
      }
      else if(btnType == 'reject'){
        this.requestData.status = 'Rejected';
        this.modalTitle = 'Reject Request';
        this.buttonName = 'Reject';
        this.openApproveRejectModal();
      }
    }
  }
}
