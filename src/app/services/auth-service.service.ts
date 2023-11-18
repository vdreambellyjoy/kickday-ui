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
    if (localStorage.getItem('userData')) return true;
    else return false;
  }

  login(loginData: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/auth/login", loginData);
  }

  createCustomer(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/auth/createCustomer", data);
  }

  logOut() {
    this.route.navigateByUrl('/login');
  }
}
