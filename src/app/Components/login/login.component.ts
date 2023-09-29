import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private route: Router) { }
  password: any;
  show = false;
  // customer
  customerBackgroundColor: string = ''; // Initialize as empty
  customerColor: string = ''; // Initialize as empty
  customerBorderRadius: number = 0; // Initialize border-radius to 0
  customerPadding: number = 10; // Initialize padding to 0
  customerShadow: string = '';
  // business
  businessBackgroundColor: string = ''; // Initialize as empty
  businessColor: string = ''; // Initialize as empty
  businessBorderRadius: number = 0; // Initialize border-radius to 0
  businessPadding: number = 10; // Initialize padding to 0
  businessShadow: string = '';
  borderColor: string = '';

  setCustomerBackground() {
    this.customerBackgroundColor = '#0078F1'; // Change background color to blue
    this.businessBackgroundColor = ''; // Reset the other background color
    this.customerColor = 'white';
    this.businessColor = '';
    this.customerBorderRadius = 20; // Apply border radius of 20px
    this.customerPadding = 10; // Apply padding of 5px
    this.businessBorderRadius = 20; // Apply border radius of 20px
    this.customerShadow = 'rgba(0, 0, 0, 0.5) 0px 2px 8px';
    this.businessShadow = '';
    this.borderColor = '#0078F1'
  }

  setBusinessBackground() {
    this.businessBackgroundColor = '#5800A0'; // Change background color to red
    this.customerBackgroundColor = ''; // Reset the other background color
    this.customerColor = '';
    this.businessColor = 'white';
    this.businessBorderRadius = 20; // Apply border radius of 20px
    this.businessPadding = 10; // Apply padding of 5px
    this.customerBorderRadius = 0; // Reset border radius
    this.businessShadow = 'rgba(0, 0, 0, 0.5) 0px 2px 8px';
    this.customerShadow = '';
    this.borderColor = '#5800A0';
  }

  ngOnInit() {
    this.password = 'password';
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  onSubmit() {
    this.route.navigateByUrl('/home/profile')
  }
}