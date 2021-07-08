import { MessageViewOption } from './../../shared/services/message.service';
import { Message } from './../../shared/objects/message';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'inbox-item',
    templateUrl: './inbox-item.component.html',
    styleUrls: ['./inbox-item.component.scss']
})
export class InboxItemComponent implements OnInit {

    // member vars
    @Input('message')
    public message: Message

    @Input('messageView')
    public messageView: MessageViewOption

    @Input('firstItem')
    public firstItem: boolean

    @Input('active')
    public active: boolean

    /**
     * Constructor
     */
    constructor() {

    }

    /**
     * On Init Lifecycle Hook
     */
    ngOnInit(): void {
        
    }

}
