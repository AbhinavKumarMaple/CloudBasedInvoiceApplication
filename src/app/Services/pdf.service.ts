import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { AccountantService } from './accountant.service';
import * as moment from 'moment';
import { CustomerService } from './customer.service';
import { EmployeeService } from './employee.service';
import { InvoiceService } from './invoice.service';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  logoUrl: any[] = [];
  employeeLogo: any;
  activeMenuItem: any = localStorage.getItem('activeMenuItem');
  isImage: boolean = true;

  constructor(
    private accountantService: AccountantService,
    private employeeService: EmployeeService,
    private invoiceService: InvoiceService,
    private customerService: CustomerService
  ) {
    this.activeMenuItem = localStorage.getItem('activeMenuItem');
  }

  generatePDF(
    data: any,
    accountantData: any,
    bankData: any,
    clientData?: any,
    image?: any,
    customerData?: any
  ) {
    const currentDate = new Date();
    const pdf = new jsPDF('p', 'pt', 'A4');
    var logo = '../../assets/logo.jpg';

    let x = 20;
    let y = 40;
    const imageWidth = 100;
    const imageHeight = 100;
    let maxWidth = 100;

    pdf.setFontSize(16);
    if (image != null && this.isImage) {
      pdf.addImage(image, x, y, imageWidth, imageHeight);
    } else if (!this.isImage) {
      pdf.addImage(logo, x, y, imageWidth, imageHeight);
    }
    x += 550;

    pdf.setFontSize(12);
    pdf.setFont('Helvetica', 'bold');
    pdf.text(accountantData.businessName, x, y, { align: 'right' });
    y += 20;
    pdf.setFontSize(8);
    pdf.setFont('Helvetica', 'bold');
    pdf.text(accountantData.name ? accountantData.name : '', x, y, {
      align: 'right',
    });
    y += 20;
    pdf.text(accountantData.address.buildingNameNumber, x, y, {
      align: 'right',
    });
    y += 20;
    pdf.text(accountantData.address.streetName, x, y, { align: 'right' });
    y += 20;
    if (accountantData.address2 != null) {
      pdf.text(accountantData?.address2, x, y, { align: 'right' });
      y += 20;
    }
    pdf.text(accountantData.address.postalCode.toString(), x, y, {
      align: 'right',
    });
    y += 20;
    pdf.text(accountantData.contactNumber.toString(), x, y, { align: 'right' });
    y += 20;
    pdf.text('CRN:' + accountantData.crnNumber.toString(), x, y, {
      align: 'right',
    });
    y += 20;
    pdf.text('VAT Reg. No:' + accountantData.vatNumber.toString(), x, y, {
      align: 'right',
    });
    y += 30;

    x = 20;
    pdf.setFontSize(10);
    pdf.setFont('Helvetica', 'bold');
    pdf.text(`Invoice To ${clientData.username}`, x, y);
    // console.log('clientData', clientData, 'customerData', customerData);
    y += 20;
    pdf.setFontSize(8);
    pdf.setFont('Helvetica', 'normal');
    const formattedDate = moment(data.date).format('D MMMM YYYY');
    pdf.text('Invoice Date:   ' + currentDate.toLocaleString(), x, y);
    y += 20;
    pdf.text('Due Date:   ' + formattedDate, x, y);
    y -= 40;
    x += 550;
    pdf.setFontSize(10);
    pdf.setFont('Helvetica', 'bold');
    if (clientData?.businessName != null) {
      pdf.text(clientData.businessName, x, y, { align: 'right' });
    } else {
      pdf.text(customerData.name, x, y, { align: 'right' });
    }
    y += 20;
    pdf.setFontSize(8);
    pdf.setFont('Helvetica', 'normal');
    if (clientData?.address != null) {
      pdf.text(clientData.address?.buildingNameNumber, x, y, {
        align: 'right',
      });
    } else {
      pdf.text(customerData.address?.address, x, y, { align: 'right' });
    }
    y += 20;
    if (clientData?.address != null) {
      pdf.text(clientData.address?.streetName, x, y, { align: 'right' });
    } else {
      pdf.text(customerData.address?.streetLane, x, y, { align: 'right' });
    }
    y += 20;
    if (clientData?.address != null) {
      pdf.text(clientData.address?.postalCode, x, y, { align: 'right' });
    } else {
      pdf.text(customerData.address?.postalCode, x, y, { align: 'right' });
    }
    y += 20;
    if (clientData?.address2 != null) {
      pdf.text(clientData?.address2, x, y, { align: 'right' });
    } else if (customerData?.address2 != null) {
      pdf.text(customerData?.address2, x, y, { align: 'right' });
    }
    y += 30;
    x = 20;
    pdf.setFontSize(10);
    pdf.setFont('Helvetica', 'bold');
    pdf.text('Description', x, y);
    x += 120;
    pdf.text('Net Amount €', x, y);
    x += 120;
    pdf.text('VAT Rate', x, y);
    x += 120;
    pdf.text('VAT Amount €', x, y);
    x += 120;
    pdf.text('Gross Amount €', x, y);
    x = 20;
    y += 20;
    let z = y;

    pdf.setFontSize(8);
    pdf.setFont('Helvetica', 'normal');

    // Calculate total height of service descriptions
    const serviceDescriptionsHeight = data.serviceDescription.length * 20; // Assuming each description is 20 units in height

    // Add service descriptions
    data.serviceDescription.forEach((service: any, index: number) => {
      const description = service.description;
      const netAmount = service.netAmount;
      const vatRate = service.vatRate;
      const vatAmount = service.vatAmount;
      const totalGross = service.totalGross;

      // Display service description details
      pdf.text(description, x, y);
      x += 120;
      pdf.text(netAmount.toString(), x, y);
      x += 120;
      pdf.text(vatRate.toString() + '%', x, y);
      x += 120;
      pdf.text(vatAmount.toString(), x, y);
      x += 120;
      pdf.text(totalGross.toString(), x, y);
      x = 20;
      y += 20;
    });

    // Calculate total height of remaining content
    const remainingContentHeight = 0; // Adjust this value according to your actual remaining content height
    console.log('pdf height: ', pdf.internal.pageSize.height);
    // Check if remaining content fits on current page
    if (
      serviceDescriptionsHeight + remainingContentHeight >
      pdf.internal.pageSize.height - y
    ) {
      // Add new page
      pdf.addPage();
      y = 40;
    }

    // Move x to align with the right margin of the page
    x = pdf.internal.pageSize.width - 20;
    y += 20;
    // Display text aligned to the right side below all the service descriptions
    pdf.text('Net Amount:    ' + data.netAmount.toString(), x, y, {
      align: 'right',
    });
    y += 20;
    pdf.text('VAT Amount:    ' + data.vatAmount.toString(), x, y, {
      align: 'right',
    });
    y += 20;
    pdf.text('Gross Amount:    ' + data.totalGross.toString(), x, y, {
      align: 'right',
    });
    y += 20;
    pdf.text('Due Date:    ' + formattedDate, x, y, { align: 'right' });

    y += 20;
    x = 20;
    pdf.setFontSize(10);
    pdf.setFont('Helvetica', 'bold');
    pdf.text('Bank Details:', x, y);
    y += 20;
    pdf.setFontSize(8);
    pdf.setFont('Helvetica', 'normal');
    pdf.text('Bank Name:   ' + bankData.bankName, x, y);
    x += 150;
    pdf.text('A/C Name:    ' + bankData.accountName, x, y);
    y += 20;
    x = 20;
    pdf.text('Account No.:    ' + bankData.accountNumber, x, y);
    x += 150;
    pdf.text('Sort Code:    ' + bankData.sortCode, x, y);
    y += 60;
    x = 20;
    pdf.text('Note:    ' + data.note, x, y);

    const fileName = 'Invoice.pdf';
    pdf.save(fileName);
  }

  getAccountantData(data: any, bankData: any, clientData: any, image: any) {
    console.log(image);
    this.accountantService.getAccountantInfo().subscribe((response) => {
      const formData = new FormData();
      const currentDate = new Date();

      formData.append('invoiceNumber', data.invoiceNumber);
      formData.append('createdFor', clientData._id);
      formData.append(
        'serviceDescription',
        JSON.stringify(data.serviceDescription)
      ); // Parse serviceDescription as JSON
      formData.append('date', currentDate.toLocaleString());
      formData.append('dueDate', data.date);
      formData.append('customerName', data.customerName);
      formData.append('netAmount', data.netAmount);
      formData.append('vatRate', data.vatRate);
      formData.append('vatAmount', data.vatAmount);
      formData.append('totalGross', data.totalGross);
      formData.append('bankAccount', data.bankAccount);
      formData.append('note', data.note);
      formData.append(`banks[0][bankName]`, bankData.bankName);
      formData.append(`banks[0][accountName]`, bankData.accountName);
      formData.append(`banks[0][accountNumber]`, bankData.accountNumber);
      formData.append(`banks[0][sortCode]`, bankData.sortCode);
      formData.append(
        'customerAddress',
        JSON.stringify({
          street: clientData.buildingNameNumber,
          city: clientData.landmark,
          state: clientData.streetName,
          postalCode: clientData.postalCode,
        })
      );
      formData.append(
        'accountantAddress',
        JSON.stringify({
          street: response.body.buildingNameNumber,
          city: response.body.landmark,
          state: response.body.streetName,
          postalCode: response.body.postalCode,
        })
      );
      formData.append('vatRegNo', response.body.vatNumber);
      formData.append('crn', response.body.crnNumber);
      formData.append('image', image);
      if (this.activeMenuItem != 'generatedInvoice') {
        this.invoiceService.generateInvoice(formData).subscribe((res) => {
          alert('Invoice generated successfully...');
        });
      }
      this.generatePDF(data, response.body, bankData, clientData, image);
    });
  }

  getEmployeeData(data: any, bankData: any) {
    console.log(data);
    this.employeeService.employeeInfo().subscribe((response) => {
      let responseBody = response.body;
      this.convertDataToUrl(response.body.logo);
      const formData = new FormData();
      formData.append('invoiceNumber', data.invoiceNumber);
      formData.append('createdFor', data.createdFor);
      formData.append('date', data.date);
      formData.append('dueDate', '');
      formData.append('customerName', data.customerName);
      formData.append('netAmount', data.netAmount);
      formData.append('vatRate', data.vatRate);
      formData.append('vatAmount', data.vatAmount);
      formData.append('totalGross', data.totalGross);
      formData.append('bankAccount', data.bankAccount);
      formData.append('note', data.note);
      formData.append(`banks[0][bankName]`, bankData.bankName);
      formData.append(`banks[0][accountName]`, bankData.accountName);
      formData.append(`banks[0][accountNumber]`, bankData.accountNumber);
      formData.append(`banks[0][sortCode]`, bankData.sortCode);
      formData.append(
        'customerAddress',
        JSON.stringify({
          street: response.body.buildingNameNumber,
          city: response.body.landmark,
          state: response.body.streetName,
          postalCode: response.body.postalCode,
        })
      );
      formData.append(
        'accountantAddress',
        JSON.stringify({
          street: response.body.buildingNameNumber,
          city: response.body.landmark,
          state: response.body.streetName,
          postalCode: response.body.postalCode,
        })
      );
      formData.append('vatRegNo', response.body.vatNumber);
      formData.append('crn', response.body.crnNumber);
      formData.append('image', this.employeeLogo);
      if (this.activeMenuItem != 'generatedInvoice') {
        this.invoiceService.generateInvoice(formData).subscribe((res) => {
          alert('Invoice generated successfully...');
        });
      }

      let customerData;
      this.customerService
        .getCustomerByID(data.createdFor)
        .subscribe((response) => {
          customerData = response.body;
          this.generatePDF(
            data,
            responseBody,
            bankData,
            null,
            this.employeeLogo,
            customerData
          );
        });
    });
  }

  convertDataToUrl(data: any): void {
    data.forEach((image: any) => {
      if (image.data) {
        this.isImage = true;
      } else {
        this.isImage = false;
      }
      this.employeeLogo = `data:image/jpeg;base64,${image.data}`;
    });
  }
}
