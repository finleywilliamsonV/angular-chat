import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { FormsModule } from '@angular/forms';
import { PasswordReqLiComponent } from './shared/password-req-li/password-req-li.component';
import { RequireNoRepeatingNumbersDirective } from './shared/require-no-repeating-numbers.directive';
import { RequireNumberDirective } from './shared/require-number.directive';
import { RequirePasswordMatchDirective } from './shared/require-password-match.directive';
import { RequireSpecialCharacterDirective } from './shared/require-special-character.directive';
import { XOrCheckComponent } from './shared/x-or-check/x-or-check.component';
import { UserTileComponent } from './shared/display/user-tile/user-tile.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SpinnerComponent } from './shared/display/spinner/spinner.component';

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
        SpinnerComponent
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
