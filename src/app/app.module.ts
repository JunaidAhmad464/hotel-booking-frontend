import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerComponent } from './customer/customer/customer.component';
import { AdminComponent } from './admin/admin/admin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from '../backend/helper/interceptor.service';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { FooterComponent } from './common/footer/footer.component';
import { RoomsComponent } from './common/rooms/rooms.component';
import { RoomService } from '../backend/services/room/room.service';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { Constants } from './common/constants';
import { environment } from '../environments/environment';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuard } from '../backend/helper/auth.guard';
import { AuthService } from '../backend/services/auth/auth.service';
import { BaseApiService } from '../backend/api/base-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { AdminService } from '../backend/services/admin/admin.service';

export function getToken() {
  const token = localStorage.getItem(Constants.AUTH_TOKEN);
  if (token) {
    return token;
  }
  return null;
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: getToken,
    allowedDomains: environment.white_listed_Domains,
    headerName: 'Authorization',
    authScheme: 'Bearer ',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AdminComponent,
    NavBarComponent,
    FooterComponent,
    RoomsComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule.forRoot(JWT_Module_Options),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    AgGridModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    RoomService,
    AuthGuard,
    AuthService,
    BaseApiService,
    ToastrService,
    NgbActiveModal,
    NgbModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
