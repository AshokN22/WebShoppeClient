import { Component, OnInit,Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProductsService } from '../products.service';
import { Product } from '../Product';
import { FlagMessage } from '../FlagMessage';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  prod:Product={pid:'',pName:'',price:'',availableQuantity:''};
  Mdata:{flag:FlagMessage,message:string};
  constructor(private pserv:ProductsService,public dialogRef:MatDialogRef<NewProductComponent>) { }

  ngOnInit() {
    console.log("Added..........");
  }

  OnOk(){
      this.pserv.addProducts(this.prod).subscribe(
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
