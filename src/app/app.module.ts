import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { FormsModule } from '@angular/forms';
import { PasswordReqLiComponent } from './shared/display/password-req-li/password-req-li.component';
import { RequireNoRepeatingNumbersDirective } from './shared/directives/require-no-repeating-numbers.directive';
import { RequireNumberDirective } from './shared/directives/require-number.directive';
import { RequirePasswordMatchDirective } from './shared/directives/require-password-match.directive';
import { RequireSpecialCharacterDirective } from './shared/directives/require-special-character.directive';
import { XOrCheckComponent } from './shared/display/x-or-check/x-or-check.component';
import { UserTileComponent } from './shared/display/user-tile/user-tile.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SpinnerComponent } from './shared/display/spinner/spinner.component';
import { HideAndRetainSpaceDirective } from './shared/directives/hide-and-retain-space.directive';
import { MessageCenterComponent } from './message-center/message-center.component';
import { InboxItemComponent } from './message-center/inbox-item/inbox-item.component';
import { MessageItemComponent } from './message-center/message-item/message-item.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        WelcomePageComponent,
        NewUserFormComponent,
        RequireNumberDirective,
        RequireSpecialCharacterDirective,
        RequireNoRepeatingNumbersDirective,
        RequirePasswordMatchDirective,
        XOrCheckComponent,
        PasswordReqLiComponent,
        UserTileComponent,
        LoginModalComponent,
        SpinnerComponent,
        HideAndRetainSpaceDirective,
        MessageCenterComponent,
        InboxItemComponent,
        MessageItemComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgbModule
    ],
    exports: [
        HideAndRetainSpaceDirective
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
