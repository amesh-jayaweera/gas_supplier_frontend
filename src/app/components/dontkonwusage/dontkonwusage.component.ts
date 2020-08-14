import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { Company } from 'src/app/modules/Company';
import { CompanyService } from 'src/app/services/company.service';
import { FormDetails } from 'src/app/modules/Form';

@Component({
  selector: 'app-dontkonwusage',
  templateUrl: './dontkonwusage.component.html',
  styleUrls: ['./dontkonwusage.component.css']
})
export class DontkonwusageComponent implements OnInit {

  emailPattern = "\d+@stu.mmu.ac.uk";
  //'/(\d+@stu.mmu.ac.uk)/';
  email = new FormControl('', [Validators.required,Validators.email]);
  surname = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  bedrooms =  new FormControl('', [Validators.required]);
  occupants = new FormControl('', [Validators.required]);
  type : 'FLAT' | 'TERRANCE' | 'SEMI-DETACHED' | 'DETACHED' = 'FLAT';
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

  getBedRoomsErrorMessage() {
    if (this.bedrooms.hasError('required')) {
      this.isValidate = false;
      return 'You must enter number of bedrooms';
    }
    this.isValidate = true;
  }
 
  getOccupantsErrorMessage() {
    if (this.occupants.hasError('required')) {
      this.isValidate = false;
      return 'You must enter number of occupants';
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
    
  }

  onSubmit() {
    this.isSubmitted = false;
    this.bestcompany = "";
    if(this.isValidate) {
      console.log(this.surname.value);
      console.log(this.email.value);
      console.log(this.address.value);
      console.log(this.phone.value);
      console.log(this.bedrooms.value);
      console.log(this.occupants.value);
      console.log(this.type);

      this.service.allCompaines().subscribe(x=> {
        this.companies = x;
        this.sortedCompanies = [];
        for(let i=0;i<this.companies.length;i++) {

          var company = this.companies[i];

          var score = 0;

          // Bed Rooms
          if(this.bedrooms.value >= 3) {
            score += 3;
          } else if(this.bedrooms.value == 2) {
            score += 2;
          } else if(this.bedrooms.value == 1){
            score += 1;
          } 

          if(this.occupants.value >= 3) {
            score += 3;
          } else if(this.occupants.value == 2) {
            score += 2;
          } else if(this.occupants.value == 1){
            score += 1;
          } 

          // House Type
          if(this.type == 'FLAT') {
            score += 1;
          } else if(this.type == 'DETACHED') {
            score += 4;
          }else if(this.type == 'SEMI-DETACHED') {
            score += 3;
          }else  {
            score += 2;
          }

          var gasusage = 0;
          if(score <= 5) { // Low Usage
            gasusage = 500;
          } else if(score <=10) { // Medium Usage
            gasusage = 1000;
          } else { // High Usage
            gasusage = 2000;
          }

           company.total_gas = (365 * company.standing_gas / 100.0) + gasusage * company.per_unit_gas;
        
            this.sortedCompanies.push(company);
        }
        

        var data = new FormDetails();
        data.datetime = new Date();
        data.surname = this.surname.value;
        data.email = this.email.value;
        data.phone_number = this.phone.value;
        data.address = this.address.value;
        data.bedrooms = this.bedrooms.value;
        data.occupants = this.occupants.value;
        data.house_type = this.type;
        data.company_a = this.sortedCompanies[0].total_gas;
        data.company_b = this.sortedCompanies[1].total_gas;
        data.company_c = this.sortedCompanies[2].total_gas;

        // Save Form Details
        this.service.saveFormDetailsDontKonw(data).subscribe(x=> {

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
