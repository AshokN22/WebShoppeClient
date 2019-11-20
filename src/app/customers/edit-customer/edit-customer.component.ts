import { Component, OnInit, Inject } from '@angular/core';
import { FlagMessage } from 'src/app/products/FlagMessage';
import { CustomersService } from '../customers.service';
import { Customer } from '../Customer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditProductComponent } from 'src/app/products/edit-product/edit-product.component';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  cust:Customer={cid:'',firstName:'',middleName:'',lastName:'',gender:'',mobile:'',email:'',street1:'',street2:'',city:'',state:'',country:'',pinCode:''};
  Mdata:{flag:FlagMessage,message:string};
  constructor(private cserv:CustomersService,public dialogRef:MatDialogRef<EditProductComponent>,@Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit() {
    console.log("edit");
    console.log(this.data.crid);
    this.cust.cid = this.data.crid;
    console.log(this.data.crid);
    this.cserv.findCustomer(this.data.crid).subscribe(
      (response)=>{
        const dta = response.json();
        console.log(this.data.prid);
        this.cust = dta;
      },
      (error)=>{
        const errText = error.text();
      }
    );
  }

  OnOk(){
      this.cserv.editCustomer(this.cust).subscribe(
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
