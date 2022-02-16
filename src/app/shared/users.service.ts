import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url:any='https://localhost:44305/api/Users'
  constructor(private http:HttpClient,private formBuilder: FormBuilder) { }

    form: FormGroup = new FormGroup({
    //userId: new FormControl(null),
    FullName: new FormControl('',),
    UserName: new FormControl('',),
    Mobile: new FormControl('',),
    UserType: new FormControl(''),
  });

  getusers()
  {
   return this.http.get(`${this.url}/GetUsers`,)
  }

  insertuser(obj:any)
  {
  console.warn("service insert",obj)
   return this.http.post(`${this.url}/SignUp`,obj)
  }
  updateuser(obj:any)
  {
    console.warn("service",obj)
   return this.http.put(`${this.url}/UpdateUser`,obj)
  }
  deleteuser(id:any)
  {
    console.warn("service",id)
   return this.http.delete(`${this.url}/DeleteUser/${id}`,{responseType: 'text'})
  }

}
