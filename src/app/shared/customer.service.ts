import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 url:any='https://localhost:44305/api/Customers'
  constructor(private http:HttpClient,private formBuilder: FormBuilder) { }

    form: FormGroup = new FormGroup({
    //CustomerId: new FormControl(null),
    FullName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.email),
    ContactNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
    Address: new FormControl(''),
  });

  getCustomers()
  {
   return this.http.get(this.url)
  }

  insertCustomer(obj:any)
  {
  console.warn("service insert",obj)
   return this.http.post(this.url,obj)
  }
  updateCustomer(id:any,obj:any)
  {
    console.warn("service",id,obj)
   return this.http.put(`${this.url}/${id}`,obj)
  }
  deleteCustomer(id:any)
  {
    console.warn("service",id)
   return this.http.delete(`${this.url}/${id}`,{responseType: 'text'})
  }
}
