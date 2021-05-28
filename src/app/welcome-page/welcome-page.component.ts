import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/objects/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

    public users: User[]
    private usersChangedSub: Subscription

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.users = this.userService.users
        console.log('this.userService.users', this.userService.users)
        this.usersChangedSub = this.userService.usersChanged.subscribe(
            (newUsers: User[]) => {
                this.users = newUsers
            }
        )
    }

    public get userCount(): string {
        console.log('this.users.length', this.users.length)
        if (this.users.length === 0) {
            return 'No Users Found'
        } else if (this.users.length === 1) {
            return '1 User Found'
        } else {
            return `${this.users.length} Users Found` 
        }
    }

}
