
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
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }

    public navigateToLogin(): void {
        this.router.navigate(['../', 'login', this.user.id], {relativeTo: this.route})
    }
}
