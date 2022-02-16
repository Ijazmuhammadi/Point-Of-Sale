import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  readonly APIUrl='https://localhost:44305/api/Users'
  constructor(private http:HttpClient) { }
  form: FormGroup = new FormGroup({
    //CustomerId: new FormControl(null),
    FullName: new FormControl('', Validators.required),
    UserName: new FormControl('', [Validators.required,Validators.pattern("[a-zA-Z0-9]*@gmail.com")]),
    Password: new FormControl('', [Validators.required,Validators.pattern("[a-zA-z@_]{6,}")]),
    Mobile: new FormControl('', [Validators.required,Validators.required, Validators.min(1000000000),Validators.max(9999999999)]),
    UserType: new FormControl('NormalUser'),

    // FullName: ['',[Validators.required]],
    // Mobile: ['',[Validators.required, Validators.min(1000000000),Validators.max(9999999999)]],
    // UserName:['',[Validators.required, Validators.pattern("[a-zA-Z0-9]*@gmail.com")]],
    // Password: ['',[Validators.required,Validators.pattern("[a-zA-z@_]{6,}")]]
    // UserType: new FormControl('',Validators.required),
   });
 

  addUser(obj:any){
    console.warn("User data",obj)
    return this.http.post<any>(`${this.APIUrl}/SignUp`,obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
 
}
