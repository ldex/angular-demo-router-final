import { Router } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animations';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    templateUrl: './home.component.html',
    animations: [fadeInAnimation],
})
export class HomeComponent implements OnInit {

    @HostBinding('@fadeInAnimation') animation = true;

    constructor(
        private router: Router,
        private titleService: Title,
        private metaTagService: Meta
    ) { }

    ngOnInit(): void {
        this.setSEO();
    }

    private setSEO() {
        this.titleService.setTitle('Home Page');
        this.metaTagService.updateTag({ name: 'description', content: 'This is the Angular Store Home Page.' });
    }
}