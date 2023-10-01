import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss'],
})
export class ProfileManagementComponent {
  isEditingbusiness: boolean = false;
  isEditingaddress: boolean = false;
  isMenuVisible: boolean = false;
  AccountInfo: any = [
    {
      username: 'Roshan Dsouza',
      email: 'roshan123@gmail.com',
      password: 'Roshan@123',
    },
  ];
  BusinessDetails: any = [
    {
      businessName: 'ABCD PVT. LTD.',
      contactNumber: '1234567890',
      vatNumber: '1234 5678 9101',
      CRNnumber: '1234 5678 9101',
    },
  ];
  AddressDetails: any = [
    {
      buildingName: 'G-64, ALPS TOWER, 2ND FLOOR',
      street: 'SIMPSONS STREET',
      landMark: 'ABCD PARK',
      postalCode: '400 056',
    },
  ];
  BankDetails: any = [
    {
      BankName: 'HDFC Bank',
      accountName: 'ABC Savings A/C',
      accountNumber: 'ABC Savings A/C',
      sortcode: '1234 5678 9101'
    },
  ];
  editForBusiness() {
    this.isEditingbusiness = true;
  }
  editForAddredd() {
    this.isEditingaddress = true;
  }

  handleSidenav() {
    this.isMenuVisible = true
  }
}
