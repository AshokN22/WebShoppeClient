import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../Product';
import { FlagMessage } from '../FlagMessage';
import { ProductsService } from '../products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  prod:Product={pid:'',pName:'',price:'',availableQuantity:''};
  Mdata:{flag:FlagMessage,message:string};
  constructor(private pserv:ProductsService,public dialogRef:MatDialogRef<EditProductComponent>,@Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit() {
    console.log("edit");
    console.log(this.data.prid);
    this.prod.pid = this.data.prid;
    console.log(this.data.prid);
    this.pserv.findProducts(this.data.prid).subscribe(
      (response)=>{
        const dta = response.json();
        console.log(dta);
        console.log(this.data.prid);
        this.prod = dta;
      },
      (error)=>{
        const errText = error.text();
      }
    );
  }

  OnOk(){
      this.pserv.editProducts(this.prod).subscribe(
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
