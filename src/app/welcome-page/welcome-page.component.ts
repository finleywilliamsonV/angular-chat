import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CUPCAKE_IPSUM, HIPSTER_IPSUM, LOREM_IPSUM, MessageService } from './../shared/services/message.service';
import { DEFAULT_USER_PASSWORD, UserService } from './../shared/services/user.service';
import { map } from 'rxjs/operators';
import { Message } from './../shared/objects/message';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'app/shared/objects/user';

/**
 * Welcome Page Component Class
 */
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
    private initialized: boolean

    /**
     * Constuctor
     * @param userService
     * @param authService
     */
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) { }

    /**
     * On Init Lifecycle Hook 
     */
    public ngOnInit(): void {

        // get the currently authorized user
        if (this.authService.authorizedUser) {
            this.authorizedUser = this.authService.authorizedUser
        }

        // subscribe to user changes
        this.usersChangedSub = this.userService.usersChanged.subscribe(
            (newUsers: User[]) => {
                this.users = newUsers
            }
        )

        // subscribe to user authorization
        this.userAuthorizationSub = this.authService.userAuthChanged.subscribe(
            (authorizedUser: User) => {
                this.authorizedUser = authorizedUser
            }
        )
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
        if (this.users?.length > 1) {
            return `${this.users.length} Users Found`
        } else if (this.users?.length === 1) {
            return '1 User Found'
        } else {
            return 'No Users Found'
        }
    }
}
