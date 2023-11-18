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

  updateBankDetails(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/admin/updateBankDetails", data);
  }
  
}
