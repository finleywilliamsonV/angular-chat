import { GlobalVariableService } from './global-variable.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../objects/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _users: User[]

    public usersChanged: Subject<User[]>

    constructor(
        private globalVariableService: GlobalVariableService
    ) {
        this._users = []
        this.usersChanged = new Subject<User[]>()
        this.addUser(
            'Finley',
            'Williamson',
            '$cv2365'
        )
        this.addUser(
            'Kimbie',
            'McPeason',
            '$cv2365'
        )
    }

    public get users(): User[] {
        return this._users.slice()
    }

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
    public getUserById(id: number): User {
        return this._users[id]  // incomplete!!
    }
}
