import { Routes } from '@angular/router';
import { ProductsComponent } from './product/product.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path:'products', component: ProductsComponent },
  { path:'add', component: AddComponent },
  { path: 'update/:oid', component: UpdateComponent }
];
