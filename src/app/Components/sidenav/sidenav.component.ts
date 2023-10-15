import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenRefreshService } from 'src/app/Services/token-refresh.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  activeMenuItem: string = 'profile';
  color: any = localStorage.getItem('loggedinAs')
  loggedInAs: any = localStorage.getItem('loggedInAs')
  @Output() isMenuVisible = new EventEmitter<any>();

  constructor(private router: Router, private tokenRefreshService: TokenRefreshService) { }

  ngOnInit(): void {
    if (this.loggedInAs == 'employee') {
      this.tokenRefreshService.refreshAccessTokenEmployee();
    }
    else if (this.loggedInAs == 'customer') {
      this.tokenRefreshService.refreshAccessTokenCustomer();
    }
  }
  closeMenu() {
    this.isMenuVisible.emit(false);
  }
  Profile() {
    this.activeMenuItem = 'profile';
    localStorage.setItem('activeMenuItem', 'profile');
    this.router.navigateByUrl('/home/profile');
  }
  Employees() {
    this.activeMenuItem = 'employees';
    localStorage.setItem('activeMenuItem', 'employees');
    this.router.navigateByUrl('/home/employees');
  }
  Customers() {
    this.activeMenuItem = 'customers';
    localStorage.setItem('activeMenuItem', 'customers');
    this.router.navigateByUrl('/home/customers');
  }
  Invoices() {
    this.activeMenuItem = 'invoices';
    localStorage.setItem('activeMenuItem', 'invoices');
    this.router.navigateByUrl('/home/invoices');
  }
  generatedInvoice() {
    this.activeMenuItem = 'generated-invoices';
    localStorage.setItem('activeMenuItem', 'generatedInvoice');
    this.router.navigateByUrl('/home/generated-invoices');
  }

  logout() {
    localStorage.clear();
    this.tokenRefreshService.stopTokenRefresh();
    this.router.navigate(['/login']);
  }


}
