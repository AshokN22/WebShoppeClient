import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { HttpModule } from '@angular/http';
import { ProductsService } from './products/products.service';
import { FormsModule } from '@angular/forms';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { CustomersComponent } from './customers/customers.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { CustomersService } from './customers/customers.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './login/user.service';

const appRoutes:Routes = [
  {path:'',component:HomeComponent} , 
  {path:'Products',component:ProductsComponent},
  {path:'Customers',component:CustomersComponent},
  {path:'Login',component:LoginComponent},
  {path:'Register',component:RegisterComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NewProductComponent,
    EditProductComponent,
    ViewProductComponent,
    CustomersComponent,
    NewCustomerComponent,
    EditCustomerComponent,
    ViewCustomerComponent,
    LoginComponent,
    RegisterComponent
  ],
  entryComponents:[
    NewProductComponent,
    EditProductComponent,
    ViewProductComponent,
    EditCustomerComponent,
    NewCustomerComponent,
    ViewCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProductsService,CustomersService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
