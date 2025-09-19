import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, HttpClientModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductsComponent implements OnInit {
  list: Product[] = [];
  constructor(private api: ProductService, private router: Router) {}
  ngOnInit() { this.api.getAll().subscribe(r => this.list = r); }
  del(p: Product) {
    if (!p._id) return;
    this.api.remove(p._id).subscribe(() => this.api.getAll().subscribe(r => this.list = r));
  }
}