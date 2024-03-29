import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountantService } from 'src/app/Services/accountant.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {
  isEditingbankDetails: boolean = false;
  showbankdetails = false;
  logo: any[] = [];
  logourl: any[] = [];
  businessName: any = '';
  vatNumber: any = '';
  name: any = '';
  crnNumber: any = '';
  landmark: any = '';
  postalCode: any = '';
  buildingNameNumber: any = '';
  streetName: any = '';
  bankName: any = '';
  sortCode: any = '';
  accountName: any = '';
  accountNumber: any = '';
  contactNumber: any = '';
  username: any = '';
  email: any;
  password: any;
  editableData: any;
  isEdit: boolean = false;
  addbankaccount = false;
  bankList: any[] = [];
  building: any;
  street: any;

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: any;
  logoUrl: any = '../../../assets/logo.jpg';
  accountantId: any = localStorage.getItem('accId');

  constructor(
    private accountantService: AccountantService,
    public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private employeeService: EmployeeService,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.isEdit = true;
      this.editableData = data;
    }
  }

  ngOnInit(): void {
    const file = {
      lastModifiedDate: Date.now(),
      name: 'logo.jpg',
      size: 134063,
      type: 'Image/jpeg',
      webkitRelativePath: '',
    };
    this.selectedFile = new File([], file.name, file);
    this.editableData.banks.forEach((bank: any) => {
      this.bankList.push({
        bankName: bank.bankName,
        accountName: bank.accountName,
        accountNumber: bank.accountNumber,
        sortCode: bank.sortCode,
      });
    });

    this.getClientById();
  }
  getClientById() {
    let payload = {
      _id: this.editableData._id,
    };
    this.employeeService
      .employeeInfoById(payload)
      .subscribe((response: any) => {
        console.log(response);
        this.businessName = response.body.businessName;
        (this.contactNumber = response.body.contactNumber),
          (this.vatNumber = response.body.vatNumber),
          (this.crnNumber = response.body.crnNumber),
          (this.buildingNameNumber = response.body.address.buildingNameNumber),
          (this.landmark = response.body.address2);
        this.postalCode = response.body.address.postalCode;
        this.streetName = response.body.address.streetName;
        this.username = response.body.username;
        this.email = response.body.email;
        this.logo = response.body.logo;
        this.convertDataToUrl(this.logo);
      });
  }
  cancelBankEdit() {
    this.isEditingbankDetails = false;
    this.showbankdetails = false;
  }
  editBankDetails() {
    this.showbankdetails = !this.showbankdetails;
    this.isEditingbankDetails = true;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  cancelDialog(): void {
    this.dialogRef.close();
  }
  // addBankAccount() {
  //   let payload = {
  //     bankName: this.bankName,
  //     accountName: this.accountName,
  //     accountNumber: this.accountNumber,
  //     sortCode: this.sortCode,
  //   };
  //   this.accountantService.addBank(payload).subscribe((response) => {
  //     console.log(response);
  //     window.location.reload();
  //   });
  // }

  addClient() {
    if (!this.username || !this.businessName) {
      // Show an error message or prevent form submission
      alert('Please fill out all required fields.');
      return;
    }
    if (
      this.bankName != '' &&
      this.accountName != '' &&
      this.accountNumber != '' &&
      this.sortCode != ''
    ) {
      this.bankList.push({
        bankName: this.bankName,
        accountName: this.accountName,
        accountNumber: this.accountNumber,
        sortCode: this.sortCode,
      });
    }
    let data = {
      businessName: this.businessName,
      contactNumber: this.contactNumber,
      vatNumber: this.vatNumber ? this.vatNumber : '',
      crnNumber: this.crnNumber ? this.crnNumber : '',
      address: {
        buildingNameNumber: this.buildingNameNumber,
        streetName: this.streetName,
        postalCode: this.postalCode,
      },
      username: this.username,
      email: this.email,
      password: this.password,
      banks: this.bankList,
      address2: this.landmark,
    };

    if (this.isEdit) {
      this.employeeService
        .update(this.editableData._id, data)
        .subscribe((res) => {
          alert('Client updated successfully...');
          this.cancelDialog();
          window.location.reload();
        });
    } else {
      const formData = new FormData();
      formData.append('businessName', this.businessName);
      formData.append('accountantId', this.accountantId);
      formData.append('contactNumber', this.contactNumber);
      formData.append('vatNumber', this.vatNumber);
      formData.append('crnNumber', this.crnNumber);
      formData.append('address[streetName]', this.streetName);
      formData.append('address2', this.landmark);
      formData.append('address[buildingNameNumber]', this.buildingNameNumber);
      formData.append('address[postalCode]', this.postalCode);
      formData.append('username', this.username);
      formData.append('email', this.email);
      formData.append('password', this.password);
      this.bankList.forEach((bank: any, index: any) => {
        formData.append(`banks[${index}][bankName]`, bank.bankName);
        formData.append(`banks[${index}][accountName]`, bank.accountName);
        formData.append(`banks[${index}][accountNumber]`, bank.accountNumber);
        formData.append(`banks[${index}][sortCode]`, bank.sortCode);
      });
      formData.append('image', this.selectedFile);
      this.employeeService.addEmployee(formData).subscribe(
        (response) => {
          console.log(response);
          alert('Client added successfully...');
          this.cancelDialog();
          window.location.reload();
        },
        (error) => {
          alert(error.error.message);
        }
      );
    }
  }

  OpenBankAccountForm() {
    this.addbankaccount = true;
  }
  cancelAddingForm() {
    this.addbankaccount = false;
  }

  addBank() {
    this.bankList.push({
      bankName: this.bankName,
      accountName: this.accountName,
      accountNumber: this.accountNumber,
      sortCode: this.sortCode,
    });
    this.bankName = '';
    this.accountName = '';
    this.accountName = '';
    this.accountNumber = '';
  }

  removeBank(bankData: any) {
    this.bankList = this.bankList.filter(
      (bank: any) => bank.bankName !== bankData.bankName
    );
  }

  openFileExplorer(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.logoUrl = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(this.selectedFile)
    );
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('employeeId', this.editableData?._id);
    this.employeeService.addImage(formData).subscribe();
  }
  convertDataToUrl(data: any): void {
    data.forEach((image: any) => {
      if (image.data) {
        this.logourl.push(`data:image/jpeg;base64,${image.data}`);
      } else {
        this.logourl.push(this.logoUrl);
      }
    });
  }
}
