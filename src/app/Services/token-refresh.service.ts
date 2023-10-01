import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {

  private isRefreshStarted = false;
  private refreshSubscription: Subscription | undefined;

  constructor(private http: HttpClient) { }

  startTokenRefresh() {
    if (!this.isRefreshStarted) {
      const refreshIntervalMillis = 40 * 60 * 1000;
      this.refreshSubscription = interval(refreshIntervalMillis).subscribe(() => this.refreshAccessToken());
      this.isRefreshStarted = true;
    }
  }

  stopTokenRefresh() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    this.isRefreshStarted = false;
  }

  private refreshAccessToken() {
    this.http.get(`https://invoice-backend-nodejs-production.up.railway.app/api/accountant/refresh-token`).subscribe();
  }

  resetRefreshStatus() {
    this.isRefreshStarted = false;
  }
}
