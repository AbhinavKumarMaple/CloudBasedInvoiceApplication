import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'invoice-backend-nodejs-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  async login(data: any) {
    return this.http.post(`${this.baseUrl}/employee/login`, data);
  }

  async employeeInfo(data: any) {
    return this.http.get(`${this.baseUrl}/employee/myinfo`, data);
  }

  async update(data: any) {
    return this.http.put(`${this.baseUrl}/employee/update`, data);
  }

  async delete(data: any) {
    return this.http.delete(`${this.baseUrl}/employee/delete`, data);
  }
}
