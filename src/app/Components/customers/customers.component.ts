import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomersComponent {
  isMenuVisible: boolean = false;
  isFilterOpen: boolean = false;

  sampleData = [
    { Name: 'John Doe', Age: 30, City: 'New York' },
    { Name: 'Jane Smith', Age: 25, City: 'Los Angeles' },
    { Name: 'Bob Johnson', Age: 35, City: 'Chicago' },
    { Name: 'Alice Brown', Age: 28, City: 'San Francisco' },
  ];

  handleSidenav() {
    this.isMenuVisible = true
  }

  openFilter() {
    this.isFilterOpen = true;
  }
}
