import { Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { UserService, DEFAULT_USER_PASSWORD } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/objects/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

    // member vars
    public users: User[]
    private usersChangedSub: Subscription
    public authorizedUser: User
    private userAuthorizationSub: Subscription

    /**
     * Constuctor
     * @param userService
     * @param authService
     */
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) { }

    /**
     * On Init Lifecycle Hook 
     */
    async ngOnInit(): Promise<void> {
        this.users = this.userService.users
        this.usersChangedSub = this.userService.usersChanged.subscribe(
            (newUsers: User[]) => {
                this.users = newUsers
            }
        )

        // subscribe to user authorization
        this.userAuthorizationSub = this.authService.userAuthorization.subscribe(
            (authorizedUser: User) => {
                this.authorizedUser = authorizedUser
            }
        )

        const currentFirstUser = this.users[0]
        await this.authService.authorizeUser(currentFirstUser, DEFAULT_USER_PASSWORD)
        this.router.navigate(['/messages', currentFirstUser.id])
    }

    /**
     * Returns the welcome string for the title of the page
     * @returns string
     */
    public get welcomeString(): string {
        if (this.authorizedUser) {
            return `Welcome, ${this.authorizedUser.firstName}!`
        } else {
            return 'Welcome!'
        }
    }

    /**
     * Returns the string representation of the user count
     * @returns string
     */
    public get userCountString(): string {
        if (this.users.length === 0) {
            return 'No Users Found'
        } else if (this.users.length === 1) {
            return '1 User Found'
        } else {
            return `${this.users.length} Users Found` 
        }
    }
}
