import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  p: Omit<Product, '_id' | 'id'> = {
  name: '', description: '', price: 0, units: 0, type: ''
  };
  constructor(private api: ProductService, private r: Router) {}
  save() { this.api.add(this.p).subscribe(() => this.r.navigateByUrl('/products')); }
}
