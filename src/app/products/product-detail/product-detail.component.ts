import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { FavouriteService } from './../../services/favourite.service';
import { Product } from './../product.interface';
import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { slideInOutAnimation } from 'src/app/animations';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services';
import { UpperCasePipe, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css',
    animations: [slideInOutAnimation],
    standalone: true,
    imports: [RouterLink, UpperCasePipe, CurrencyPipe, DatePipe]
})
export class ProductDetailComponent implements OnInit {
  @HostBinding('@slideInOutAnimation') animation;

  @Input() product: Product;
  @Output() favouriteAdded = new EventEmitter<Product>();

  product$: Observable<Product>;

  constructor(
    private favouriteService: FavouriteService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private titleService: Title
  ) { }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  deleteProduct(id: number) {
    this.productService
        .deleteProduct(id)
        .subscribe({
           next: () => {
                console.log('Product deleted.');
                this.productService.clearList();
                this.router.navigateByUrl("/products");
            },
           error: e => console.log('Could not delete product. ' + e.message)
          }
        );
  }

  addToFavourites(product: Product) {
    this.favouriteAdded.emit(product);
    this.favouriteService.addToFavourites(product);
    this.router.navigateByUrl('/products');
  }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.titleService.setTitle('Details of product: ' + this.product.name);
  }

}
