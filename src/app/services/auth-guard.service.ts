import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

		if (!this.authService.isUserAuthorised) {
            this.router.navigate(["home"]);
            return false;
        }

        this.authService.authorisedUserWatcher.subscribe(
	      (flag) => {
	      	if(!flag) {
	      		this.router.navigate(["home"]);
            	return false;
	      	}
	      }
	    );

        return true;
	}

}
