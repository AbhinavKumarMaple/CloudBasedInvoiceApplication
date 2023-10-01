import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = 'https://invoice-backend-nodejs-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/invoice/create`, data);
  }

  getAllByEmp(): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoice/allemployeeinvoice`);
  }

  getAllByAccountant(page: any, limit: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoice/allInvoice?page=${page}&limit=${limit}`);
  }

  getEmpInvoiceById(id: any, page: any, limit: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoice/employee/${id}?page=${page}&limit=${limit}`);
  }

  getInvoiceById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoice/${id}`);
  }

  updateById(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/invoice/update/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}invoice/${id}`);
  }
}
