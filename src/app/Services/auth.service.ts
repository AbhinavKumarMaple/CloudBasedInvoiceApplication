import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenExpiration: number;

  constructor(private cookieService: CookieService) {
    this.token = this.loadToken();
    this.tokenExpiration = this.loadTokenExpiration();
  }

  loadToken(): any {
    console.log(this.cookieService.get('token'));
  }

  private loadTokenExpiration(): any {
    const expirationTimeString = this.cookieService.get('Expires');

    if (expirationTimeString) {
      const expirationTimestamp = new Date(expirationTimeString).getTime();
      return expirationTimestamp;
    }
  }
}
