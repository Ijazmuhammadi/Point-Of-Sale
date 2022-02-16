import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  today: number = Date.now();
  fullname:any
  constructor(public router: Router) { }
  ngOnInit(): void {
    
  this.fullname= localStorage.getItem('fullName');
  }

  redirectToHome() {
    this.router.navigateByUrl('dashboard/home');
  }
  redirectToAbout() {
    this.router.navigateByUrl('dashboard/about');
  }
  logMeOut() {
    this.router.navigateByUrl('login');
    localStorage.clear();
  }

}
