import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

    constructor(
        private adminService: AdminService,
        private titleService: Title,
        private metaTagService: Meta) { }

    profile: string = '';

    getProfile() {
        this.adminService
            .getProfile()
            .subscribe(
                response => this.profile = response
            );
    }

    ngOnInit(): void {
        this.setSEO();
    }

    private setSEO() {
        this.titleService.setTitle('Admin Page');
        this.metaTagService.updateTag({ name: 'description', content: 'This is the Angular Store Admin Page.' });
    }
}