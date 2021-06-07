import { AuthService } from './../../services/auth.service';
import { LoginModalComponent, LoginModalBindings } from './../../../login-modal/login-modal.component';
import { ModalLaunchService } from './../../services/modal-launch.service';

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/shared/objects/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'user-tile',
    templateUrl: './user-tile.component.html',
    styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {

    @Input('user')
    public user: User

    public authorizedUser: User
    public currentUserAuthorized: boolean
    private userAuthorizationSub: Subscription


    /**
     * Constructor
     * @param modalLaunchService
     */
    constructor(
        private modalLaunchService: ModalLaunchService,
        private authService: AuthService,
        private router: Router
    ) {
        this.currentUserAuthorized = false
    }

    /**
     * On Init Lifecycle Hook
     */
    ngOnInit(): void {

        // get the authorized user
        if (this.authService.authorizedUser) {
            this.authorizedUser = this.authService.authorizedUser
            this.checkUserCurrentlyAuthorized()
        }

        // subscribe to user authorization
        this.userAuthorizationSub = this.authService.userAuthChanged.subscribe(
            (authorizedUser: User) => {
                this.authorizedUser = authorizedUser
                this.checkUserCurrentlyAuthorized()
            }
        )
    }

    /**
     * Opens the login modal
     */
    public openLoginModal(): void {

        // initialize the modal bindings
        const loginModalBindings: LoginModalBindings = {
            user: this.user
        }

        // launch the login modal
        this.modalLaunchService.open(
            LoginModalComponent,
            {
                centered: true,
                backdropClass: 'background-white',
                backdrop: 'static'
            },
            loginModalBindings
        )
    }

    public goToMessageCenter() {
        this.router.navigate(['/messages', this.authorizedUser.id])
    }

    /**
     * Logs out the user
     */
    public logOutUser(): void {
        
    }

    /**
     * checks if the current user is the authorized user
     */
    public checkUserCurrentlyAuthorized(): void {
        this.currentUserAuthorized = this.user === this.authorizedUser
    }
}
