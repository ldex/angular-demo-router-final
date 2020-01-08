import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoginService } from './services/login.service';
import { Component, OnInit, VERSION } from '@angular/core';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Store';
  version = VERSION.full;

  constructor(
    private loginService: LoginService,
    private router: Router) {

      router.events
      .pipe(
        filter((evt) => evt instanceof NavigationStart || evt instanceof NavigationEnd)
      )
      .subscribe((evt) => {
      //  console.log(evt);
        if(evt instanceof NavigationStart) {
        //  console.log("Route Change Start!");
        } else if(evt instanceof NavigationEnd) {          
         // console.log("Route Change End!");
        }
      })

    }

  get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  login() {
    this.router.navigateByUrl("/login");
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl("/home");
  }

  ngOnInit() {
  }
}
