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
}
