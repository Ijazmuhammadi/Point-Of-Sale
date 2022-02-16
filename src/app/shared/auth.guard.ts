import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router,private toaster:ToastrService){}
  canActivate() {
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      this.toaster.error("Please Login first to continue")
      this.router.navigate(['register'])
      return false;
    }
    
  }
  
}
