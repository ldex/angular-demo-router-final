import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  template: `
    <h2>Products</h2>
    <router-outlet></router-outlet>
  `
})
export class ProductsComponent {

  constructor(
    private router: Router,
    private titleService: Title) {

    router
      .events
      .pipe(
        filter((evt:RouterEvent) => evt instanceof NavigationEnd && evt.url == '/products')
      )
      .subscribe(() => {
          this.titleService.setTitle('Products List');
      })
  }

}