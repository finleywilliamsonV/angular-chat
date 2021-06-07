import { User } from "./user"
import * as moment from 'moment'

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
    private _dateSent: moment.Moment
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
        this._dateSent = moment()
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


    /**
     * Gets the full date string
     */
    public get dateString_full(): string {
        return this._dateSent.format('ddd, M/D/YY - h:mm A')
    }

    /**
     * Gets the month/day date string
     */
    public get dateString_monthDay(): string {
        return this._dateSent.format('M/D')
    }
}