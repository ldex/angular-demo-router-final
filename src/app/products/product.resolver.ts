import { inject } from '@angular/core';
import { catchError, delay, throwError } from 'rxjs';
import { ProductService } from '../services';
import { Product } from './product.interface';
import { Router, ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

export const productResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot) => {
    const router = inject(Router);
    const productService = inject(ProductService);

   const id = +route.params['id'];
   return productService
       .getProductById(id)
       .pipe(
            delay(1500),
           catchError(
               () => {
                   router.navigateByUrl('/products');
                   return throwError(() => new Error('Product not found!'))
               })
       )
};
