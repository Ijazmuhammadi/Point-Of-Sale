import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../shared/notification.service';
import { SalesService } from '../shared/sales.service';
import { salesModel } from './salesModel';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(public service:SalesService,private toater:ToastrService) { }
  fileName='ExcelSheet.xlsx';
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['productName','quantity','unit_Price','subTotal','salesDate','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  arrayData:any[]=[]
  collection:any
  //objj:any
 // saleeobj:any
  prodobj:any
  showAdd !: boolean;
  showUpdate !: boolean;
  saleobj : salesModel = new salesModel();

  ngOnInit(): void {
    this.showUpdate = true;
    this.getsalesDetails();

    this.service.getProductNameID().subscribe((result)=>{
      console.warn("nameid result",result)
     this.prodobj=result
      console.warn("nameid prodobj",this.prodobj)
   })
  }
  getsalesDetails(){
    this.service.getSaleList().subscribe((result)=>{
      console.warn(result)
      this.collection=result
      this.arrayData=this.collection
      console.warn("array data",this.arrayData)
      this.listData = new MatTableDataSource(this.arrayData);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
   })
   }



   onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onClear() {
       this.service.form.reset();
  }
  clickAddSale(){
    this.service.form.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onSubmit() {
    if (this.service.form.valid) {
       this.service.addSale(this.service.form.value).subscribe((result)=>{
        this.toater.success(':: Submitted successfully');
        let can=document.getElementById('cancel')
        can?.click()
        console.warn("Successfully inserted");
        this.getsalesDetails()
       })
     //  this.getProductQuantity();
       this.service.form.reset();
       
    }
   }
   onEdit(row : any){
    this.saleobj.SalesID = row.salesID;
    this.service.form.controls['ProductID'].setValue(row.productID);
    this.service.form.controls['Quantity'].setValue(row.quantity);
    this.service.form.controls['Unit_Price'].setValue(row.unit_Price);
    this.service.form.controls['SubTotal'].setValue(row.subTotal);
    this.service.form.controls['SalesDate'].setValue(row.salesDate);
    this.showUpdate = true;
    this.showAdd = false;
  }
   editOrderDetail() {
    if (this.service.form.valid) {
     // this.customerObj.CustomerId=this.customerObj.CustomerId;
      this.saleobj.ProductID=this.service.form.value.ProductID;
      this.saleobj.Quantity=this.service.form.value.Quantity;
      this.saleobj.Unit_Price=this.service.form.value.Unit_Price;
        this.saleobj.SubTotal=this.service.form.value.SubTotal;
        this.saleobj.SalesDate=this.service.form.value.SalesDate;
       this.service.updateSale(this.saleobj.SalesID,this.saleobj).subscribe((result)=>{
        this.toater.info(':: Updated successfully');
        let can=document.getElementById('cancel')
        can?.click()
        this.getsalesDetails()
        console.warn("Successfully inserted");
       })

      this.service.form.reset();
    }
  }
  prodid:any
  prodquantity:any
 
  deleteSaleDetail(row : any){
   // console.warn("row data",row)
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.service.deleteSale(row.salesID)
     .subscribe(res=>{
     this.toater.warning('::Deleted successfully');
     this.getsalesDetails()
     console.warn("deleted")
     })
    }
   }
   exportExcel()
   {
    
   }
  }
