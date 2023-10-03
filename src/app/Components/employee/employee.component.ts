import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  isMenuVisible: boolean = false;
  tableHeader: string[] = ['username', 'email', 'password', 'inviteLink'];
  employeeList: any;

  handleSidenav() {
    this.isMenuVisible = true
  }

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployeeUnderAccountant();
  }

  getEmployeeUnderAccountant() {
    this.employeeService.employeeUnderAccountant().subscribe(response => {
      this.employeeList = response.body;
      console.log(this.employeeList)
    })
  }

}
