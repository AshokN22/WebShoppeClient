import { Injectable, Inject } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { User } from '../register/User';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class UserService{
    constructor(@Inject(DOCUMENT) private doc:Document,private http:Http){}

    /**
     * Validate
uname:string,password:string     */
    public Validate(uname:string,password:string) {
        const h = new Headers({'Content-Type':'application/json'});
        return this.http.post("http://localhost:54588/api/Account/Login",{userName:uname,password:password},{headers:h});
    }

    public Register(user:User) {
        const h = new Headers({'Content-Type':'application/json'});
        return this.http.post("http://localhost:54588/api/Account/Register",user,{headers:h});
    }

    /**
     * SocialLogin
string providerName     */
    public SocialLogin(providerName:string) {
        this.doc.location.href = "http://localhost:54588/api/Account/ExternalLogin/"+providerName;
    }
}