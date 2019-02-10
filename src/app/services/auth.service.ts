import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	public isUserAuthorised: boolean;
	public authorisedUserWatcher: EventEmitter<boolean> = new EventEmitter();

	constructor() { 
        this.isUserAuthorised = (localStorage.getItem("user") === "true");
    }

	setAuthorisedUser(flag, userId) {
        localStorage.setItem("user", flag.toString());
        localStorage.setItem("userId", userId);
		this.isUserAuthorised = flag;
        this.authorisedUserWatcher.emit(flag);
    }

    removeAuthorisedUser() {
        localStorage.setItem("user", "false");
        localStorage.removeItem("userId");
        this.isUserAuthorised = false;
        this.authorisedUserWatcher.emit(false);
    }

    getLoggedInUser() {
        let userId = Number(localStorage.getItem("userId"));
        let userObj = null;
        let users = JSON.parse(localStorage.getItem("users") || "[]");

        users.forEach((user, index) => {
            if(user.id == userId) {
                userObj = user;
            }
        });
        return userObj
    }

    getLoggedInUserID() {
        return Number(localStorage.getItem("userId"));
    }

}
