import { User } from './../../shared/objects/user';
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
