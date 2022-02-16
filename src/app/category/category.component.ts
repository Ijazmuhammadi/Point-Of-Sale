import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../shared/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { categoryModel } from './categoryModel';
import { NotificationService } from '../shared/notification.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public service:CategoryService,private toater:ToastrService) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['categoryID','categoryName','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  arrayData:any[]=[]
  collection:any
  //objj:any


  showAdd !: boolean;
  showUpdate !: boolean;
  categoryObj : categoryModel = new categoryModel();

  ngOnInit(): void {
    this.showUpdate = true;
    this.getCategoryList();
  }
  getCategoryList(){
    this.service.getCategoryList().subscribe((result)=>{
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
  clickAddCategory(){
    this.service.form.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onSubmit() {
    if (this.service.form.valid) {  
       this.service.addCategory(this.service.form.value).subscribe((result)=>{
        this.toater.success('Inserted Successfully');
        let can=document.getElementById('cancel')
        can?.click()
        //console.warn("Successfully inserted");
        this.getCategoryList()
       })
       this.service.form.reset(); 
    }
   }

   onEdit(row : any){
     console.warn("row id is",row.categoryID);
    console.warn('name',row.categoryName);
    this.categoryObj.CategoryID = row.categoryID;
    this.service.form.controls['CategoryName'].setValue(row.categoryName);
    this.showUpdate = true;
    this.showAdd = false;
  }
   editCategoryDetail() {
    if (this.service.form.valid) {  
     // this.customerObj.CustomerId=this.customerObj.CustomerId;
      this.categoryObj.CategoryName=this.service.form.value.CategoryName;
       this.service.updateCategory(this.categoryObj.CategoryID,this.categoryObj).subscribe((result)=>{
        this.toater.info(':: Updated successfully');
        let can=document.getElementById('cancel')
        can?.click()
        this.getCategoryList()
       // console.warn("Update inserted");
       })
       
      this.service.form.reset();
    }
  }
 
  deleteCategoryDetail(row : any){
   // console.warn("row data",row)
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.service.deleteCategory(row.categoryID)
     .subscribe(res=>{
     this.toater.warning('::Deleted successfully');
     this.getCategoryList()
     })
    }
   }

}
