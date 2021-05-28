import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'password-req-li',
    templateUrl: './password-req-li.component.html',
    styleUrls: ['./password-req-li.component.css']
})
export class PasswordReqLiComponent implements OnInit {

    @Input('error')
    public error: boolean

    constructor() { }

    ngOnInit(): void {
    }
}
