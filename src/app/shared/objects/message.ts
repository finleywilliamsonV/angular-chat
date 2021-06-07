import { User } from "./user"

/**
 * Message Class
 */
export class Message {

    // member vars
    private _sender: User
    private _recipient: User
    private _subject: string
    private _body: string
    private _isRead: boolean
    private _id: number

    /**
     * Constructor
     */
    constructor(
        sender: User,
        recipient: User,
        subject: string,
        body: string,
        id: number
    ) {
        this._sender = sender
        this._recipient = recipient
        this._subject = subject
        this._body = body
        this._isRead = false
        this._id = id
    }

    // ---------- accessors
    public get sender(): User {
        return this._sender
    }
    public get recipient(): User {
        return this._recipient
    }
    public get subject(): string {
        return this._subject
    }
    public get body(): string {
        return this._body
    }
    public get isRead(): boolean {
        return this._isRead
    }
    public get id(): number {
        return this._id
    }
}