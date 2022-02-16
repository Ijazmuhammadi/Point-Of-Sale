import { SignupService } from './../shared/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  successMessage:string =""

  regForm!:FormGroup

  constructor(public service: SignupService,private notificationService: NotificationService) { }

  ngOnInit(): void {
   // this.getUserDetails();
  }
  // getUserDetails(){
  //   this.service.getUserList().subscribe((result)=>{
  //     console.warn(result)
     
  //  })
  //  }
  register(){
    if (this.service.form.valid) {  
      this.service.addUser(this.service.form.value).subscribe((result)=>{
       this.notificationService.success(':: Register successfully');
       console.warn("Successfully inserted");
      // this.getUserDetails()
      })
      
     this.service.form.reset();
     
   }
    this.successMessage = "Successfully Registered..."
    // console.log(this.regForm)
  }
}
