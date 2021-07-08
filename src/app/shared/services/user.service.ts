import { AuthService } from './auth.service';
import { GlobalVariableService } from './global-variable.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../objects/user';
import { find } from 'lodash';

// default user password
export const DEFAULT_USER_PASSWORD: string = '$cv2365'

/**
 * User Service
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {

    // member vars
    private _users: User[]
    public usersChanged: Subject<User[]>

    /**
     * Constructor
     * @param globalVariableService 
     */
    constructor(
        private globalVariableService: GlobalVariableService,
        private authService: AuthService
    ) {
        this._users = []
        this.usersChanged = new Subject<User[]>()
        this.addUser(
            'Finley',
            'Williamson',
            DEFAULT_USER_PASSWORD
        )
        this.addUser(
            'Kimbie',
            'McPeason',
            DEFAULT_USER_PASSWORD
        )

        this.authService.authorizeUser(this.users[0], DEFAULT_USER_PASSWORD)
    }

    /**
     * gets a copy of the current users array
     */
    public get users(): User[] {
        return this._users.slice()
    }

    /**
     * Adds a user to the users array
     * @param firstName 
     * @param lastName 
     * @param password 
     */
    public addUser(firstName: string, lastName: string, password: string): void {
        const newUser: User = new User(
            firstName,
            lastName,
            password,
            this.globalVariableService.getNextUserId()
        )
        this._users.push(newUser)
        this.usersChanged.next(this.users)
    }

    /**
     * Gets the user with the given id
     * @param id 
     * @returns User
     */
    public getUserById(id: number): User | undefined {
        return find(this.users, (user) => user.id === id)
    }
}
