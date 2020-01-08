import { Router } from '@angular/router';
import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../animations';

@Component({
    templateUrl: './home.component.html',
    animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': ''}
})
export class HomeComponent {
        
    constructor(private router: Router) { }

}