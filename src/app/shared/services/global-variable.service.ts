import { Injectable } from '@angular/core';

export type DefaultUserName = {
    firstName: string,
    lastName: string
}

@Injectable({
    providedIn: 'root'
})
export class GlobalVariableService {

    private defaultUserNameCount: number    // used for getting default user names
    private defaultUserNames: DefaultUserName[]
    private currentUserId: number
    private currentMessageId: number

    constructor() {
        this.defaultUserNameCount = 0
        this.defaultUserNames = [
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
        this.currentUserId = 0
        this.currentMessageId = 0
    }

    /**
     * Gets the next default user name
     */
    public getNextUserName(): DefaultUserName {
        if (this.defaultUserNameCount >= this.defaultUserNames.length) {
            this.defaultUserNameCount = 0
        }
        const returnName = this.defaultUserNames[this.defaultUserNameCount]
        this.defaultUserNameCount++
        return returnName
    }

    /**
     * Gets the next user id
     */
     public getNextUserId(): number {
        const returnId: number = this.currentUserId
        this.currentUserId++
        return returnId
    }

    /**
     * Gets the next message id
     */
     public getNextMessageId(): number {
        const returnId: number = this.currentMessageId
        this.currentMessageId++
        return returnId
    }

}
