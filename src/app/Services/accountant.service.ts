import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountantService {

  private baseUrl = 'https://invoice-backend-nodejs-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/accountant/login`, data);
  }

  generateEmpInviteLink(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/accountant/invite`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/accountant/update`, data);
  }

  addBank(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/accountant/addbank`, data);
  }

}
