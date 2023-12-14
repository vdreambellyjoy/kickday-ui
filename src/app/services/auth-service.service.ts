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
    if (localStorage.getItem('userData')) return true;
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
    this.route.navigateByUrl('/login');
  }

  getLogoImageById(fileId:any): Promise<any> {
    return this.http.post(environment.baseUrl + "/auth/getlogofile", fileId).toPromise();
  };
}
