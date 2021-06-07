import { GlobalVariableService } from './global-variable.service';
import { User } from './../objects/user';
import { Message } from './../objects/message';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// default text lorem ipsum string
export const LOREM_IPSUM: string = 'Lorem ipsum,\n\nDolor sit amet, consectetur adipiscing elit. Quisque ligula orci, dictum vitae mattis id, placerat seddiam.\n\nSed in suscipit enim. Curabitur id lorem et tortor pretium commodo. Vivamus pharetra tellus sit amet orci semper dignissim. Suspendisse eleifend venenatis nibh, quis imperdiet nisi posuere pulvinar. Suspendisse potenti. Pellentesque bibendum efficitur vehicula. Vestibulum id ante ut elit gravida suscipit tincidunt non nisl. Fusce sit amet gravida eros. Duis rutrum nunc ut sem facilisis, in viverra tellus posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut elementum quam ac condimentum gravida. Fusce placerat varius purus nec imperdiet. Sed justo lacus, tristique ut malesuada eu, tristique venenatis orci. Mauris purus neque, pellentesque non est sit amet.\n\nVolutpat semper,\nMauris'
export const CUPCAKE_IPSUM: string = 'Cupcake ipsum,\n\nCake muffin sweet candy jujubes I love sweet roll cake. Sugar plum candy I love ice cream. Biscuit donut sugar plum I love gingerbread I love apple pie halvah. Cupcake muffin I love marshmallow fruitcake tootsie roll. Sweet toffee jelly beans marzipan candy canes liquorice liquorice cake. Cake bonbon jelly-o. Bear claw cake lollipop jelly beans. Sweet roll donutice cream halvah I love gummi bears marzipan bear claw caramels.\n\nGummies carrot cake I love jujubes gummi bears topping I love. Gummi bears topping jelly beans lollipop pie pastry.\n\nJelly pastry I love I love biscuit. I love cotton candy topping.\n\nCotton candy,\nGingerbread'
export const HIPSTER_IPSUM: string = 'Hipster ipsum,\n\nScnhlitz selfies organic ethical yuccie, swag gluten-free synth.\n\nIPhone tumeric listicle put a bird on it pitchfork jean shorts mumblecore ennui health goth cloud bread fingerstache literally man braid. Kickstarter irony af, man braid kale chips waistcoat cliche ennui semiotics street art cray direct trade. Tattooed actually man braid next level cronut. Lo-fi 3 wolf moon 90\'s tacos succulents vinyl.\n\nMan braid pop-up,\nEdison Bulb'


/**
 * Message Service
 */
@Injectable({
    providedIn: 'root'
})
export class MessageService {

    // member vars
    private _messages: Message[]
    public messagesChanged: Subject<Message[]>

    /**
     * Constructor
     */
    constructor(
        private globalVariableService: GlobalVariableService
    ) {
        this._messages = []
        this.messagesChanged = new Subject<Message[]>()
    }

    /**
     * Returns the users in the db
     */
    public get messages(): Message[] {
        return this._messages.slice()
    }

    /**
     * Adds a message to the db
     */
    public addMessage(
        sender: User,
        recipient: User,
        subject: string,
        body: string
    ): void {
        this._messages.push(
            new Message(
                sender,
                recipient,
                subject,
                body,
                this.globalVariableService.getNextMessageId()
            )
        )
        this.messagesChanged.next(this.messages)
    }

    /**
     * Gets the messages sent by a user
     * @param user 
     * @returns 
     */
    public getMessagesSentByUser(user: User): Message[] {
        return this.messages.filter(message => message.sender === user)
    }

    /**
     * Gets the messages received by a user
     * @param user 
     * @returns 
     */
    public getMessagesReceivedByUser(user: User): Message[] {
        return this.messages.filter(message => message.recipient === user)
    }
}
