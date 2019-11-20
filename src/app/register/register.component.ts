import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = {firstName:'',middleName:'',lastName:'',userName:'',password:'',confirmPassword:'',email:'',securityQuestion:'',securityAnswer:''}

  constructor(private userv:UserService) { }

  ngOnInit() {
  }

  OnRegister(){
    this.userv.Register(this.user).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }


}
