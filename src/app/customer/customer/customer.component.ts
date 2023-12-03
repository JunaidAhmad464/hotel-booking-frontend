import { Component, OnInit } from '@angular/core';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { BaseApiService } from '../../../backend/api/base-api.service';
import { CustomerService } from '../../../backend/services/customer/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customerColumns: any;
  customerBooking: any = [];
  loggedInUser: any;
  gridApi: any;
  constructor(private baseApi: BaseApiService, private customerService: CustomerService, private toaster: ToastrService){
    // ag-grid column definition
    this.customerColumns = [
      {
        field: 'room',
        headerName: 'Room',
        resizable: true,
        sortable: true,
        width: 250
      },
      {
        field: 'checkIn',
        headerName: 'Check In',
        resizable: true,
        sortable: true,
        width: 250
      },
      {
        field: 'checkOut',
        headerName: 'Check Out',
        resizable: true,
        sortable: true,
        width: 250
      },
      {
        field: 'bookingDate',
        headerName: 'Booking Date',
        resizable: true,
        sortable: true,
        width: 250
      },
      {
        field: 'status',
        headerName: 'Status',
        resizable: true,
        sortable: true,
        width: 290
      },
    ];
  }
  ngOnInit(): void {
    this.loggedInUser = this.baseApi.getUserSession();
    this.getCustomerData();
  }

  getCustomerData(){
    const userId = this.loggedInUser.userId;
    this.customerService.getCustomerData(userId).subscribe({
      next: (result: any) => {
        this.customerBooking = result?.data;
      },
      error: ({error}) => {
        this.toaster.error("No Data Found");
      }
    })
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
// filter ag grid data
  onFilterChanged(event: any) {
    this.gridApi?.setQuickFilter(event.value);
  }
}
