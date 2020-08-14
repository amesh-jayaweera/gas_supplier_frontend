import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/modules/Company';
import { CommaExpr } from '@angular/compiler';
import { FormDetails } from 'src/app/modules/Form';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-konwusage',
  templateUrl: './konwusage.component.html',
  styleUrls: ['./konwusage.component.css']
})
export class KonwusageComponent implements OnInit {

  emailPattern = "\d+@stu.mmu.ac.uk";
  //'/(\d+@stu.mmu.ac.uk)/';
  email = new FormControl('', [Validators.required,Validators.email]);

  surname = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  gasusage = new FormControl('', [Validators.required]);
  directDebit = false;
  onlineAccount = false;
  paperlessBilling = false;
  isValidate = true;
  isSubmitted = false;

  companies : Company[] = [];
  sortedCompanies : Company[] = [];
  bestcompany : string = "";

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.isValidate = false;
      return 'You must enter a email';
    }
    
    //return this.email.hasError('email') ? 'Not a valid email' : '';
    if(this.email.hasError('email')) {
      this.isValidate = false;
      return 'Not a valid email';
    }
    this.isValidate = true;
  }

  getSurnameErrorMessage() {
      if (this.surname.hasError('required')) {
        this.isValidate = false;
      return 'You must enter your surname';
    }
    this.isValidate = true;
  }

  getPhoneErrorMessage() {
    if (this.phone.hasError('required')) {
      this.isValidate = false;
      return 'You must enter your phone';
    }
    this.isValidate = true;
  }

  getAddressErrorMessage() {
    if (this.address.hasError('required')) {
      this.isValidate = false;
      return 'You must enter your address';
    }
    this.isValidate = true;
  }

  getGasUsageErrorMessage() {
    if (this.gasusage.hasError('required')) {
      this.isValidate = false;
      return 'You must enter estimated gas usage in your home';
    }
    this.isValidate = true;
  }
 

  constructor(private service : CompanyService) { }

  ngOnInit(): void {
  }

   
  OnClear() {
    this.surname.setValue("");
    this.email.setValue("");
    this.phone.setValue("");
    this.address.setValue("");
    this.gasusage.setValue("");
    this.directDebit = false;
    this.onlineAccount = false;
    this.paperlessBilling = false;
  }

  onSubmit() {
    this.isSubmitted = false;
    this.bestcompany = "";
    if(this.isValidate) {
      console.log(this.surname.value);
      console.log(this.email.value);
      console.log(this.address.value);
      console.log(this.phone.value);
      console.log(this.gasusage.value);
      console.log(this.directDebit);
      console.log(this.onlineAccount);
      console.log(this.paperlessBilling);

      this.service.allCompaines().subscribe(x=> {
          this.companies = x;
          this.sortedCompanies = [];
          for(let i=0;i<this.companies.length;i++) {

            var company = this.companies[i];
             company.total_gas = (365 * company.standing_gas / 100.0) + this.gasusage.value * company.per_unit_gas;
            
             
             if(Boolean(this.directDebit)) {
              company.total_gas -= company.direct_debit;
             }

             if(Boolean(this.onlineAccount)) {
              company.total_gas -= company.online;
            }

            if(Boolean(this.paperlessBilling)) {
                if(company.name != 'C') {
                  company.total_gas -= company.paperless_billing;
                }
            }

              this.sortedCompanies.push(company);
          }


          var data = new FormDetails();
          data.datetime = new Date();
          data.surname = this.surname.value;
          data.email = this.email.value;
          data.phone_number = this.phone.value;
          data.address = this.address.value;
          
          data.direct_debit = this.directDebit == true ? 'YES' : 'NO';
          data.online_account = this.onlineAccount == true ? 'YES' : 'NO';
          data.paperless_billing = this.paperlessBilling == true ? 'YES' : 'NO';

          data.gas_usage_per_year = this.gasusage.value;
          data.company_a = this.sortedCompanies[0].total_gas;
          data.company_b = this.sortedCompanies[1].total_gas;
          data.company_c = this.sortedCompanies[2].total_gas;


           // Save Form Details
        this.service.saveFormDetailsKonw(data).subscribe(x=> {

        });

          let len = this.sortedCompanies.length;
          var temp;
          // Bubble Sort Algorithm
          for(let i=0;i<len-1;i++) {
            for(let j=0;j<len-i-1;j++) {
              if(this.sortedCompanies[j].total_gas > this.sortedCompanies[j+1].total_gas) {
                  temp = this.sortedCompanies[j];
                  this.sortedCompanies[j] = this.sortedCompanies[j+1];
                  this.sortedCompanies[j+1] = temp;
              }
            }
          }
          this.bestcompany = this.sortedCompanies[0].name;
          this.isSubmitted = true;
          console.log(this.sortedCompanies);
      });
      
    }
    
  }

}
