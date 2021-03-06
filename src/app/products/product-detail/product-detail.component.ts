import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { FavouriteService } from './../../services/favourite.service';
import { Product } from './../product.interface';
import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { slideInOutAnimation } from '../../animations';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  animations: [slideInOutAnimation]
})
export class ProductDetailComponent implements OnInit {

  @HostBinding('@slideInOutAnimation') animation = true;
  @Input() product: Product;
  product$: Observable<Product>;
  productSub: Subscription;

  @Output() favouriteAdded = new EventEmitter<Product>();

  constructor(
    private favouriteService: FavouriteService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  deleteProduct(id: number) {
    if (window.confirm('Are you sure to delete this product ?')) {
      this.productService
        .deleteProduct(id)
        .subscribe(
          () => {
            console.log('Product deleted.');
            this.productService.clearCache();
            this.router.navigateByUrl("/products");
          },
          error => console.log('Could not delete product. ' + error)
        );
    }
  }

  addToFavourites(product: Product) {
    this.favouriteAdded.emit(product);
    this.favouriteService.addToFavourites(product);
  }

  ngOnInit() {

    // With resolver
    this.product = this.route.snapshot.data['product'];

    this.setSEO(this.product);

    // Avec router state (dans template: product$ | async as product)
    // this.product$ = this
    //                   .route
    //                   .paramMap
    //                   .pipe(
    //                     map(() => window.history.state)
    //                   )

    // Avec service (dans template: product$ | async as product)
    // let id = this.route.snapshot.params["id"];
    // if (id) {
    //     this.product$ = this.productService.getProductById(id);
    // }
  }

  private setSEO(product: Product) {
    this.titleService.setTitle('Product Details: ' + product.name);
    this.metaTagService.updateTag({ name: 'description', content: 'Details page for product ' + product.name });
  }

}
