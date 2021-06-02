import { UserService } from './../shared/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'app/shared/objects/user';
import { Router } from '@angular/router';

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

    private DEFAULT_USER_NAME_COUNT: number = 0
    private DEFAULT_USER_NAMES: { firstName: string, lastName: string }[] = [
        {
            firstName: 'Jan',
            lastName: 'Winkins'
        },
        {
            firstName: 'Bob',
            lastName: 'Spedis'
        },
        {
            firstName: 'Lemon',
            lastName: 'Beezer'
        },
        {
            firstName: 'Stency',
            lastName: 'Stilpo'
        },
        {
            firstName: 'Cran',
            lastName: 'Derry'
        }
    ]

    public password: string
    public showPassword: boolean

    constructor(
        private userService: UserService,
        private router: Router
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
        console.log('Submitting!')
        console.log('signupForm:', this.signupForm.form.value)

        const newUserData: UserFormData = this.signupForm.form.value

        const newUser: User = new User(
            newUserData.firstName,
            newUserData.lastName,
            newUserData.password
        )

        this.userService.addUser(newUser)

        this.router.navigate(['home'])
    }

    /**
     * Fills out the user form automatically
     */
    public patchDefaultUser(): void {
        const defaultUserName = this.DEFAULT_USER_NAMES[this.DEFAULT_USER_NAME_COUNT]
        const defaultUserData: UserFormData = {
            firstName: defaultUserName.firstName,
            lastName: defaultUserName.lastName,
            password: '$cv2365',
            passwordConfirmation: '$cv2365'
        }
        this.signupForm.form.setValue(defaultUserData)
        this.DEFAULT_USER_NAME_COUNT++
    }
}
