import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component, OnInit, VERSION } from '@angular/core';
import { filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, RouterOutlet, AsyncPipe]
})
export class AppComponent implements OnInit {
  title = 'Angular Store';
  version = VERSION.full;

  loading$ = this.router.events.pipe(
    filter(
      (e) =>
        e instanceof NavigationStart ||
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
    ),
    map((e) => e instanceof NavigationStart)
  );

  constructor(
    private authService: AuthService,
    private router: Router) {

    }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
    this.router.navigateByUrl("/login");
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/home");
  }

  ngOnInit() {
  }
}
