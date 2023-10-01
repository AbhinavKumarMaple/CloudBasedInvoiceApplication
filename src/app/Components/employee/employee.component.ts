import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  isMenuVisible: boolean = false;
  handleSidenav() {
    this.isMenuVisible = true
  }

}
