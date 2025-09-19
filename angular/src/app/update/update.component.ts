import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    units: 0,
    type: ''
  };

  loading = true;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,  ) {}

ngOnInit(): void {
  const nav = history.state as { product?: Product };
  if (nav.product) {
  this.product = nav.product;    }
}

save(): void {
  const p = this.product;
  if (!p._id) {
    alert('Missing _id on product');
    this.router.navigate(['/products']);
    return;
  }

  this.productService.update(p._id, p).subscribe({
    next: (res) => {
      console.log('Updated:', res);
      this.router.navigate(['/products']); 
    },
    error: (err) => {
      console.error('Update failed', err);
      this.router.navigate(['/products']);
    },
  });
 }
}
