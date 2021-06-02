import { Injectable } from '@angular/core';

export type DefaultUserName = {
    firstName: string,
    lastName: string
}

@Injectable({
    providedIn: 'root'
})
export class GlobalVariableService {

    private DEFAULT_USER_NAME_COUNT: number
    private DEFAULT_USER_NAMES: DefaultUserName[]

    constructor() {
        this.DEFAULT_USER_NAME_COUNT = 0
        this.DEFAULT_USER_NAMES = [
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
        if (this.DEFAULT_USER_NAME_COUNT >= this.DEFAULT_USER_NAMES.length) {
            this.DEFAULT_USER_NAME_COUNT = 0
        }
        const returnName = this.DEFAULT_USER_NAMES[this.DEFAULT_USER_NAME_COUNT]
        this.DEFAULT_USER_NAME_COUNT++
        return returnName
    }

}
