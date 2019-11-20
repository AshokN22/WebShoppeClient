import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { Product } from '../Product';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  prod:Product={pid:'',pName:'',price:'',availableQuantity:''};
  constructor(private pserv:ProductsService,public dialogRef:MatDialogRef<EditProductComponent>,@Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit() {
    this.prod.pid = this.data.prid;
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
  OnCancel(){
    this.dialogRef.close();
  }
}
