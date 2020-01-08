import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
        filter(evt => evt instanceof NavigationEnd)
      )
      .subscribe((evt: NavigationEnd) => {
        if (evt.url == '/products') {
          this.titleService.setTitle('Products List');
        }
      })
  }

}