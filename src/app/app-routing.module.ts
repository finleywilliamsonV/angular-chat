import { MessageCenterComponent } from './message-center/message-center.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full',
    },
    {
        path: 'home', component: WelcomePageComponent
    },
    {
        path: 'user/new', component: NewUserFormComponent
    },
    {
        path: 'messages/:id', component: MessageCenterComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
