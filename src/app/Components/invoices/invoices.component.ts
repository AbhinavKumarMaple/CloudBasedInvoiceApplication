import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceUpdateComponent } from '../invoice-update/invoice-update.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent {
  sampleData = [
    { Name: 'John Doe', Age: 30, City: 'New York' },
    { Name: 'Jane Smith', Age: 25, City: 'Los Angeles' },
    { Name: 'Bob Johnson', Age: 35, City: 'Chicago' },
    { Name: 'Alice Brown', Age: 28, City: 'San Francisco' },
  ];
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(InvoiceUpdateComponent, {});

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
