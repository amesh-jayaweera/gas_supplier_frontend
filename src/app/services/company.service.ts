import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConstants } from '../modules/AppConstants';
import { Company } from '../modules/Company';
import { FormDetails } from '../modules/Form';
import { Graph } from '../modules/Graph';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  backendurl= "";
  constructor(private http : HttpClient) { 
    this.backendurl = AppConstants.BACKEND_URL;
  }

  saveFormDetailsKonw(form : FormDetails)  {
    
    const url = `${this.backendurl}${"saveFormDetailsKnow"}`;
    return this.http.post(url,form,httpOptions);
  }

  saveFormDetailsDontKonw(form : FormDetails) {
    
    const url = `${this.backendurl}${"saveFormDetailsDontKnow"}`;
    return this.http.post(url,form,httpOptions);
  }

  allCompaines() : Observable<Company[]> {
    const url = `${this.backendurl}${"companies"}`;
      return this.http.get<Company[]>(url);
  }

  grahData() : Observable<Graph[]> {
    const url = `${this.backendurl}${"form_details_dont_know_usage"}`;
      return this.http.get<Graph[]>(url);
  }


}
