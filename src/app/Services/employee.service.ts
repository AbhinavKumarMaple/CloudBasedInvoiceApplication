import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl =
    'https://invoice-backend-nodejs-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/login`, data, { observe: 'response', withCredentials: true });
  }
  addEmployee(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/register`, data, {
      observe: 'response',
      withCredentials: true,
    });
  }
  employeeInfo(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/myinfo`, { observe: 'response', withCredentials: true });
  }

  employeeUnderAccountant(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/`, { observe: 'response', withCredentials: true })
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/employee/update/${id}`, data, { observe: 'response', withCredentials: true });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employee/delete/${id}`, { observe: 'response', withCredentials: true });
  }
}
