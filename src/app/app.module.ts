import { RoleGuard } from './shared/role.guard';
import { CustomerService } from './shared/customer.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { MaterialModule } from "./material/material.module";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { UsersComponent } from './users/users.component';
import { SalesComponent } from './sales/sales.component';
import {MatCardModule} from '@angular/material/card';
import {SPINNER, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { MatTableExporterModule } from 'mat-table-exporter';
import { CategoryComponent } from './category/category.component';
import { ToastrModule } from 'ngx-toastr';
const appRoutes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent, 
    children: [
      { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
      { path: 'customer', component: CustomerComponent,canActivate:[AuthGuard] },
      { path: 'order', component: OrderComponent,canActivate:[AuthGuard] },
      { path: 'product', component: ProductComponent,canActivate:[AuthGuard] },
      // { path: 'signup', component: SignupComponent,canActivate:[AuthGuard] },
      // {path:'login',component:LoginComponent,canActivate:[AuthGuard]},
      // {path:'signup',component:SignupComponent,canActivate:[AuthGuard]},
      {path:'users',component:UsersComponent,canActivate:[AuthGuard]},
      {path:'sales',component:SalesComponent,canActivate:[AuthGuard]},
      {path:'category',component:CategoryComponent,canActivate:[AuthGuard]},
    ],
    
  },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/register', pathMatch: 'full' }
];
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.ballScaleMultiple, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  blur:15,
  text:"Please Wait",
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    CustomersComponent,
    CustomerComponent,
    OrderComponent,
    ProductComponent,
    SignupComponent,
    RegisterComponent,
    UsersComponent,
    SalesComponent,
    CategoryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    MatTableExporterModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    AppRoutingModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
