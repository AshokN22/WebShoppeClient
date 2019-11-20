import { Component, OnInit } from '@angular/core';
import { Customer } from './Customer';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { FlagMessage } from '../products/FlagMessage';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  ColumnsName: string[] = ['cid','FirstName','MiddleName','LastName','Gender','Mobile','EMail','Action1','Action2','Action3'];
  custList:Customer[] = [];
  constructor(
    private pserv:CustomersService,
    public dialog:MatDialog,
    private snackBar:MatSnackBar
    ) { }

    refresh(){
      this.pserv.getCustomers().subscribe(
        (response)=>{
          const data = response.json();
          console.log(data);
          this.custList = data;
        },
        (error)=>{
          this.snackBar.open(error.text(),"Dismiss",{duration:2000});
        }
      );
    }

  ngOnInit() {
      this.refresh();
  }

  onEdit(cid:number){
    console.log(cid);
    let dialogRef = this.dialog.open(EditCustomerComponent,{data:{crid:cid},width:'800px'});
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
    let dialogRef = this.dialog.open(NewCustomerComponent,{width:'800px'});
    dialogRef.afterClosed().subscribe((result)=>
    {

      console.log(result);
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
    this.dialog.open(ViewCustomerComponent,{data:{crid:pid},width:'500px'});
  }

  onDelete(cid:number){
    this.pserv.deleteCustomer(cid).subscribe(
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
