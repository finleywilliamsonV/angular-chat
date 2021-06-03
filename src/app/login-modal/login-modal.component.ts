import { User } from './../shared/objects/user';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { ModalBindings } from 'app/shared/models/modal.model';
import { NgModel } from '@angular/forms';

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

    /**
     * Constructor
     * @param modalInstance 
     */
    constructor(
        public modalInstance: NgbActiveModal
    ) {
        this. attemptingLogin = false
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
     */
    public attemptLogin(passwordInput: NgModel): void {
        const password: string = passwordInput.value
    }
}
