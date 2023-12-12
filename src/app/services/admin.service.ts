import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private route: Router) { }

  // admin page API START
  getUsersCount(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getUsersCount", data);
  }

  getOrdersCount(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getOrdersCount", data);
  }

  getAllUsersList(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getAllUsersList", data);
  }

  getUserBasedOnId(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/getUserBasedOnId", data);
  }

  activeDeActiveUser(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/activeDeActiveUser", data);
  }

  createMaker(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/createMaker", data);
  }

  updateKitchenImages(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/updateKitchenImages", data);
  }

  updateBankDetails(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/updateBankDetails", data);
  }
  // admin page API END



  // maker page API START
  getMakerDashboardData(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/maker/getMakerDashboardData", data);
  }

  addListing(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/maker/addListing", data);
  }

  getMakerListings(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/maker/getMakerListings", data);
  }

  getListingBasedOnId(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/maker/getListingBasedOnId", data);
  }

  deleteListing(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/maker/deleteListing", data);
  }
  // maker page API END


  // customer page API START
  updateCustomerDetails(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/updateCustomerDetails", data);
  }

  getAllListingsForCustomer(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/customer/getAllListingsForCustomer", data);
  }
  // customer page API END

}
