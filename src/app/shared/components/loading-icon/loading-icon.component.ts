import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'loading-icon',
    templateUrl: './loading-icon.component.html',
    styleUrls: ['./loading-icon.component.scss']
})
export class LoadingIconComponent implements OnInit {

    @Input()
    public loading: boolean

    constructor() {}

    ngOnInit(): void {
    }

}
