import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../shared/login.service';
import { SignupService } from '../shared/signup.service';
import { UserModel } from './UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  successMessage:string ="";
  showPassword : any;
  public loginObj = new UserModel();
  //loginForm!: FormGroup; 
  readonly APIUrl='https://localhost:44305/api/Users'
  constructor(private http:HttpClient,private router : Router,public service:LoginService,private toastr: ToastrService) { }
  loginForm: FormGroup = new FormGroup({
    //CustomerId: new FormControl(null),
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', [Validators.required]),
   });
  
  ngOnInit(): void {
   
  }

  login(){
    this.loginObj.UserName = this.loginForm.value.UserName;
    this.loginObj.Password = this.loginForm.value.Password;
    this.http.post<any>(`${this.APIUrl}/Login`,this.loginObj)
    .subscribe(res=>{
      this.toastr.success(res.message);
      console.warn("res",res)
      this.router.navigate(['dashboard/home']);
     localStorage.setItem('token',res.jwttoken);
    localStorage.setItem('userType',res.userType);
    localStorage.setItem('fullName',res.fullName);
    },err=>{
      this.toastr.error("User Name and Password Incorrect");
    })
   
     }
     forgotPassword(){
      if (this.service.form.valid) {  
        this.service.forgotPassword(this.service.form.value).subscribe((result)=>{
        this.showPassword=result.forgotPassword
        this.toastr.info("Password is "+result.forgotPassword)
        })
        this.service.form.reset(); 
     }
    }
     
}
