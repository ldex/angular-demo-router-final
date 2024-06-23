import { ActivatedRoute, Params } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animations';

@Component({
    templateUrl: './error.component.html',
    animations: [fadeInAnimation],
    standalone: true
})
export class ErrorComponent implements OnInit {
    @HostBinding('@fadeInAnimation') animation;

    message: string = "";

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.message = this.route.snapshot.queryParams['reason'] || 'none';
    }
}