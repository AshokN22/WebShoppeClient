import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { Product } from './Product';

@Injectable()
export class ProductsService{
    constructor(private http:Http){}

    getProducts(){
        return this.http.get("http://localhost:54588/api/Product/GetProducts")
    }

    addProducts(prd:Product){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('charset','utf-8');
        return this.http.post("http://localhost:54588/api/Product/NewProduct",prd,{headers:headers});
    }

    editProducts(prd:Product){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('charset','utf-8');
        let id = prd.pid;
        return this.http.post("http://localhost:54588/api/Product/EditProduct/"+id,prd,{headers:headers});
    }

    findProducts(pid:number){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('charset','utf-8');
        return this.http.get("http://localhost:54588/api/Product/GetProduct/"+pid,{headers:headers});
    }

    deleteProducts(pid:number){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append('charset','utf-8');
        return this.http.get("http://localhost:54588/api/Product/DeleteProduct/"+pid,{headers:headers});
    }
}