import { NewMessageFormComponent } from './new-message-form/new-message-form.component';
import { UserService } from './../shared/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService, MessageViewOption } from './../shared/services/message.service';
import { AuthService } from './../shared/services/auth.service';
import { Message } from './../shared/objects/message';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'app/shared/objects/user';

@Component({
    selector: 'app-message-center',
    templateUrl: './message-center.component.html',
    styleUrls: ['./message-center.component.scss']
})
export class MessageCenterComponent implements OnInit, AfterViewInit {

    /**
     * Member vars
     */

    @ViewChild(NewMessageFormComponent)
    public newMessageForm: NewMessageFormComponent

    // user vars
    public authorizedUser: User | undefined
    public authChangedSub: Subscription
    public users: User[]
    public usersChangedSub: Subscription

    // user message vars
    public currentMessage: Message | undefined
    public messagesChangedSub: Subscription

    // user message collection vars
    private _collectionTypeViewing: MessageViewOption
    public collectionViewing: Message[]

    // display vars
    private _writingNewMessage: boolean

    /**
     * Constructor
     */
    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private userService: UserService,
        private router: Router
    ) {
        this._writingNewMessage = false
    }

    /**
     * On Init Lifecycle Hook
     */
    ngOnInit(): void {

        // get the authorized user
        this.authorizedUser = this.authService.authorizedUser

        // subscribe to the user authorization state
        this.authChangedSub = this.authService.userAuthChanged.subscribe(
            newUserAuthorized => {
                if (this.authorizedUser != newUserAuthorized) {
                    this.router.navigate(['/'])
                }
            }
        )
 
        // get the messages for the user
        this.updateMessagesForUser()

        // subscribe to new messages
        this.messagesChangedSub = this.messageService.messagesChanged.subscribe(
            () => {
                this.updateMessagesForUser()
            }
        )

        // subscribe to user changes
        this.usersChangedSub = this.userService.usersChanged.subscribe(
            newUsers => {
                this.users = newUsers
            }
        )

        // set the default view to inbox
        this.collectionTypeViewing = 'received'
    }

    /**
     * After View Init Lifecycle Hook
     */
    public ngAfterViewInit(): void {
        console.log('newMessageForm:', this.newMessageForm)
    }

    /**
     * Updates the messages for the authorized user
     */
    private updateMessagesForUser(): void {

        // error checking
        if (!this.authorizedUser) {
            console.error('Somehow no user is authorized, this should have been handled by the message-guard service. Something has gone wrong')
            this.router.navigate(['/'])
            return
        }

        // update the message view
        this.updateCollectionTypeViewing()
    }

    /**
     * Sets a message to read.
     * @param message 
     */
    public readMessage(message: Message): void {
        this.currentMessage = message
        this._writingNewMessage = false
        this.messageService.setMessageRead(message, true)
    }

    /**
     * Gets the collection type the user is currently viewing.
     */
    public get collectionTypeViewing(): MessageViewOption {
        return this._collectionTypeViewing
    }

    /**
     * Sets the collection type the user is currently viewing and sets the current collection accordingly.
     */
    public set collectionTypeViewing(type: MessageViewOption) {

        // do nothing if type has not changed
        if (this._collectionTypeViewing === type) {
            return
        }

        // set the collection type
        this._collectionTypeViewing = type

        // clear the current message
        this.currentMessage = undefined

        // update the message view
        this.updateCollectionTypeViewing()
    }

    /**
     * Updates the collection we are viewing in the message center
     */
    public updateCollectionTypeViewing(): void {
        
        // get inbox messages
        if (this._collectionTypeViewing === 'received' && this.authorizedUser) {
            this.collectionViewing = this.messageService.getMessagesReceivedByUser(this.authorizedUser)

        // get messages sent by user
        } else if (this.collectionTypeViewing === 'sent' && this.authorizedUser) {
            this.collectionViewing = this.messageService.getMessagesSentByUser(this.authorizedUser)
        }
    }

    /**
     * Gets whether the user is writing a new message
     */
    public get writingNewMessage(): boolean {
        return this._writingNewMessage
    }

    /**
     * Sets whether the user is writing a new message
     */
    public set writingNewMessage(isWriting: boolean) {
        
        // set whether the user is writing
        this._writingNewMessage = isWriting

        // clear the current message
        this.currentMessage = undefined
    }

    /**
     * Checks if the new message form is valid
     */
    public newMessageFormIsValid(): boolean {
        return this.newMessageForm && this.newMessageForm.formIsValid
    }

    /**
     * Submits the new message from the child component
     */
    public submitNewMessage(): void {
        this.newMessageForm.onSubmit()
        this.writingNewMessage = false
    }
}
