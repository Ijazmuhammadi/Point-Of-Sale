import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly APIUrl='https://localhost:44305/api/Categories'
  constructor(private http:HttpClient) { }
  form: FormGroup = new FormGroup({
    CategoryName: new FormControl('', Validators.required),
  });
  getCategoryList():Observable<any[]>{
    return this.http.get<any>(`${this.APIUrl}/GetCategory`);
  }

  addCategory(obj:any){
    console.warn("order data",obj)
    return this.http.post<any>(`${this.APIUrl}/CreateCategory`,obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateCategory(id:any,obj:any){
    console.warn("sss",id)
    return this.http.put<any>(`${this.APIUrl}/UpdateCategory/${id}`,obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteCategory(id:any){
    console.warn("dda",id)
    return this.http.delete(`${this.APIUrl}/DeleteCategory/${id}`,{responseType: 'text'})
    }
   
}
