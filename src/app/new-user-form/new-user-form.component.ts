import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultUserName, GlobalVariableService } from './../shared/services/global-variable.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/shared/objects/user';
import { DEFAULT_USER_PASSWORD, UserService } from './../shared/services/user.service';

type UserFormData = {
    firstName: string,
    lastName: string,
    password: string,
    passwordConfirmation: string
}

@Component({
    selector: 'app-new-user-form',
    templateUrl: './new-user-form.component.html',
    styleUrls: ['./new-user-form.component.scss']
})
export class NewUserFormComponent implements OnInit {

    @ViewChild('form')
    private signupForm: NgForm

    public password: string
    public showPassword: boolean

    constructor(
        private userService: UserService,
        private router: Router,
        private globalVariableService: GlobalVariableService
    ) {
        this.password = ''
        this.showPassword = false
    }

    ngOnInit(): void {
    }

    /**
     * Runs when the form is submitted
     */
    public onSubmit() {

        const newUserData: UserFormData = this.signupForm.form.value as UserFormData

        this.userService.addUser(
            newUserData.firstName,
            newUserData.lastName,
            newUserData.password
        )

        this.router.navigate(['home'])
    }

    /**
     * Fills out the user form automatically
     */
    public patchDefaultUser(): void {
        const defaultUserName: DefaultUserName = this.globalVariableService.getNextUserName()
        const defaultUserData: UserFormData = {
            firstName: defaultUserName.firstName,
            lastName: defaultUserName.lastName,
            password: DEFAULT_USER_PASSWORD,
            passwordConfirmation: DEFAULT_USER_PASSWORD
        }
        this.signupForm.form.setValue(defaultUserData)
    }
}
