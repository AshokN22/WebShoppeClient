import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NewProductComponent } from './new-product/new-product.component';
import { FlagMessage } from './FlagMessage';
import { Product } from './Product';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewProductComponent } from './view-product/view-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  ColumnsName: string[] = ['pid','pName','price','availableQuantity','Action1','Action2','Action3'];
  prodList:Product[] = [];
  constructor(
    private pserv:ProductsService,
    public dialog:MatDialog,
    private snackBar:MatSnackBar
    ) { }

    refresh(){
      this.pserv.getProducts().subscribe(
        (response)=>{
          const data = response.json();
          console.log(data);
          this.prodList = data;
        },
        (error)=>{
          this.snackBar.open(error.text(),"Dismiss",{duration:2000});
        }
      );
    }

  ngOnInit() {
      this.refresh();
  }

  onEdit(pid:number){
    console.log(pid);
    let dialogRef = this.dialog.open(EditProductComponent,{data:{prid:pid},width:'700px'});
    dialogRef.afterClosed().subscribe((result:{flag:FlagMessage,message:string})=>
    {
      console.log(result);
      if(result.flag == FlagMessage.SUCCESS)
      {
        this.snackBar.open("Record Modified Successfully...............","Dismiss",{duration:2000});
      }
      else if(result.flag == FlagMessage.ERROR)
      {
        this.snackBar.open("Error from Server................","Dismiss",{duration:2000});
      }
      else if(result.flag == FlagMessage.CANCEL)
      {
        this.snackBar.open("Operation cancelled by user................","Dismiss",{duration:2000});        
      }
      this.refresh();
      console.log(result);
    });
  }

  OpenDialog(){
    let dialogRef = this.dialog.open(NewProductComponent,{width:'700px'});
    dialogRef.afterClosed().subscribe((result)=>
    {

      let mres: {flag:FlagMessage,message:string} = result;
      if(result.flag == FlagMessage.SUCCESS)
      {
        this.snackBar.open("Record Saved Successfully...............","Dismiss",{duration:2000});
      }
      else if(result.flag == FlagMessage.ERROR)
      {
        this.snackBar.open("Error from Server................","Dismiss",{duration:2000});
      }
      else if(result.flag == FlagMessage.CANCEL)
      {
        this.snackBar.open("Operation cancelled by user................","Dismiss",{duration:2000});        
      }
      this.refresh();
      console.log(result);
    });
  }

  onView(pid:number){
    this.dialog.open(ViewProductComponent,{data:{prid:pid},width:'500px'});
  }

  onDelete(pid:number){
    this.pserv.deleteProducts(pid).subscribe(
      (response)=>{
        const data = response.text();
        this.refresh();
        this.snackBar.open("Record Deleted Successfully...............","Dismiss",{duration:2000});
      },
      (error)=>{
        const errText = error.text();
        this.snackBar.open("Error from Server................","Dismiss",{duration:2000});
      }
    );
  }



}
