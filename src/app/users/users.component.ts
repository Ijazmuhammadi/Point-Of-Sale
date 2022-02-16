import { NotificationService } from './../shared/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from '../login/UserModel';
import { UsersService } from '../shared/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public service: UsersService,private dialog: MatDialog,private toater:ToastrService) { }
  role:string =""
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName','userName','mobile','userType','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
 arrayData:any[]=[]
  collection:any
  showAdd !: boolean;
  showUpdate !: boolean; 
  userObj : UserModel = new UserModel();
 
  //showUpdate !: boolean;

  ngOnInit(): void {
    this.showUpdate = true;
    this. getUserDetails()
    this.role = localStorage.getItem('userType')!
    console.warn("usertype",this.role)
  }
 getUserDetails(){
  this.service.getusers().subscribe((result)=>{
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
    this.userObj.Id = row.id;
    this.service.form.controls['FullName'].setValue(row.fullName);
    this.service.form.controls['UserName'].setValue(row.userName);
    this.service.form.controls['Mobile'].setValue(row.mobile);
    this.service.form.controls['UserType'].setValue(row.userType);
    this.showUpdate = true;
    this.showAdd = false;
  }

  onSubmit() {
    if (this.service.form.valid) {  
       this.service.insertuser(this.service.form.value).subscribe((result)=>{
        this.toater.success(':: Submitted successfully');
        let can=document.getElementById('cancel')
        can?.click()
      //  console.warn("Successfully inserted");
        this.getUserDetails()
       })
       
      this.service.form.reset();
      
    }
    
   }

   editEmployeeDetail() {
    if (this.service.form.valid) {  
     // this.customerObj.CustomerId=this.customerObj.CustomerId;
      this.userObj.FullName=this.service.form.value.FullName;
        this.userObj.UserName=this.service.form.value.UserName;
        this.userObj.Mobile=this.service.form.value.Mobile;
        this.userObj.UserType=this.service.form.value.UserType;
       this.service.updateuser(this.userObj).subscribe((result)=>{
        this.toater.info(':: Updated successfully');
        let can=document.getElementById('cancel')
        can?.click()
        this.getUserDetails()
        //console.warn("Successfully inserted");
       })
       
      this.service.form.reset();
    
      //this.onClose();
      //this.service.initializeservice.formGroup();
    }
  }
  deleteEmployeeDetail(row : any){
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.service.deleteuser(row.id)
     .subscribe(res=>{
     this.toater.warning('::Deleted successfully');
     this.getUserDetails()
       //alert("Deleted Successfully");
      // this.getEmployeeDetails();
     })
    }
     
   }
}
