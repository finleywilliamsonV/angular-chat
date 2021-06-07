import { CUPCAKE_IPSUM, HIPSTER_IPSUM, LOREM_IPSUM, MessageService } from './../shared/services/message.service';
import { Message } from './../shared/objects/message';
import { Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { UserService, DEFAULT_USER_PASSWORD } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/objects/user';
import { Subscription } from 'rxjs';

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
    async ngOnInit(): Promise<void> {

        // get the users
        this.users = this.userService.users

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
        this.userAuthorizationSub = this.authService.userAuthorization.subscribe(
            (authorizedUser: User) => {
                this.authorizedUser = authorizedUser
            }
        )

        // initialize the test case
        if (!this.authorizedUser) {
            await this.initTest()
        }
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


    /**
     * Inits whatever case I'm testing at the time
     */
    public async initTest() {

        // get users for testing 
        const firstUser = this.users[0]
        const secondUser = this.users[1]

        // make sure they exist
        if (!firstUser || !secondUser) {
            console.error('Init test invalid, add more users')
            return
        }

        // authorize the first user
        await this.authService.authorizeUser(firstUser, DEFAULT_USER_PASSWORD)
        this.router.navigate(['/messages', firstUser.id])

        // add test messages from first user to second user
        this.messageService.addMessage(
            secondUser,
            firstUser,
            'Test Message 1',
            LOREM_IPSUM
        )

        this.messageService.addMessage(
            secondUser,
            firstUser,
            'Test Message 2',
            CUPCAKE_IPSUM
        )

        this.messageService.addMessage(
            secondUser,
            firstUser,
            'Test Message 3',
            HIPSTER_IPSUM
        )
    }
}
