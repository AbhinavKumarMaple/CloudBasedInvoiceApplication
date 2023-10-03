import { Component, OnInit } from '@angular/core';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  isMenuVisible: boolean = false;
  constructor(public dialog: MatDialog, private employeeService: EmployeeService) { }
  tableHeader: string[] = ['username', 'email', 'password', 'inviteLink'];
  employeeList: any;

  handleSidenav() {
    this.isMenuVisible = true
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {});

    dialogRef.afterClosed().subscribe((result) => {

    });

  }


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
