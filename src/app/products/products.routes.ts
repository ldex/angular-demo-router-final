import { Routes } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductInsertComponent } from "./product-insert/product-insert.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { productResolver } from "./product.resolver";
import { ProductsComponent } from "./products.component";

export const productsRoutes: Routes = [
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