import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private route: Router) { }

  checkToken() {
    let user = localStorage.getItem('userData');
    if (user && (user != undefined || user != 'undefined')) return true;
    else return false;
  }

  login(loginData: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/auth/login", loginData);
  }

  createCustomer(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/auth/createCustomer", data);
  }

  logOut(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/auth/logOut", data);
  }

  localLogOut() {
    localStorage.clear();
    this.route.navigateByUrl('/customerListings');
  }

  getLogoImageById(fileId: any): Promise<any> {
    return this.http.post(environment.baseUrl + "/auth/getlogofile", fileId).toPromise();
  };

  checkUserToken(token: any){
    return this.http.post(environment.baseUrl + "/auth/checkUserToken", token)
  };
}
