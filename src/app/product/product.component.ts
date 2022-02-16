import { productModel } from './productModel';
import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from '../shared/notification.service';
import { ProductService } from '../shared/product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(public service:ProductService,private toater:ToastrService) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['productName','unit_Price','quantity','categoryName','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  arrayData:any[]=[]
  collection:any
  //objj:any
  customeobj:any
  prodobj:any
  showAdd !: boolean;
  showUpdate !: boolean; 
  prodObj : productModel = new productModel();

  ngOnInit(): void {
    this.showUpdate = true;
    this.getproductDetails()
    this.service.getCategoryNameID().subscribe((result)=>{
      console.warn("nameid result",result)
     this.customeobj=result
      console.warn("nameid customeojb",this.customeobj)
   })
  }
  getproductDetails(){
    this.service.getProductList().subscribe((result)=>{
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
  clickAddEmployee(){
    this.service.form.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onSubmit() {
    if (this.service.form.valid) {  
       this.service.addProduct(this.service.form.value).subscribe((result)=>{
        this.toater.success(':: Submitted successfully');
        let can=document.getElementById('cancel')
        can?.click()
       // console.warn("Successfully inserted");
        this.getproductDetails()
       })
       this.service.form.reset(); 
    }
   }
   onEdit(row : any){
    this.prodObj.ProductID = row.productID;
    this.service.form.controls['ProductName'].setValue(row.productName);
    this.service.form.controls['Unit_Price'].setValue(row.unit_Price);
    this.service.form.controls['Quantity'].setValue(row.quantity);
    this.service.form.controls['CategoryID'].setValue(row.categoryID);
    this.showUpdate = true;
    this.showAdd = false;
  }
   editOrderDetail() {
    if (this.service.form.valid) {  
     // this.customerObj.CustomerId=this.customerObj.CustomerId;
      this.prodObj.ProductName=this.service.form.value.ProductName;
      this.prodObj.Unit_Price=this.service.form.value.Unit_Price;
        this.prodObj.Quantity=this.service.form.value.Quantity;
        this.prodObj.CategoryID=this.service.form.value.CategoryID;
       this.service.updateProduct(this.prodObj.ProductID,this.prodObj).subscribe((result)=>{
        this.toater.info(':: Updated successfully');
        let can=document.getElementById('cancel')
        can?.click()
        this.getproductDetails()
        //console.warn("Successfully inserted");
       })
       
      this.service.form.reset();
    
      //this.onClose();
      //this.service.initializeservice.formGroup();
    }
  }
  deleteEmployeeDetail(row : any){
   // console.warn("row data",row)
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.service.deleteProduct(row.productID)
     .subscribe(res=>{
     this.toater.warning('::Deleted successfully');
     this.getproductDetails()
     //console.warn("deleted")
       //alert("Deleted Successfully");
      // this.getEmployeeDetails();
     })
    }
     
   }

}
