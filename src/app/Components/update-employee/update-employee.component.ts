import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent {
  name:any;
  contactNumber:any;
  username:any;
  email:any;
  password:any

  constructor(
    public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private employeeService: EmployeeService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addEmployee() {
    let payload = {
      name: this.name,
      contactNumber: this.contactNumber,
      username: this.username,
      email: this.email,
      password: this.password,
    };
    this.employeeService.addEmployee(payload).subscribe((response:any)=>{
      console.log(response)
    })
  }
}
