import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

	errorMessage: string = "";
	successMessage: string = "";
	registerForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private authService: AuthService, private router: Router) { }

	ngOnInit() {
		if(this.authService.isUserAuthorised) {
			this.router.navigate(["dashboard"]);
		}
		this.generateForm();
		this.registerForm.reset();
	}

	generateForm() {
		this.errorMessage = "";
		this.successMessage = "";
		this.registerForm = this.formBuilder.group({
		    "email": ["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
		    "username":["", [Validators.required, Validators.minLength(3)]],
		    "password":["", [Validators.required, Validators.minLength(4)]]
		});
	}

	userRegister(): void {
		this.errorMessage = "";
		this.successMessage = "";
		let response = this.registerService.userRegister(this.registerForm.value);
		if(response.status) {
			this.registerForm.reset();
			this.successMessage = response.message;
		} else {
			this.errorMessage = response.message;
		}
	}

}
