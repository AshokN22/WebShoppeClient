import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { Customer } from './Customer';

@Injectable()
export class CustomersService{
    constructor(private http:Http){}

    getCustomers(){
        return this.http.get("http://localhost:54588/api/Customer/GetCustomers")
    }

    addCustomer(crd:Customer){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('charset','utf-8');
        return this.http.post("http://localhost:54588/api/Customer/NewCustomer",crd,{headers:headers});
    }

    editCustomer(crd:Customer){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('charset','utf-8');
        let id = crd.cid;
        return this.http.post("http://localhost:54588/api/Customer/EditCustomer/"+id,crd,{headers:headers});
    }

    findCustomer(cid:number){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('charset','utf-8');
        return this.http.get("http://localhost:54588/api/Customer/GetCustomer/"+cid,{headers:headers});
    }

    deleteCustomer(cid:number){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('charset','utf-8');
        return this.http.get("http://localhost:54588/api/Customer/DeleteCustomer/"+cid,{headers:headers});
    }
}