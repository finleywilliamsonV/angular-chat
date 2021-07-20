import { AuthService } from './auth.service';
import { GlobalVariableService, TEST_MODE } from './global-variable.service';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DEFAULT_USER_PIC_URL, User } from '../objects/user';
import { find } from 'lodash';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { getNextId, sanitize } from '../helpers';

// default user password
export const DEFAULT_USER_PASSWORD: string = '$cv2365'

// user not found
export const USER_NOT_FOUND: User = new User(
    'USER',
    'NOT FOUND',
    DEFAULT_USER_PASSWORD,
    -1,
)

// export type FirestoreUser = {
//     [prop in keyof Pick<User, 'firstName' | 'lastName' | 'password' | 'id' | 'profilePicUrl'> as `_${prop}`]: User[prop]
// }

export type FirestoreUser = {
    firstName: string,
    lastName: string,
    password: string,
    id: number,
    profilePicUrl: string
}

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

    // firestore vars
    private userCollection: AngularFirestoreCollection<FirestoreUser>

    // test var
    private userAuthorized: boolean = false

    /**
     * Constructor
     * @param globalVariableService 
     */
    constructor(
        private globalVariableService: GlobalVariableService,
        private authService: AuthService,
        private angularFirestore: AngularFirestore
    ) {

        // create the users changed subject
        this.usersChanged = new Subject<User[]>()

        // get the firebase user collection
        this.userCollection = this.angularFirestore.collection('users')

        // subscribe to value changes and convert to Users
        this.userCollection.valueChanges()
            .subscribe(async (firestoreUsers: FirestoreUser[]) => {

                // convert the users and sort by id
                this._users = firestoreUsers
                    .map(this.convertFirestoreUser)
                    .sort((a: User, b: User) => a.id - b.id)

                // push out the user changes
                this.usersChanged.next(this._users)
                
                // authorize the first user
                if (TEST_MODE && this._users.length > 0 && !this.userAuthorized) {
                    console.log('users:', this._users)
                    await this.authService.authorizeUser(this.users[0], DEFAULT_USER_PASSWORD)
                    this.userAuthorized = true
                }
            })
    }

    /**
     * Converts a firestoreUser into a User
     */
    private convertFirestoreUser(firestoreUser: FirestoreUser): User {
        return new User(
            firestoreUser.firstName,
            firestoreUser.lastName,
            firestoreUser.password,
            firestoreUser.id,
            firestoreUser.profilePicUrl
        )
    }

    /**
     * gets a copy of the current users array
     */
    public get users(): User[] {
        return this._users?.slice() ?? []
    }
    
    public async addUser(
        firstName: string,
        lastName: string,
        password: string,
        profilePicUrl: string = DEFAULT_USER_PIC_URL
    ): Promise<string> {

        // create the firestore user
        const fsUser: FirestoreUser = {
            firstName,
            lastName,
            password,
            profilePicUrl,
            id: getNextId(this.users)
        }

        // add to the collection and return the id
        const userDocRef: DocumentReference<FirestoreUser> = await this.userCollection.add(fsUser)
        return userDocRef.id
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
