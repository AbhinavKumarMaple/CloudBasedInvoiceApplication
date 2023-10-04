import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UpdateDataComponent } from '../update-data/update-data.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/Services/customer.service';
import { saveAs } from 'file-saver';
import { CsvServiceService } from 'src/app/Services/csv-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomersComponent implements OnInit {
  isMenuVisible: boolean = false;
  isFilterOpen: boolean = false;
  tableHeaders: string[] = ['_id', 'name', 'contactNumber', 'address', 'bankName', 'accountName', 'accountNumber', 'sortNumber']
  customerList: any;
  selectedCustomer: any;
  dataForCSV: any;

  constructor(public dialog: MatDialog, private customerService: CustomerService, private csvService: CsvServiceService) {

  }

  ngOnInit(): void {
    this.getCustomerList();
  }

  openDialog(data?: any): void {
    const dialogRef = this.dialog.open(UpdateDataComponent, { data: data });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  handleSidenav() {
    this.isMenuVisible = true
  }

  openFilter() {
    this.isFilterOpen = true;
  }

  getCustomerList() {

    this.customerService.getAllCustomer().subscribe(response => {
      this.customerList = response.body.customers;
      this.dataForCSV = this.customerList.map((c: any) => {
        return {
          _id: c._id,
          name: c.name,
          contactNumber: c.contactNumber,
          address: c.address.address + " " + c.address.streetLane + " " + c.address.landmark + " " + c.address.postalCode,
          bankName: c.banks[0].bankName,
          accountName: c.banks[0].accountName,
          accountNumber: c.banks[0].accountNumber,
          sortNumber: c.banks[0].sortCode
        }
      })
      this.customerList = this.customerList.map((c: any) => {
        return {
          _id: c._id,
          name: c.name,
          contactNumber: c.contactNumber,
          address: c.address.address + "," + c.address.streetLane + "," + c.address.landmark + "," + c.address.postalCode,
          bankName: c.banks[0].bankName,
          accountName: c.banks[0].accountName,
          accountNumber: c.banks[0].accountNumber,
          sortNumber: c.banks[0].sortCode
        }
      })
    })
  }

  rowSelected(event: any) {
    this.selectedCustomer = event;
  }

  convertToCSV() {
    const columnsToDownload = this.tableHeaders;
    const csvContent = this.csvService.convertToCSV(this.dataForCSV, columnsToDownload);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'customers.csv');
  }
}
