import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'https://invoice-backend-nodejs-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/customer/create`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/customer/update/${id}`, data);
  }

  addBank(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/customer/add-bank/6518473377e11b634a1b990a`, data); // need clear logic
  }

  editBankInfo(id: any, bankId: any, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/invoice/edit-bank/?_id=${id}&bankId=${bankId}`, data);
  }

  removeBankById(id: any, bankId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/customer/remove-bank/?_id=${id}&bankid=${bankId}`);
  }
}
