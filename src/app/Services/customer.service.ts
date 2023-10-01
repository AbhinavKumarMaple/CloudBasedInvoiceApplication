import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'invoice-backend-nodejs-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  async create(data: any) {
    return this.http.post(`${this.baseUrl}/customer/create`, data);
  }

  async update(id: any, data: any) {
    return this.http.put(`${this.baseUrl}/customer/update/${id}`, data);
  }

  async addBank(data: any) {
    return this.http.put(`${this.baseUrl}/customer/add-bank/6518473377e11b634a1b990a`, data); // need clear logic
  }

  async editBankInfo(id: any, bankId: any, data: any) {
    return this.http.post(`${this.baseUrl}/invoice/edit-bank/?_id=${id}&bankId=${bankId}`, data);
  }

  async removeBankById(id: any, bankId: any) {
    return this.http.delete(`${this.baseUrl}/customer/remove-bank/?_id=${id}&bankid=${bankId}`);
  }
}
