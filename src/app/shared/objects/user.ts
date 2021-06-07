export class User {

    private _firstName: string
    private _lastName: string
    private _password: string
    private _profilePicUrl: string
    private _id: number

    constructor(
        firstName: string,
        lastName: string,
        password: string,
        id: number,
        profilePicUrl?: string
    ) {
        this._firstName = firstName
        this._lastName = lastName
        this._password = password
        this._id = id
        this._profilePicUrl = profilePicUrl || 'https://picsum.photos/200'
    }

    // ---------- accessors
    public get firstName(): string {
        return this._firstName
    }
    public get lastName(): string {
        return this._lastName
    }
    public get password(): string {
        return this._password
    }
    public get profilePicUrl(): string {
        return this._profilePicUrl
    }
    public get id(): number {
        return this._id
    }
    public get name_full(): string {
        return `${this.firstName} ${this.lastName}`
    }
    public get name_lastFirst(): string {
        return `${this.lastName}, ${this.firstName}`
    }
}