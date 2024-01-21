import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';
import { productResolver } from './product.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent, title: 'Products List' },
      { path: 'insert', component: ProductInsertComponent, title: 'Create a new product' },
      { path: ':id', component: ProductDetailComponent, resolve: {product: productResolver} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }