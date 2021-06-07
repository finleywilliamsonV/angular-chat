import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from './../shared/services/message.service';
import { AuthService } from './../shared/services/auth.service';
import { Message } from './../shared/objects/message';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/objects/user';

@Component({
    selector: 'app-message-center',
    templateUrl: './message-center.component.html',
    styleUrls: ['./message-center.component.scss']
})
export class MessageCenterComponent implements OnInit {

    // member vars
    public authorizedUser: User | undefined
    public userRecievedMessages: Message[]
    public userSentMessages: Message[]
    public messagesChangedSub: Subscription
    public currentMessage: Message

    /**
     * Constructor
     */
    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router
    ) {
        
    }

    /**
     * On Init Lifecycle Hook
     */
    ngOnInit(): void {

        // get the authorized user
        this.authorizedUser = this.authService.authorizedUser
 
        // get the messages for the user
        this.updateMessagesForUser()

        // subscribe to new messages
        this.messagesChangedSub = this.messageService.messagesChanged.subscribe(
            () => {
                this.updateMessagesForUser()
            }
        )
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
        
        this.userRecievedMessages = this.messageService.getMessagesReceivedByUser(this.authorizedUser)
        this.userSentMessages = this.messageService.getMessagesSentByUser(this.authorizedUser)
    }

    public readMessage(message: Message): void {
        this.currentMessage = message
    }

}
