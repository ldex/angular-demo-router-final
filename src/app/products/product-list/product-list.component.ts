import { Observable, EMPTY } from 'rxjs';
import { FavouriteService } from './../../services/favourite.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../product.interface';
import { Component, OnInit, OnDestroy, ViewEncapsulation, HostBinding } from '@angular/core';
import { Router } from "@angular/router";
import { fadeInAnimation } from '../../animations';
import { Title, Meta } from '@angular/platform-browser';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    animations: [fadeInAnimation]
})
export class ProductListComponent implements OnInit {

    @HostBinding('@fadeInAnimation') animation = true;
    title = "Products";
    products$: Observable<Product[]>;
    selectedProduct: Product;
    sorter = "-modifiedDate";
    errorMessage: string;

    pageSize: number = 5;
    start: number = 0;
    end: number = this.pageSize;
    currentPage: number = 1;

    firstPage(): void {
        this.start = 0;
        this.end = this.pageSize;
        this.currentPage = 1;
    }

    nextPage(): void {
        this.start += this.pageSize;
        this.end += this.pageSize;
        this.currentPage++;
    }

    previousPage(): void {
        this.start -= this.pageSize;
        this.end -= this.pageSize;
        this.currentPage--;
    }

    loadMore(): void {
        let take: number = this.pageSize * 2;
        let skip: number = this.end + 1;
        this.products$ = this.productService.getMoreProducts(skip, take);
    }

    sortList(propertyName: string): void {
        this.sorter = this.sorter.startsWith("-") ? propertyName : "-" + propertyName;
        this.firstPage();
    }

    onSelect(product: Product): void {
        this.selectedProduct = product;
        //  this.router.navigateByUrl("/products/" + product.id);
         this.router.navigateByUrl("/products/" + product.id, { state: product });
    }

    message: string = "";

    newFavourite(product: Product): void {
        this.message = `Product
                        ${product.name} 
                        added to your favourites!`;
    }

    get favourites(): number {
        return this.favouriteService.getFavouritesNb();
    }

    constructor(
        private productService: ProductService,
        private favouriteService: FavouriteService,
        private router: Router,
        private titleService: Title,
        private metaTagService: Meta) { }

    ngOnInit() {
        this.products$ = this
            .productService
            .getProducts()
            .pipe(
                catchError(
                    error => {
                        this.errorMessage = error;
                        return EMPTY
                    }
                )
            );
        this.setSEO();
    }

    private setSEO() {
        this.titleService.setTitle('Products List');
        this.metaTagService.updateTag({ name: 'description', content: 'List of products' });
    }
}