import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { User } from './../objects/user';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    private userCollection: AngularFirestoreCollection<User>
    private userObservableArray: Observable<User[]>
    // private firebaseUsers: User[]

    public firebaseUsers: Subject<User[]>


    constructor(
        private angularFirestore: AngularFirestore
    ) {

        console.log('CONSTRUCTING FIRESTORE SERVICE')

        this.userCollection = this.angularFirestore.collection('users')
        this.userCollection.valueChanges()
            .subscribe((users: User[]) => {
                // this.firebaseUsers = users
                console.log('this.userArray:', this.firebaseUsers)
            })
    }




}
