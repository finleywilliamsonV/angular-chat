import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/objects/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    // member vars
    public authorizedUser: User
    private userAuthorizationSub: Subscription

    /**
     * Constructor
     * @param authService 
     */
    constructor(
        private authService: AuthService
    ) { }


    /**
     * On Init Lifecycle Hook
     */
    public ngOnInit(): void {

        // subscribe to user authorization
        this.userAuthorizationSub = this.authService.userAuthorization.subscribe(
            (authorizedUser: User) => {
                this.authorizedUser = authorizedUser
            }
        )
    }


    /**
     * Logs out the current user
     */
    public logOutUser(): void {
        this.authService.logOutUser()
    }

}
