import { GlobalVariableService } from './global-variable.service';
import { User } from './../objects/user';
import { Message } from './../objects/message';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Message Service
 */
@Injectable({
    providedIn: 'root'
})
export class MessageService {

    // member vars
    private _messages: Message[]
    public messagesChanged: Subject<Message[]>

    /**
     * Constructor
     */
    constructor(
        private globalVariableService: GlobalVariableService
    ) {
        this._messages = []
        this.messagesChanged = new Subject<Message[]>()
    }

    /**
     * Returns the users in the db
     */
    public get messages(): Message[] {
        return this._messages.slice()
    }

    /**
     * Adds a message to the db
     */
    public addMessage(
        sender: User,
        recipient: User,
        subject: string,
        body: string
    ): void {
        this._messages.push(
            new Message(
                sender,
                recipient,
                subject,
                body,
                this.globalVariableService.getNextMessageId()
            )
        )
        this.messagesChanged.next(this.messages)
    }

    /**
     * Gets the messages sent by a user
     * @param user 
     * @returns 
     */
    public getMessagesSentByUser(user: User): Message[] {
        return this.messages.filter(message => message.sender === user)
    }

    /**
     * Gets the messages received by a user
     * @param user 
     * @returns 
     */
    public getMessagesReceivedByUser(user: User): Message[] {
        return this.messages.filter(message => message.recipient === user)
    }
}
