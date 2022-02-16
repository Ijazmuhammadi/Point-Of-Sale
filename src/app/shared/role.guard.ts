import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private toaster:ToastrService){}
  // Role:any
  canActivate()
   {
     
  let Role=localStorage.getItem('userType');
     if(Role=='admin')
     {
      return true;
     }
   this.toaster.error("Access denied");
   return false;
  }
  
}
