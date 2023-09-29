import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management-sidenav',
  templateUrl: './management-sidenav.component.html',
  styleUrls: ['./management-sidenav.component.scss'],
})
export class ManagementSidenavComponent {
  activeMenuItem: string = 'profile';
  constructor(private router: Router) {}
  ngOnInit() {
    // Retrieve the active menu item from browser storage (localStorage)
  const storedActiveMenuItem = localStorage.getItem('activeMenuItem');

  if (storedActiveMenuItem) {
    // If it's already set in localStorage, use it
    this.activeMenuItem = storedActiveMenuItem;
  } else {
    // If it's not set, initialize it to the default menu item ('profile' in this case)
    this.activeMenuItem = 'profile';
    localStorage.setItem('activeMenuItem', 'profile'); // Initialize localStorage
  }
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
}