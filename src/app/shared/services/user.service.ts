import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../objects/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _users: User[]

    public usersChanged: Subject<User[]>

    constructor() {
        this._users = []
        this.usersChanged = new Subject<User[]>()
        this._users.push(new User(
            'Finley',
            'Williamson',
            '$cv2365'
        ), new User(
            'Kindie',
            'McPeason',
            '$cv2365'
        ))
    }

    public get users(): User[] {
        return this._users.slice()
    }

    addUser(newUser: User): void {
        this._users.push(newUser)
        this.usersChanged.next(this.users)
        console.log('this._users', this._users)
    }
}
