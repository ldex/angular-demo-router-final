import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FavouriteService } from './../services/favourite.service';
import { ProductService } from './../services/product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderBy } from './orderBy.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductDetailResolve } from '../services/product-detail-resolve.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductsRoutingModule
    ],
    exports: [ProductListComponent],
    declarations: [
        ProductsComponent,
        ProductDetailComponent,
        ProductListComponent,
        OrderBy,
        ProductInsertComponent
    ],
    providers: [
        ProductDetailResolve, 
        ProductService,
        FavouriteService],
})
export class ProductsModule { }
