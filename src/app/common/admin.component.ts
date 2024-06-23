import { fadeInAnimation } from '../animations';
import { AdminService } from './../services/admin.service';
import { Component, HostBinding } from '@angular/core';

@Component({
    templateUrl: './admin.component.html',
    animations: [fadeInAnimation],
    standalone: true
})
export class AdminComponent {
    @HostBinding('@fadeInAnimation') animation;
    constructor(private adminService: AdminService) { }

    profile: string = '';

    getProfile() {
        this.adminService
            .getProfile()
            .subscribe(
                response => this.profile = response
            );
    }
}