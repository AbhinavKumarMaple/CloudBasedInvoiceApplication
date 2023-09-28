import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management-sidenav',
  templateUrl: './management-sidenav.component.html',
  styleUrls: ['./management-sidenav.component.scss'],
})
export class ManagementSidenavComponent {
  constructor(private router: Router) {}
  activePage: string = 'profile';

  setActivePage(page: string) {
    this.activePage = page;
  }
}
