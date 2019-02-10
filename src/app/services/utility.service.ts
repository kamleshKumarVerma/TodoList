import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

	constructor() { }

	generateUniqueID() {
		return Date.now() + Math.random();
	}

	getTask(userID) {
		let resultTaskList = [];
		let taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
		taskList.forEach((task) => {
	    	if(task.userID === userID) {
	    		resultTaskList.push(task);
	    	}
	    });
	    return resultTaskList;
	}

	addTask(task) {
		let taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
		taskList.unshift(task);
	   	localStorage.setItem("taskList", JSON.stringify(taskList));
	}

	changeTaskStatus(taskObj) {
		let taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
		taskList.forEach((task) => {
	    	if(task.id === taskObj.id) {
	    		task.status = taskObj.status;
	    	}
	    });
	    localStorage.setItem("taskList", JSON.stringify(taskList));
	}

	removeTask(taskID) {
		console.log(typeof taskID);
		let taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
		taskList = taskList.filter((task) => task.id !== taskID);
	    localStorage.setItem("taskList", JSON.stringify(taskList));
	}

}
