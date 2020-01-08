import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { fadeInAnimation } from '../animations';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': ''}
})
export class LoginComponent {

    error: string = '';

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    loginUser(form: NgForm) {
        console.log(form.value);
        if (form.valid) {
            this.loginService
                .login(form.value.username, form.value.password)
                .subscribe(
                    result => {
                        if(result) {
                            this.router.navigateByUrl('/admin');
                        } else {
                            this.error = 'Invalid username or password!';
                        }
                    }
                );
        }
    }
}