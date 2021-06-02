import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

//   getAvatars(){
//       return this.db.collection('/avatar').valueChanges()
//   }

//   getUser(userKey: string){
//     return this.db.collection('users').doc(userKey).snapshotChanges();
//   }

//   updateUser(userKey: string, value: {name: string, nameToSearch: string}){
//     value.nameToSearch = value.name.toLowerCase();
//     return this.db.collection('users').doc(userKey).set(value);
//   }

//   deleteUser(userKey: string){
//     return this.db.collection('users').doc(userKey).delete();
//   }

//   getUsers(){
//     return this.db.collection('users').snapshotChanges();
//   }

//   searchUsers(searchValue: string){
//     return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
//       .where('nameToSearch', '<=', searchValue + '\uf8ff'))
//       .snapshotChanges()
//   }

//   searchUsersByAge(value: string){
//     return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
//   }


//   createUser(value, avatar){
//     return this.db.collection('users').add({
//       name: value.name,
//       nameToSearch: value.name.toLowerCase(),
//       surname: value.surname,
//       age: parseInt(value.age),
//       avatar: avatar
//     });
//   }
}