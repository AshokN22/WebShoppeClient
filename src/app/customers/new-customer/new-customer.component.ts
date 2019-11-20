import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CustomersService } from '../customers.service';
import { FlagMessage } from 'src/app/products/FlagMessage';
import { Customer } from '../Customer';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  cust:Customer={cid:'',firstName:'',middleName:'',lastName:'',gender:'',mobile:'',email:'',street1:'',street2:'',city:'',state:'',country:'',pinCode:''};
  Mdata:{flag:FlagMessage,message:string};
  constructor(private cserv:CustomersService,public dialogRef:MatDialogRef<NewCustomerComponent>) { }

  ngOnInit() {
    console.log("Added..........");
  }

  OnOk(){
      this.cserv.addCustomer(this.cust).subscribe(
        (response)=>{
          const data = response.text();
          this.Mdata = {flag:FlagMessage.SUCCESS,message:data}; 
          this.dialogRef.close(this.Mdata);         
        },
        (error)=>{
          const errText = error.text();
          this.Mdata = {flag:FlagMessage.ERROR,message:errText}; 
          this.dialogRef.close(this.Mdata);
        }
      );
      
  }

  OnCancel(){
    this.Mdata = {flag:FlagMessage.CANCEL,message:"Cancelled"};
    this.dialogRef.close(this.Mdata);
  }

}
