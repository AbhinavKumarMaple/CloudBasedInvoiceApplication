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

  constructor(public dialog: MatDialog, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.getInvoiceList();
    console.log(this.invoiceList);
  }

  getInvoiceList() {
    if (this.loggedInAs == 'employee') {
      this.invoiceService.getAllByEmp().subscribe(response => {
        this.invoiceList = response;
        console.log(this.invoiceList)
      })
    }
    else if (this.loggedInAs == 'customer') {
      this.invoiceService.getAllByAccountant(2, 2).subscribe(response => {
        this.invoiceList = response;
      })
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InvoiceUpdateComponent, {});

    dialogRef.afterClosed().subscribe((result) => { });
  }

  isMenuVisible: boolean = false;

  handleSidenav() {
    this.isMenuVisible = true
  }
}
