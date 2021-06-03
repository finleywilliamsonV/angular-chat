import { User } from './../objects/user';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// constants
const MOCK_SERVER_CALL_LENGTH: number = 1500

/**
 * Auth Service Class
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // member vars
    private _authorizedUser: User
    private _userAuthorization: Subject<User>

    /**
     * Constructor
     */
    constructor() {
        this._userAuthorization = new Subject<User>()
    }

    /**
     * Attempts to authorize a user.
     * @param user 
     * @param password 
     * @returns Promise -> boolean
     */
    public async authorizeUser(user: User, password: string): Promise<boolean> {

        // await mock server call
        await this.mockServerCall(MOCK_SERVER_CALL_LENGTH)

        // check the password 
        if (user.password === password) {

            // set as authorized user
            this._authorizedUser = user

            // push to the subject
            this._userAuthorization.next(this._authorizedUser)

            // return success
            return true
        }

        // return failure
        return false
    }

    /**
     * Creates a mock server call taking a given amount of time.
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
