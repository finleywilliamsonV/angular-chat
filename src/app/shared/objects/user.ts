export class User {

    private _firstName: string
    private _lastName: string
    private _password: string
    private _profilePicUrl: string

    constructor(
        firstName: string,
        lastName: string,
        password: string,
        profilePicUrl?: string
     ) {
        this._firstName = firstName
        this._lastName = lastName
        this._password = password
        this._profilePicUrl = profilePicUrl || 'https://picsum.photos/200'
     }
}