import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url:any='https://localhost:44305/api/Dashboards'
  url_order:any='https://localhost:44305/api/Orders'
  constructor(private http:HttpClient) { }
  getCustomersCount()
  {
   return this.http.get(`${this.url}/GetCustomerCount`)
  }
  getOrderCount()
  {
   return this.http.get(`${this.url}/GetOrderCount`)
  }
  getProductCount()
  {
   return this.http.get(`${this.url}/GetProductCount`)
  }
  getSalesCount()
  {
   return this.http.get(`${this.url}/GetSalesCount`)
  }
  getOrderRevenue()
  {
   return this.http.get(`${this.url_order}/GetOrderRevenue`)
  }
  getGraphData()
  {
   return this.http.get(`${this.url}/GetSalesGraph`)
  }
  
}
