import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
customercount:any
ordercount:any
productcount:any
salescount:any
ordrev:any
  constructor(private service: HomeService) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['order_Name','fullName','sub_Total','order_Date','productName','total_Price_Product','revenue'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  arrayData:any[]=[]
  collection:any
  grapharray:any
 
  ngOnInit(): void {
    this.getCustomerCount();
    this.getOrersCount();
    this.getProductCount();
    this.getSalesCount(); 
    this.getOrderRevenue();
   this.getGraphData();
  }
  getGraphData(){
    this.service.getGraphData().subscribe((result)=>{
      console.warn("date",result)
      this.grapharray=result
   })
   }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
 
  getCustomerCount(){
  this.service.getCustomersCount().subscribe((result)=>{
    console.warn(result)
    this.customercount=result
    console.warn("count",this.customercount)
 })
 }
 getOrersCount(){
  this.service.getOrderCount().subscribe((result)=>{
    console.warn(result)
    this.ordercount=result
    console.warn("count",this.ordercount)
 })
 }
 getProductCount(){
  this.service.getProductCount().subscribe((result)=>{
    console.warn(result)
    this.productcount=result
    console.warn("count",this.productcount)
 })
 }
 getSalesCount(){
  this.service.getSalesCount().subscribe((result)=>{
    console.warn(result)
    this.salescount=result
    console.warn("count",this.salescount)
 })
 }
 getOrderRevenue(){
  this.service.getOrderRevenue().subscribe((result)=>{
    console.warn(result)
    this.collection=result
    this.arrayData=this.collection
    console.warn("array data",this.arrayData)
    this.listData = new MatTableDataSource(this.arrayData);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
 })
 }
}
