import { AuthService } from './../shared/services/auth.service';
import { User } from './../shared/objects/user';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { ModalBindings } from 'app/shared/models/modal.model';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Property Bindings for the Login Modal
 */
export interface LoginModalBindings extends ModalBindings {
    user: User
}

/**
 * Login Modal Component Class
 */
@Component({
    selector: 'login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

    // bound variables
    public user: User

    // member variables
    public attemptingLogin: boolean
    public passwordIncorrect: boolean

    /**
     * Constructor
     * @param modalInstance 
     */
    constructor(
        private modalInstance: NgbActiveModal,
        private authService: AuthService,
        private router: Router
    ) {
        this.attemptingLogin = false
        this.passwordIncorrect = false
    }

    /**
     * On Init Lifecycle Hook
     */
    ngOnInit(): void {
    }

    /**
     * Cancels the modal
     */
    public cancel(): void {
        this.modalInstance.dismiss()
    }

    /**
     * Attempts to log the user in with the given password
     * @param passwordInput 
     * @returns Promise
     */
    public async attemptLogin(passwordInput: NgModel): Promise<void> {
        
        // store the password from the input
        const password: string = passwordInput.value

        // attempt to log in the user
        this.attemptingLogin = true
        const loginSuccessful: boolean = await this.authService.authorizeUser(this.user, password)
        this.attemptingLogin = false

        // handle success/failure
        if (loginSuccessful) {
            this.modalInstance.close()
        } else {
            this.passwordIncorrect = true
        }
    }
}
