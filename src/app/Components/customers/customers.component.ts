import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UpdateDataComponent } from '../update-data/update-data.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/Services/customer.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomersComponent implements OnInit {
  searchTerm: any;
  isMenuVisible: boolean = false;
  isFilterOpen: boolean = false;
  tableHeaders: string[] = [
    '_id',
    'name',
    'contactNumber',
    'address',
    'bankName',
    'accountName',
    'accountNumber',
    'sortNumber',
  ];
  customerList: any;
  selectedCustomer: any;

  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getCustomerList();
  }

  openDialog(data?: any): void {
    const dialogRef = this.dialog.open(UpdateDataComponent, {
      data: data,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  handleSidenav() {
    this.isMenuVisible = true;
  }

  openFilter() {
    this.isFilterOpen = true;
  }

  getCustomerList() {
    this.customerService.getAllCustomer().subscribe((response) => {
      this.customerList = response.body.customers;
      this.customerList = this.customerList.map((c: any) => {
        return {
          _id: c._id,
          name: c.name,
          contactNumber: c.contactNumber,
          address:
            c.address.address +
            ',' +
            c.address.streetLane +
            ',' +
            c.address.landmark +
            ',' +
            c.address.postalCode,
          bankName: c.banks[0].bankName,
          accountName: c.banks[0].accountName,
          accountNumber: c.banks[0].accountNumber,
          sortNumber: c.banks[0].sortCode,
        };
      });
      if (this.searchTerm) {
        // Filter the customerList based on the searchTerm
        this.customerList = this.customerList.filter((customer: any) =>
          customer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      console.log(this.customerList);
    });
  }

  rowSelected(event: any) {
    this.selectedCustomer = event;
  }
}
