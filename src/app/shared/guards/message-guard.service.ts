import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { isNil } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class MessageGuardService implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    /**
     * Grants access to the message center route based on the authorized user and the id passed in the url
     * @param route 
     * @returns Observable -> boolean | Promise -> boolean | boolean
     */
    public canActivate(
        route: ActivatedRouteSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        // store the id param and the authorized user
        const routeId = parseInt(route.params.id)
        const authorizedUser = this.authService.authorizedUser

        // check if message center for user is currently authorized
        if(authorizedUser && !isNil(routeId) && authorizedUser.id === routeId) {
            return true
        }
        
        // else, navigate back to home
        else {
            this.router.navigate(['/home'])
            return false
        }
    }
}
