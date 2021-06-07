import { Message } from './../../shared/objects/message';
import { Component, Input, OnInit } from '@angular/core';
import { MessageViewOption } from 'app/shared/services/message.service';

@Component({
    selector: 'message-item',
    templateUrl: './message-item.component.html',
    styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

    // member vars
    @Input('message')
    public message: Message

    @Input('messageView')
    public messageView: MessageViewOption

    /**
     * Constructor
     */
    constructor() { }

    /**
     * On Init Lifecycle Hook
     */
    ngOnInit(): void {
    }

}
