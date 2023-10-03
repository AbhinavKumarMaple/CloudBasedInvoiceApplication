import { Component } from '@angular/core';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  isMenuVisible: boolean = false;
  constructor(public dialog: MatDialog){}
  handleSidenav() {
    this.isMenuVisible = true
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {});

    dialogRef.afterClosed().subscribe((result) => {

    });
    
  }

}
