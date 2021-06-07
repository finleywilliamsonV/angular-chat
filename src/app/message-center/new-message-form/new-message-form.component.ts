import { MessageService } from './../../shared/services/message.service';
import { Subscription } from 'rxjs';
import { AuthService } from './../../shared/services/auth.service';
import { UserService } from './../../shared/services/user.service';
import { User } from 'app/shared/objects/user';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'app/shared/objects/message';
import { NgForm } from '@angular/forms';

type NewMessageFormData = {
    subject: string,
    body: string
}

@Component({
    selector: 'new-message-form',
    templateUrl: './new-message-form.component.html',
    styleUrls: ['./new-message-form.component.scss']
})
export class NewMessageFormComponent implements OnInit {

    // member vars
    public authorizedUser: User
    public users: User[]
    private usersChangedSub: Subscription
    public recipient: User | undefined

    @ViewChild('form')
    private newMessageForm: NgForm

    /**
     * Constructor
     */
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private messageService: MessageService
    ) { }

    /**
     * On Init Lifecycle Hook
     */
    ngOnInit(): void {

        // get the authorized user
        if (this.authService.authorizedUser) {
            this.authorizedUser = this.authService.authorizedUser
        }

        // get the users
        this.users = this.userService.users

        // subscribe to user changes
        this.usersChangedSub = this.userService.usersChanged.subscribe(
            newUsers => {
                this.users = newUsers
            }
        )

    }

    /**
     * Submits the new message form
     */
    public onSubmit(): void {

        // get the message data
        const newMessageData: NewMessageFormData = this.newMessageForm.form.value as NewMessageFormData

        // check all data exists
        if (this.recipient && newMessageData.subject && newMessageData.body) {

            console.log('newMessageData:', newMessageData)

            // add the message
            this.messageService.addMessage(
                this.authorizedUser,
                this.recipient,
                newMessageData.subject,
                newMessageData.body
            )
        }
        // this.router.navigate(['home'])
    }

    public get formIsValid(): boolean {
        const newMessageData: NewMessageFormData = this.newMessageForm.form.value as NewMessageFormData
        return !!this.recipient && !!newMessageData.subject && !!newMessageData.body
    }

    /**
     * Gets all users except the one currently authorized
     */
    public get usersOtherThanAuthorized(): User[] {
        return this.users.filter(user => user != this.authorizedUser)
    }

    /**
     * Gets all users except the one currently authorized and the currently selected recipient
     */
    public get usersOtherThanAuthorizedAndRecipient(): User[] {
        return this.users.filter(user => user != this.authorizedUser && user != this.recipient)
    }

    /**
     * Sets the recipient of the message
     */
    public setRecipient(user: User): void {
        this.recipient = user
    }

    /**
     * Clears the current recipient
     */
    public clearRecipient(): void {
        this.recipient = undefined
    }
}
