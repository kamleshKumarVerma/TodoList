import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	user: any = null;

	isUserAuthorised: boolean = false;

	constructor(public authService: AuthService) {
		this.authService.authorisedUserWatcher.subscribe(
	      (flag) => {
	      	this.isUserAuthorised = flag;
	      	this.populateUser();
	      }
	    );
	}

	ngOnInit() {
		this.populateUser();
	}

	populateUser() {
		if(this.authService.isUserAuthorised || this.isUserAuthorised) {
			this.user = this.authService.getLoggedInUser();
		}
	}

	userLogout(): void {
		this.authService.removeAuthorisedUser();
	}

}
