import { Component, Input, OnInit } from '@angular/core'
import { User } from 'app/shared/objects/user'

@Component({
    selector: 'profile-pic',
    templateUrl: './profile-pic.component.html',
    styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {

    private static imageIncrement: number = 0
    private static userImages: Record<number, string> = {}

    private _profilePicUrl: string

    public readonly $tangerine: string = '#eb9486'

    @Input() user: User
    @Input() diameter: number
    @Input() borderThickness: number
    @Input() active: boolean

    constructor() { }

    ngOnInit(): void {
        this._profilePicUrl = this.calculateProfilePicUrl()
    }

    public get altText(): string {
        return `${ this.user.firstName }'s Profile Pic`
    }

    private calculateProfilePicUrl(): string {
        if (!ProfilePicComponent.userImages[this.user.id]) {
            let diameterToUse: number = this.diameter
            if (this.diameter < 100) {
                diameterToUse = 100
            }

            ProfilePicComponent.imageIncrement++
            ProfilePicComponent.userImages[this.user.id] = `https://picsum.photos/${ diameterToUse }?random&t=${ ProfilePicComponent.imageIncrement }`
        }

        return ProfilePicComponent.userImages[this.user.id]
    }

    public get profilePicUrl(): string {
        return this._profilePicUrl
    }
}
