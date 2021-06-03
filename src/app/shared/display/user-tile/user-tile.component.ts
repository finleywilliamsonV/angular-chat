import { LoginModalComponent } from './../../../login-modal/login-modal.component';
import { ModalLaunchService } from './../../services/modal-launch.service';

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/shared/objects/user';

@Component({
    selector: 'user-tile',
    templateUrl: './user-tile.component.html',
    styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {

    @Input('user')
    public user: User

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private modalLaunchService: ModalLaunchService
    ) { }

    ngOnInit(): void {
    }

    public openLoginModal(): void {
        this.modalLaunchService.open(LoginModalComponent)
    }
}
