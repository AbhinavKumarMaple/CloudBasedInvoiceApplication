import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/Services/customer.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { InvoiceService } from 'src/app/Services/invoice.service';
import { ServiceDescriptionService } from 'src/app/Services/service-description.service';
import { VatRateService } from 'src/app/Services/vat-rate.service';
import * as moment from 'moment';
import { createApplication } from '@angular/platform-browser';
import { AccountantService } from 'src/app/Services/accountant.service';
import { Subject, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html',
  styleUrls: ['./invoice-update.component.scss'],
})
export class InvoiceUpdateComponent implements OnInit {
  invoiceForm!: FormGroup;
  editableData: any;
  isEdit: boolean = false;
  vatRateOptions: any[] = [];
  paymentMethod: string[] = ['Cash', 'Cheque', 'Bank Transfer'];
  serviceDescriptionList: any;
  customerList: any;
  banksList: any;
  netAmountInput: any;
  selectedVatRate: any;
  selectedCustomer: any;
  vatRate: any;
  loggedInAs: any = localStorage.getItem('loggedInAs');
  customerID: any = localStorage.getItem('id');
  openVatList: boolean = false;
  openCustomerList: boolean = false;
  openBankList: boolean = false;
  openServiceList: boolean = false;
  openPaymentList: boolean = false;
  description: any[] = [];
  createdFor: any;
  activeMenuItem: any = localStorage.getItem('activeMenuItem');
  paymentStatus: string[] = ['Unpaid', 'Paid'];
  openStatusList: boolean = false;
  startDate: any;
  endDate: any;
  private _searchTerm$ = new Subject<string>();
  private _descTerm$ = new Subject<string>();
  filteredCustomerList: any[] = [];
  filterDescList: any[] = [];
  filterVatRateOptions: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<InvoiceUpdateComponent>,
    private formbuilder: FormBuilder,
    private vatService: VatRateService,
    private invoiceService: InvoiceService,
    private vatRateService: VatRateService,
    private customerService: CustomerService,
    private serviceDescription: ServiceDescriptionService,
    private employeeService: EmployeeService,
    private accountantService: AccountantService,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.editableData = data;
    if (data) {
      console.log(data);
      this.isEdit = true;
    }
    this._searchTerm$.subscribe((searchTerm) => {
      this.filterCustomers(searchTerm);
    });

    this._descTerm$.subscribe((descTerm) => {
      this.filterDesc(descTerm);
    });
  }

  ngOnInit(): void {
    this.getVatRate();
    this.getCustomer();
    this.getServiceDescription();
    if (this.loggedInAs == 'employee') {
      this.employeeService.employeeBankInfo().subscribe((res) => {
        this.banksList = res.body.banks;
      });
    } else if (this.loggedInAs == 'customer') {
      this.accountantService.getAccountantInfo().subscribe((res) => {
        this.banksList = res.body.banks;
      });
    }

    this.description = this.isEdit ? this.editableData.serviceDescription : [];

    this.invoiceForm = this.formbuilder.group({
      customerName: [
        this.isEdit ? this.editableData.customerName : '',
        [Validators.required],
      ],
      netAmount: [
        this.isEdit ? this.editableData.netAmount : '',
        [Validators.required],
      ],
      vatRate: [
        this.isEdit ? this.editableData.vatRate : '',
        [Validators.required],
      ],
      vatAmount: [
        this.isEdit ? this.editableData.vatAmount : '',
        [Validators.required],
      ],
      totalGross: [
        this.isEdit ? this.editableData.totalGross : '',
        [Validators.required],
      ],
      bankAccount: [
        this.isEdit ? this.editableData.bankAccount : '',
        [Validators.required],
      ],
      date: [
        this.isEdit ? this.editableData.date : new Date(),
        [Validators.required],
      ],
      paymentMethod: [
        this.isEdit ? this.editableData.paymentMethod : '',
        [Validators.required],
      ],
      note: [this.isEdit ? this.editableData.note : '', [Validators.required]],
      paymentStatus: [
        this.isEdit ? this.editableData.paymentStatus : '',
        [Validators.required],
      ],
      serviceDescription: ['', [Validators.required]],
    });
    this.createdFor = this.isEdit ? this.editableData.createdFor : '';
  }

  onTextChange(searchTerm: string) {
    this._searchTerm$.next(searchTerm);
    this.openCustomerList = true;
  }

  filterCustomers(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredCustomerList = this.customerList;
    } else {
      this.filteredCustomerList = this.customerList.filter(
        (invoice: any) =>
          (invoice.name
            ? invoice.name.toLowerCase().includes(searchTerm.toLowerCase())
            : false) ||
          invoice.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  onDescChange(searchTerm: string) {
    this._descTerm$.next(searchTerm);
    this.openServiceList = true;
  }

  filterDesc(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.filterDescList = this.serviceDescriptionList;
    } else {
      this.filterDescList = this.serviceDescriptionList.filter((invoice: any) =>
        invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  getVatRate() {
    if (this.loggedInAs == 'employee') {
      this.vatService.getVatRate().subscribe((response) => {
        this.vatRateOptions = response.body;
        this.vatRateOptions.push({ vatRate: 20 });
        this.vatRateOptions.push({ vatRate: 5 });
        this.vatRateOptions.push({ vatRate: 0 });
        this.filterVatRateOptions = this.vatRateOptions;
      });
    } else {
      this.vatService.getVatRate().subscribe((response) => {
        if (response) {
          this.vatRateOptions = response.body;
          this.vatRateOptions.push({ vatRate: 20 });
          this.vatRateOptions.push({ vatRate: 5 });
          this.vatRateOptions.push({ vatRate: 0 });
          this.filterVatRateOptions = this.vatRateOptions;
        }
      });
    }
  }

  getServiceDescription() {
    this.serviceDescription.getServiceDesc().subscribe((response) => {
      this.serviceDescriptionList = response.body;
      this.filterDescList = this.serviceDescriptionList;
    });
  }

  getCustomer() {
    if (this.loggedInAs == 'employee') {
      const currentDate = moment();
      const startDate = currentDate.clone().subtract(1000, 'day');
      this.startDate = startDate.format('YYYY-MM-DD');
      this.endDate = currentDate.format('YYYY-MM-DD');
      let data = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      this.customerService
        .getAllCustomer(1, 100000, data)
        .subscribe((response) => {
          this.customerList = response.body.customers;
          this.filteredCustomerList = this.customerList;
        });
    } else if (this.loggedInAs == 'customer') {
      const currentDate = moment();
      const startDate = currentDate.clone().subtract(1, 'day');
      this.startDate = startDate.format('YYYY-MM-DD');
      this.endDate = currentDate.format('YYYY-MM-DD');
      let data = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      this.employeeService
        .employeeUnderAccountant(1, 1000000, data)
        .subscribe((response) => {
          this.customerList = response.body.employees;
          this.filteredCustomerList = this.customerList;
        });
    }
  }

  setBank(bank: any) {
    let bankName = this.invoiceForm.get('bankAccount');
    bankName?.patchValue(bank);
    this.openBankList = false;
  }

  setDesc(data: any) {
    let description = this.invoiceForm.get('serviceDescription');
    description?.patchValue(data);
    this.openServiceList = false;
  }

  setPayment(data: any) {
    let method = this.invoiceForm.get('paymentMethod');
    method?.patchValue(data);
    this.openPaymentList = false;
  }

  setStatus(data: any) {
    let status = this.invoiceForm.get('paymentStatus');
    status?.patchValue(data);
    this.openStatusList = false;
  }

  dropdownSelected(selectedOption: any) {
    this.createdFor = selectedOption._id;
    let customer = this.invoiceForm.get('customerName');
    customer?.patchValue(
      selectedOption.name ? selectedOption.name : selectedOption.username
    );
    this.openCustomerList = false;
  }

  calculateGross(value?: any) {
    let vat = this.invoiceForm.get('vatAmount');
    let gross = this.invoiceForm.get('totalGross');
    let vatRate = this.invoiceForm.get('vatRate');

    this.openVatList = false;

    if (value) {
      vatRate?.patchValue(value);
      const netAmount = this.invoiceForm.value.netAmount;
      vat?.patchValue((netAmount * value) / 100);
      gross?.patchValue(netAmount + this.invoiceForm.value.vatAmount);
    } else {
      const netAmount = parseFloat(this.invoiceForm.value.netAmount);
      vat?.patchValue((netAmount * this.invoiceForm.value.vatRate) / 100);
      gross?.patchValue(netAmount + this.invoiceForm.value.vatAmount);
    }
  }
  addDescription() {
    const netAmountControl = this.invoiceForm.get('netAmount');
    const vatRateControl = this.invoiceForm.get('vatRate');
    const serviceDescriptionControl =
      this.invoiceForm.get('serviceDescription');

    if (netAmountControl && vatRateControl && serviceDescriptionControl) {
      const netAmount = netAmountControl.value;
      const vatRate = vatRateControl.value;
      const vatAmount = (netAmount * vatRate) / 100;
      const totalGross = Number(netAmount) + vatAmount;

      const serviceDescription = serviceDescriptionControl.value;
      const newServiceDescription = {
        description: serviceDescription,
        netAmount: netAmount,
        vatRate: vatRate,
        vatAmount: vatAmount,
        totalGross: totalGross,
      };

      this.description.push(newServiceDescription);

      // Clear relevant form fields
      this.invoiceForm.patchValue({
        serviceDescription: '',
        netAmount: null,
        vatRate: null,
        vatAmount: null,
        totalGross: null,
      });
    }
  }

  saveInvoice() {
    const data = {
      customerName: this.invoiceForm.value.customerName,
      createdFor: this.createdFor,
      bankAccount: this.invoiceForm.value.bankAccount,
      date: moment(this.invoiceForm.value.date).format('YYYY-MM-DD'),
      serviceDescription: this.description.map((desc: any) => ({
        description: desc.description,
        netAmount: desc.netAmount,
        vatRate: desc.vatRate,
        vatAmount: desc.vatAmount,
        totalGross: desc.totalGross,
      })),
      paymentMethod: this.invoiceForm.value.paymentMethod,
      paymentStatus: this.isEdit
        ? this.invoiceForm.value.paymentStatus
        : 'Unpaid',
      note: this.invoiceForm.value.note,
    };

    if (this.isEdit) {
      if (this.activeMenuItem == 'generatedInvoice') {
        this.invoiceService
          .updateGeneratedInvoiceById(this.editableData._id, data)
          .subscribe(() => {
            alert('Invoice updated successfully...');
            this.cancelDialog();
          });
      } else {
        console.log('data strcuture: ', data);
        this.invoiceService
          .updateById(this.editableData._id, data)
          .subscribe(() => {
            alert('Invoice updated successfully');
            this.cancelDialog();
            window.location.reload();
          });
      }
    } else {
      this.invoiceService.create(data).subscribe(() => {
        alert('Invoice created successfully.');
        this.cancelDialog();
        window.location.reload();
      });
    }
  }

  // addDescription() {
  //   this.description.push(
  //     this.invoiceForm.value.serviceDescription
  //   )
  //   let description = this.invoiceForm.get('serviceDescription');
  //   description?.patchValue('');
  // }

  removeServiceDescrption(desc: any) {
    this.description = this.description.filter((d) => d != desc);
  }
}
