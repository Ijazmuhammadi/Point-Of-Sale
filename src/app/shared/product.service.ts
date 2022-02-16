import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly APIUrl='https://localhost:44305/api/Products'
  constructor(private http:HttpClient) { }
  form: FormGroup = new FormGroup({
    //CustomerId: new FormControl(null),
    ProductName: new FormControl('', Validators.required),
    Unit_Price: new FormControl('', Validators.required),
    Quantity: new FormControl('', Validators.required),
    CategoryID: new FormControl(''),
    
  });
  getProductList():Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}/GetProducts`);
  }
  getCategoryNameID():Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}/GetCategoryNameId`);
  }

  addProduct(obj:any){
    console.warn("order data",obj)
    return this.http.post<any>(`${this.APIUrl}/CreateProduct`,obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateProduct(id:any,obj:any){
    console.warn("sss",id)
    return this.http.put<any>(`${this.APIUrl}/UpdateProduct/${id}`,obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteProduct(id:any){
    return this.http.delete(`${this.APIUrl}/DeleteProduct/${id}`,{responseType: 'text'})
    }
}
