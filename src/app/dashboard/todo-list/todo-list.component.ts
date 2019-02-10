import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../services/utility.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

	errorMessage: string = "";
	taskList: any;
	loggedInUserID: number;

	constructor(private utilityService: UtilityService, private authService: AuthService) {
		
	}

	ngOnInit() {
		this.loggedInUserID = this.authService.getLoggedInUserID();
		this.errorMessage = "";
		this.taskList = this.utilityService.getTask(this.loggedInUserID);
	}

	addTask(task) {
		if(task.value) {
			let taskObj = {
				id: this.utilityService.generateUniqueID(), 
				name: task.value, 
				status: "pending",
				userID: this.loggedInUserID
			}
			this.taskList.unshift(taskObj);
			this.utilityService.addTask(taskObj);
			task.value = "";
			this.errorMessage = "";
		} else {
			this.errorMessage = "Enter the task description";
		}
	}

	changeTaskStatus(task) {
		if(task.status === "pending") {
			task.status = "completed";
		} else {
			task.status = "pending";
		}
		this.utilityService.changeTaskStatus(task);
	}

	removeTask(taskID) {
		this.errorMessage = "";
		this.taskList = this.taskList.filter((task) => task.id !== taskID);
		this.utilityService.removeTask(taskID);
	}

}
