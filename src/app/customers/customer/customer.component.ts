import { CustomerService } from './../../shared/customer.service';
import { NotificationService } from '../../shared/notification.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
//@ts-nocheck
//import {FormBuilder,formGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import { customerModel } from './customer.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public service: CustomerService,private dialog: MatDialog,private toater:ToastrService) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName','email','contactNumber','address','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
 arrayData:any[]=[]
  collection:any
  showAdd !: boolean;
  showUpdate !: boolean; 
  customerObj : customerModel = new customerModel();
 
  //showUpdate !: boolean;

  ngOnInit(): void {
    this.showUpdate = true;
    this.getCustomerDetails() 
  }
 getCustomerDetails(){
  this.service.getCustomers().subscribe((result)=>{
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

  onEdit(row : any){
    this.customerObj.CustomerId = row.customerId;
    this.service.form.controls['FullName'].setValue(row.fullName);
    this.service.form.controls['Email'].setValue(row.email);
    this.service.form.controls['ContactNumber'].setValue(row.contactNumber);
    this.service.form.controls['Address'].setValue(row.address);
    this.showUpdate = true;
    this.showAdd = false;
  }

  onSubmit() {
    if (this.service.form.valid) {  
       this.service.insertCustomer(this.service.form.value).subscribe((result)=>{
        this.toater.success(':: Submitted successfully');
        let can=document.getElementById('cancel')
        can?.click()
      //  console.warn("Successfully inserted");
        this.getCustomerDetails()
       })
       
      this.service.form.reset();
      
    }
    
   }

   editEmployeeDetail() {
    if (this.service.form.valid) {  
     // this.customerObj.CustomerId=this.customerObj.CustomerId;
      this.customerObj.FullName=this.service.form.value.FullName;
        this.customerObj.Email=this.service.form.value.Email;
        this.customerObj.ContactNumber=this.service.form.value.ContactNumber;
        this.customerObj.Address=this.service.form.value.Address;
       this.service.updateCustomer(this.customerObj.CustomerId,this.customerObj).subscribe((result)=>{
        this.toater.info(':: Updated successfully');
        let can=document.getElementById('cancel')
        can?.click()
        this.getCustomerDetails()
        console.warn("Successfully inserted");
       })
       
      this.service.form.reset();
    
      //this.onClose();
      //this.service.initializeservice.formGroup();
    }
  }
  deleteEmployeeDetail(row : any){
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.service.deleteCustomer(row.customerId)
     .subscribe(res=>{
     this.toater.warning('::Deleted successfully');
     this.getCustomerDetails()
       //alert("Deleted Successfully");
      // this.getEmployeeDetails();
     })
    }
     
   }
}
