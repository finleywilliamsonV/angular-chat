import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HideAndRetainSpaceDirective } from './shared/directives/hide-and-retain-space.directive';
import { InboxItemComponent } from './message-center/inbox-item/inbox-item.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MessageCenterComponent } from './message-center/message-center.component';
import { MessageItemComponent } from './message-center/message-item/message-item.component';
import { NewMessageFormComponent } from './message-center/new-message-form/new-message-form.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { PasswordReqLiComponent } from './shared/display/password-req-li/password-req-li.component';
import { RequireNoRepeatingNumbersDirective } from './shared/directives/require-no-repeating-numbers.directive';
import { RequireNumberDirective } from './shared/directives/require-number.directive';
import { RequirePasswordMatchDirective } from './shared/directives/require-password-match.directive';
import { RequireSpecialCharacterDirective } from './shared/directives/require-special-character.directive';
import { SpinnerComponent } from './shared/display/spinner/spinner.component';
import { UserTileComponent } from './shared/display/user-tile/user-tile.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { XOrCheckComponent } from './shared/display/x-or-check/x-or-check.component';
import { LoadingIconComponent } from './shared/components/loading-icon/loading-icon.component';

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
        MessageItemComponent,
        NewMessageFormComponent,
        LoadingIconComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
    ],
    exports: [
        HideAndRetainSpaceDirective
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
