import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountantService {

  private baseUrl = 'invoice-backend-nodejs-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  async login(data: any) {
    return this.http.post(`${this.baseUrl}/accountant/login`, data);
  }

  async generateEmpInviteLink(data: any) {
    return this.http.post(`${this.baseUrl}/accountant/invite`, data);
  }

  async update(data: any) {
    return this.http.put(`${this.baseUrl}/accountant/update`, data);
  }

  async addBank(data: any) {
    return this.http.post(`${this.baseUrl}/accountant/addbank`, data);
  }

}
