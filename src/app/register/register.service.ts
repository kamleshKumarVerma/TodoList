import { Injectable } from '@angular/core';
import { UtilityService } from '../services/utility.service';

@Injectable()
export class RegisterService {

	constructor(private utilityService: UtilityService) { }

	userRegister(registerFormData) {
		let isUserAlreadyExist = false;
		let users = JSON.parse(localStorage.getItem("users") || "[]");

	    users.forEach((user, index) => {
	    	if(user.username === registerFormData.username || user.email === registerFormData.email) {
	    		isUserAlreadyExist = true;
	    	}
	    });

	    if(isUserAlreadyExist) {
	    	return { status: false, message: "User already Registered!" };
	    } else {
	    	registerFormData.id = this.utilityService.generateUniqueID();
		    users.push(registerFormData);
		    localStorage.setItem("users", JSON.stringify(users));
		    return { status: true, message: "You have been successfully registered. please login now." };
	    }
	}

}
