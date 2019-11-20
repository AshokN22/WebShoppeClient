import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:string;
  password:string;
  constructor(private userv:UserService) { }

  ngOnInit() {
  }

  OnLogin(){
      this.userv.Validate(this.userName,this.password).subscribe(
        (response)=>{
          console.log(response);
        },
        (error)=>{
          console.log(error);
        }
      );
  }

  OnSocialLogin(providerName:string){
    this.userv.SocialLogin(providerName);
  }


}
