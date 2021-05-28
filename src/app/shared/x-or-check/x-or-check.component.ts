import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'x-or-check',
    templateUrl: './x-or-check.component.html',
    styleUrls: ['./x-or-check.component.css']
})
export class XOrCheckComponent implements OnInit {

    @Input('error')
    public error: boolean

    constructor() { }

    ngOnInit(): void {
    }

}
