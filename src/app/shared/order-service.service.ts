import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  readonly APIUrl='https://localhost:44305/api/Orders'
  readonly APIUrl2='https://localhost:44305/api/Products'
  constructor(private http:HttpClient) { }
  form: FormGroup = new FormGroup({
    //CustomerId: new FormControl(null),
    Order_Name: new FormControl('', Validators.required),
    Quantity: new FormControl('', Validators.required),
    Unit_Price: new FormControl('', Validators.required),
    Sub_Total: new FormControl('', [Validators.required]),
    Order_Date: new FormControl(''),
    ProductID: new FormControl('',[Validators.required]),
    CustomerId: new FormControl(''),
    payement: new FormControl(''),
    
  });
  getOrderList():Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}/GetOrder`);
  }
  //get product quantity
  getProductQuantity(id:any){
  //  console.warn("User data",obj)
    return this.http.get<any>(`${this.APIUrl2}/GetProductQuantity/${id}`)
    .pipe(map((res:any)=>{
      return res;
    }))
    // console.info("product id",id)
    // return this.http.get<any>(`${this.APIUrl2}/GetProductQuantity/${id}`);
  }
    //update products quantity
    updateProduct(ProductID:any,Quantity:any){
    console.warn("id is",ProductID)
    console.warn("obj is",Quantity)
      return this.http.put<any>(`${this.APIUrl2}/PartialUpdateProduct/${ProductID}`,Quantity)
      .pipe(map((res:any)=>{
        return res;
      }))
    }
  
  getcustomerNameID():Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}/GetCustomerNameId`);
  }
  getproductNameID():Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}/GetOrderNameId`);
  }
  getOrderUnitPrice(id:any):Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}/GetOrderUnitPrice/${id}`);
  }
  addOrder(obj:any){
    console.warn("order data",obj)
    return this.http.post<any>(`${this.APIUrl}/CreateOrder`,obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateOder(id:any,obj:any){
    console.warn("sss",id)
    return this.http.put<any>(`${this.APIUrl}/UpdateOrder/${id}`,obj)
    .pipe(map((res:any)=>{
      console.warn("response",res)
      return res;
    }))
    

  }

  deleteOrder(id:any){
    return this.http.delete(`${this.APIUrl}/DeleteOrder/${id}`,{responseType: 'text'})
    }
    //return this.http.delete(`${this.APIUrl}/${id}`,{responseType: 'text'});
    // return this.http.delete(this.APIUrl+'/Department/'+obj);
  
}
