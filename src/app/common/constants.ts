import { environment } from '../../environments/environment';


export class Constants {
  static AUTH_TOKEN = 'auth_token';
  static Refresh_TOKEN = 'refresh_token';
  static LOGGED_IN_USER = 'logged_in_user';
  static API_BASE_URL = environment.api_baseurl;
  static API_BASE_URL_GENERAL = Constants.API_BASE_URL;

  // PUBLIC NAVIGATION PATH
  public static AUTH = 'auth';
  public static SIGN_IN = 'sign-in';
  public static SIGN_OUT = 'sign-out';
  public static ADMIN = 'admin';
  public static CUSTOMER = 'customer';
  public static ADMIN_ROLE = 'admin';

  // Authenication related apis
  static API_SIGN_IN = Constants.API_BASE_URL_GENERAL + 'authentication/signIn';
  static API_SIGN_UP = Constants.API_BASE_URL_GENERAL + 'authentication/register';

  //get customer data api
  static API_GET_CUSTOMER_DATA = Constants.API_BASE_URL_GENERAL + 'customer/getCustomerBookingData';

  // book room api
  static API_BOOK_ROOM = Constants.API_BASE_URL_GENERAL + 'customer/bookRoom';

  //Admin api
  static API_GET_CUSTOMER_REQUESTS = Constants.API_BASE_URL_GENERAL + 'admin/getCustomerRequest';
  static API_CONFIRM_BOOKING = Constants.API_BASE_URL_GENERAL + 'admin/confirmBooking';

  // room api
  static API_GET_ROOMS = Constants.API_BASE_URL_GENERAL + 'admin/getRooms';
  static API_GET_ROOM_TYPES = Constants.API_BASE_URL_GENERAL + 'admin/getRoomTypes';
  static API_ADD_ROOMS = Constants.API_BASE_URL_GENERAL + 'admin/addRoom';
}

export interface LoggedUser {    
  userName: string;
  email: string;
  fullName: string;
  userId: string;
  roles: Array<string>;
  roleIds: Array<string>;
}