import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private route: Router) { }

  checkToken() {
    if (localStorage.getItem('userData')) {
      // this.authenticationState.next(true);
      return true;
    } else {
      // this.authenticationState.next(false);
      return false;
    }
  }

  login(loginData: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/login", loginData);
  }

  saveProfile(data: any): Observable<any> {
    return  this.http.post(environment.baseUrl + "auth/saveProfile", data);
  }

  saveBankDetails(data: any): Observable<any> {
    return  this.http.post(environment.baseUrl + "auth/saveBankDetails", data);
  }

  getMakers(data: any): Observable<any> {
    return  this.http.post(environment.baseUrl + "auth/getMakers", data);
  }

  getMakerById(data: any): Observable<any> {
    return  this.http.post(environment.baseUrl + "auth/getMakerById", data);
  }
}
