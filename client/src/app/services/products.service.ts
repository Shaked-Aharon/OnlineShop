import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:3000/api/products");
  }

  public addProduct(product){
    return this.http.post("http://localhost:3000/api/products", product);
  }

  public uploadProductImage(file){
    const formData = new FormData();
    formData.append("image", file, file.name)
    return this.http.post("http://localhost:3000/upload-image", formData);
  }

  public updateProduct(product){
    return this.http.put("http://localhost:3000/api/products", product);
  }
}
