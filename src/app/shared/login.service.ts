import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly APIUrl='https://localhost:44305/api/Users'
  constructor(private http:HttpClient) { }
  form: FormGroup = new FormGroup({
    //CustomerId: new FormControl(null),
    UserName: new FormControl('', [Validators.required,Validators.pattern("[a-zA-Z0-9]*@gmail.com")]),
    Mobile: new FormControl('', [Validators.required,Validators.required, Validators.min(1000000000),Validators.max(9999999999)]), 
});
 
  forgotPassword(obj:any){
    console.warn("User data",obj)
    return this.http.post<any>(`${this.APIUrl}/ForgotPassword`,obj)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
