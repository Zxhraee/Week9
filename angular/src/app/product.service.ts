import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string;
  id?: string;  
  name: string;
  description: string;
  price: number;
  units: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private base = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> { return this.http.get<Product[]>(this.base); }
  add(p: Product): Observable<Product> { return this.http.post<Product>(this.base, p); }
  update(id: string, product: Product): Observable<any> { const { _id, ...payload } = product; return this.http.put(`${this.base}/${id}`, payload);
  }  remove(id: string) { return this.http.delete(`${this.base}/${id}`); }
}
