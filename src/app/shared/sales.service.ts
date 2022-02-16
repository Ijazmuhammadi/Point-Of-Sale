import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  readonly APIUrl='https://localhost:44305/api/Sales'
 
  constructor(private http:HttpClient) { }
  form: FormGroup = new FormGroup({
    //CustomerId: new FormControl(null),
    
    //SalesID: new FormControl(''),
    ProductID: new FormControl('', Validators.required),
    Quantity: new FormControl('', Validators.required),
    Unit_Price: new FormControl('', Validators.required),
    SubTotal: new FormControl(''),
    SalesDate: new FormControl(''),
    
  });
  getSaleList():Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}/GetSales`);
  }
  
  getProductNameID():Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}/GetProducts`);
  }
  addSale(obj:any){
    console.warn("order data",obj)
    return this.http.post<any>(`${this.APIUrl}/CreateSales`,obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateSale(id:any,obj:any){
    console.warn("sss",id)
    return this.http.put<any>(`${this.APIUrl}/UpdateSale/${id}`,obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteSale(id:any){
    return this.http.delete(`${this.APIUrl}/DeleteSale/${id}`,{responseType: 'text'})
    }
}

