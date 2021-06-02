
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/shared/objects/user';

@Component({
    selector: 'user-tile',
    templateUrl: './user-tile.component.html',
    styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {

    @Input('user')
    public user: User

    constructor() { }

    ngOnInit(): void {
    }

}
