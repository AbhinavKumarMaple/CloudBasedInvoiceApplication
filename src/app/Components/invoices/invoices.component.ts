import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceUpdateComponent } from '../invoice-update/invoice-update.component';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  loggedInAs: any = localStorage.getItem('loggedInAs');
  invoiceList: any;
  color: any;
  page: number = 1;
  limit: number = 10;
  selectedInvoice: any;
  tableHeaders: any = ['invoiceNumber', 'date', 'serviceDescription', 'netAmount', 'vatRate', 'vatAmount', 'totalGross', 'paymentMethod', 'bankAccount', 'paymentStatus', 'note'];
  tableHeaderForCustomer: any = ['invoiceNumber', 'date', 'customerName', 'serviceDescription', 'netAmount', 'vatRate', 'vatAmount', 'totalGross', 'paymentMethod', 'bankAccount', 'paymentStatus', 'note'];
  constructor(public dialog: MatDialog, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.getInvoiceList();
    this.color = localStorage.getItem('loggedInAs');
  }

  getInvoiceList() {
    if (this.loggedInAs == 'employee') {
      this.invoiceService.getAllByEmp().subscribe(response => {
        this.invoiceList = response.body;
      })
    }
    else if (this.loggedInAs == 'customer') {
      this.invoiceService.getAllByAccountant(this.page, this.limit).subscribe(response => {
        this.invoiceList = response.body;
        console.log(this.invoiceList)
      })
    }
  }

  openDialog(data?: any): void {
    const dialogRef = this.dialog.open(InvoiceUpdateComponent, { data: data });

    dialogRef.afterClosed().subscribe((result) => { });
  }

  isMenuVisible: boolean = false;

  handleSidenav() {
    this.isMenuVisible = true
  }

  rowSelected(event: any) {
    console.log(event)
    this.selectedInvoice = event;
  }
}
