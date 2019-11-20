import { Component, OnInit, Inject } from '@angular/core';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CustomersService } from '../customers.service';
import { Customer } from '../Customer';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  cust:Customer={cid:'',firstName:'',middleName:'',lastName:'',gender:'',mobile:'',email:'',street1:'',street2:'',city:'',state:'',country:'',pinCode:''};
  constructor(private cserv:CustomersService,public dialogRef:MatDialogRef<EditCustomerComponent>,@Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit() {
    this.cust.cid = this.data.crid;
    this.cserv.findCustomer(this.data.crid).subscribe(
      (response)=>{
        const dta = response.json();
        console.log(dta);
        console.log(this.data.crid);
        this.cust = dta;
      },
      (error)=>{
        const errText = error.text();
      }
    );
  }
  OnCancel(){
    this.dialogRef.close();
  }
}
