import { map } from 'rxjs/operators';
import { getNextId } from './../helpers';
import { Message } from 'app/shared/objects/message';
import { UserService, USER_NOT_FOUND } from './user.service';
import { GlobalVariableService } from './global-variable.service';
import { User } from './../objects/user';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentData, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { find } from 'lodash';

// default text lorem ipsum string
export const LOREM_IPSUM: string = 'Lorem ipsum,\n\nDolor sit amet, consectetur adipiscing elit. Quisque ligula orci, dictum vitae mattis id, placerat seddiam.\n\nSed in suscipit enim. Curabitur id lorem et tortor pretium commodo. Vivamus pharetra tellus sit amet orci semper dignissim. Suspendisse eleifend venenatis nibh, quis imperdiet nisi posuere pulvinar. Suspendisse potenti. Pellentesque bibendum efficitur vehicula. Vestibulum id ante ut elit gravida suscipit tincidunt non nisl. Fusce sit amet gravida eros. Duis rutrum nunc ut sem facilisis, in viverra tellus posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut elementum quam ac condimentum gravida. Fusce placerat varius purus nec imperdiet. Sed justo lacus, tristique ut malesuada eu, tristique venenatis orci. Mauris purus neque, pellentesque non est sit amet.\n\nVolutpat semper,\nMauris'
export const CUPCAKE_IPSUM: string = 'Cupcake ipsum,\n\nCake muffin sweet candy jujubes I love sweet roll cake. Sugar plum candy I love ice cream. Biscuit donut sugar plum I love gingerbread I love apple pie halvah. Cupcake muffin I love marshmallow fruitcake tootsie roll. Sweet toffee jelly beans marzipan candy canes liquorice liquorice cake. Cake bonbon jelly-o. Bear claw cake lollipop jelly beans. Sweet roll donutice cream halvah I love gummi bears marzipan bear claw caramels.\n\nGummies carrot cake I love jujubes gummi bears topping I love. Gummi bears topping jelly beans lollipop pie pastry.\n\nJelly pastry I love I love biscuit. I love cotton candy topping.\n\nCotton candy,\nGingerbread'
export const HIPSTER_IPSUM: string = 'Hipster ipsum,\n\nScnhlitz selfies organic ethical yuccie, swag gluten-free synth.\n\nIPhone tumeric listicle put a bird on it pitchfork jean shorts mumblecore ennui health goth cloud bread fingerstache literally man braid. Kickstarter irony af, man braid kale chips waistcoat cliche ennui semiotics street art cray direct trade. Tattooed actually man braid next level cronut. Lo-fi 3 wolf moon 90\'s tacos succulents vinyl.\n\nMan braid pop-up,\nEdison Bulb'

// message type
export type MessageViewOption = 'sent' | 'received'

// firestore message type
export type FirestoreMessage = {
    senderId: number,
    recipientId: number,
    subject: string,
    body: string,
    isRead: boolean,
    dateSent: number,
    id: number
}

type FirestoreMessageDoc = FirestoreMessage & {
    firestoreId: string
}

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

    // firestore vars
    private messageCollection: AngularFirestoreCollection<FirestoreMessage>

    /**
     * Constructor
     */
    constructor(
        private userService: UserService,
        private angularFirestore: AngularFirestore
    ) {

        // create the messages changed subject
        this.messagesChanged = new Subject<Message[]>()

        // get the firebase messages collection
        this.messageCollection = this.angularFirestore.collection('messages')

        // wait for the users to update

        // subscribe to value changes and convert to Messages
        this.messageCollection.valueChanges()
            .subscribe((firestoreMessages: FirestoreMessage[]) => {
                this._messages = firestoreMessages
                    .map(this.convertFirestoreMessage)
                    .sort((a: Message, b: Message): number => {
                        return b.epochSeconds - a.epochSeconds
                    })
                this.notifyMessagesChanged()
            })
    }

    /**
     * Converts a single firestoreMessage to Message
     */
    private convertFirestoreMessage = (firestoreMessage: FirestoreMessage): Message => {

        // get the users from the user service
        const users: User[] = this.userService.users
        console.log('users (message):', users)

        const sender: User | undefined = find(users, (user: User) => user.id === firestoreMessage.senderId)
        const recipient: User | undefined = find(users, (user: User) => user.id === firestoreMessage.recipientId)

        return new Message(
            sender || USER_NOT_FOUND,
            recipient || USER_NOT_FOUND,
            firestoreMessage.subject,
            firestoreMessage.body,
            firestoreMessage.isRead,
            firestoreMessage.dateSent,
            firestoreMessage.id
        )
    }

    /**
     * Returns the users in the db
     */
    public get messages(): Message[] {
        return this._messages?.slice() ?? []
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

        this.messageCollection.add({
            senderId: sender.id,
            recipientId: recipient.id,
            subject,
            body,
            isRead: false,
            dateSent: Date.now(),
            id: getNextId(this.messages)
        })
    }

    /**
     * Updates the firestore message with the new message data
     */
    public async updateFirestoreMessage(message: Message): Promise<void> {
        this.messageCollection
            .get()
            .subscribe((qs: QuerySnapshot<FirestoreMessage>) => {
                const messageDocs: FirestoreMessageDoc[] = []
                qs.forEach((qds: QueryDocumentSnapshot<DocumentData>) => {
                    messageDocs.push({
                        firestoreId: qds.id,
                        ...qds.data() as FirestoreMessage
                    })
                })

                const messageToUpdate: FirestoreMessageDoc | undefined = find(messageDocs, (doc: FirestoreMessageDoc) => doc.id === message.id)

                if (messageToUpdate) {
                    this.messageCollection
                        .doc(messageToUpdate.firestoreId)
                        .update({
                            senderId: message.sender.id,
                            recipientId: message.recipient.id,
                            subject: message.subject,
                            body: message.body,
                            isRead: message.isRead,
                            dateSent: message.dateSent,
                            id: message.id
                        })
                }
            })
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

    /**
     * Marks the message as read / unread
     */
    public setMessageRead(message: Message, tf: boolean): void {
        message.isRead = tf
        this.updateFirestoreMessage(message)
    }

    /**
     * Notifies subscribers that messages have changed
     */
    private notifyMessagesChanged(): void {
        this.messagesChanged.next(this.messages)
    }

    /**
     * Adds test messages to the system
     */
    private initTest(): void {
        // get users for testing 
        const firstUser = this.userService.users[0]
        const secondUser = this.userService.users[1]

        // make sure they exist
        if (!firstUser || !secondUser) {
            console.error('Init test invalid, add more users')
            return
        }

        // add test messages from first user to second user
        this.addMessage(
            secondUser,
            firstUser,
            'Test Message 1',
            LOREM_IPSUM
        )

        this.addMessage(
            secondUser,
            firstUser,
            'Test Message 2',
            CUPCAKE_IPSUM
        )

        this.addMessage(
            secondUser,
            firstUser,
            'Test Message 3',
            HIPSTER_IPSUM
        )

        // add test messages from the first user to the second user
        this.addMessage(
            firstUser,
            secondUser,
            'Test Message 4',
            LOREM_IPSUM
        )

        this.addMessage(
            firstUser,
            secondUser,
            'Test Message 5',
            CUPCAKE_IPSUM
        )

        this.addMessage(
            firstUser,
            secondUser,
            'Test Message 6',
            HIPSTER_IPSUM
        )


        // add more test messages from first user to second user
        this.addMessage(
            secondUser,
            firstUser,
            'Test Message 7',
            LOREM_IPSUM
        )

        this.addMessage(
            secondUser,
            firstUser,
            'Test Message 8',
            CUPCAKE_IPSUM
        )

        this.addMessage(
            secondUser,
            firstUser,
            'Test Message 9',
            HIPSTER_IPSUM
        )
    }
}
