import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

	constructor() { }

	userLogin(loginData): any {  
		let userObj = null;
		let users = JSON.parse(localStorage.getItem("users") || "[]");

	    users.forEach((user, index) => {
	    	if(user.username === loginData.username && user.password === loginData.password) {
	    		userObj = user;
	    	}
	    });

	    if(userObj) {
	    	return { status: true, message: "You have been successfully logged in", user: userObj };
	    } else {
	    	return { status: false, message: "Username or password is incorrect!", user: userObj };
	    }
	}

}
