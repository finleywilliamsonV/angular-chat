import { User } from './../objects/user';
import { Injectable } from '@angular/core';

// constants
const MOCK_SERVER_CALL_LENGTH: number = 1500

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // member vars
    private _userAuthorized: boolean
    private _authorizedUser: User

    /**
     * Constructor
     */
    constructor() {
        this._userAuthorized = false
    }

    /**
     * Attempts to authorize a user
     * @param user 
     * @param password 
     * @returns 
     */
    public async authorizeUser(user: User, password: string): Promise<boolean> {

        // await mock server call
        await this.mockServerCall(MOCK_SERVER_CALL_LENGTH)

        // check the password 
        if (user.password === password) {

            // set as authorized user
            this._userAuthorized = true
            this._authorizedUser = user
            return true
        }
        return false
    }

    /**
     * Creates a mock server call taking a given amount of time
     * @param timeoutLength time in ms
     * @returns Promise -> void
     */
    private async mockServerCall(timeoutLength: number): Promise<void> {
        return new Promise<void>(
            (resolve) => {
                setTimeout(() => {
                    resolve()
                }, timeoutLength)
            }
        )
    }
}
