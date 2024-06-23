import { Router } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../animations';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './home.component.html',
    animations: [fadeInAnimation],
    standalone: true
})
export class HomeComponent implements OnInit {
    @HostBinding('@fadeInAnimation') animation;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {

    }

}