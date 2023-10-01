import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = 'invoice-backend-nodejs-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  async create(data: any) {
    return this.http.post(`${this.baseUrl}/invoice/create`, data);
  }

  async getAllByEmp() {
    return this.http.get(`${this.baseUrl}/invoice/allemployeeinvoice`);
  }

  async getAllByAccountant(page: any, limit: any) {
    return this.http.get(`${this.baseUrl}/invoice/allInvoice?page=${page}&limit=${limit}`);
  }

  async getEmpInvoiceById(id: any, page: any, limit: any) {
    return this.http.get(`${this.baseUrl}/invoice/employee/${id}?page=${page}&limit=${limit}`);
  }

  async getInvoiceById(id: any) {
    return this.http.get(`${this.baseUrl}/invoice/${id}`);
  }

  async updateById(id: any, data: any) {
    return this.http.put(`${this.baseUrl}/invoice/update/${id}`, data);
  }

  async delete(id: any) {
    return this.http.delete(`${this.baseUrl}invoice/${id}`);
  }
}
