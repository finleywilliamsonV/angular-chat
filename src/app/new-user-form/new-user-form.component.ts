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
}
