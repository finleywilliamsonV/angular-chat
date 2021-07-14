import { User } from "./user"
import { format } from 'date-fns'

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
    private _dateSent_epoch: number
    private _dateSent_date: Date
    private _id: number

    /**
     * Constructor
     */
    constructor(
        sender: User,
        recipient: User,
        subject: string,
        body: string,
        isRead: boolean,
        dateSent: number,
        id: number
    ) {
        this._sender = sender
        this._recipient = recipient
        this._subject = subject
        this._body = body
        this._isRead = isRead
        this._dateSent_epoch = dateSent
        this._dateSent_date = new Date(this._dateSent_epoch)
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
    public set isRead(tf: boolean) {
        this._isRead = tf
    }
    public get dateSent(): Date {
        return this._dateSent_date
    }
    public get id(): number {
        return this._id
    }


    /**
     * Gets the full date string
     */
    public get dateString_full(): string {
        return format(this._dateSent_date, "E',' P p")
    }

    /**
     * Gets the month/day date string
     */
    public get dateString_monthDay(): string {
        return format(this._dateSent_date, "M/d")
    }

    /**
     * Gets the epoch seconds
     */
    public get epochSeconds(): number {
        return this._dateSent_epoch
    }
}