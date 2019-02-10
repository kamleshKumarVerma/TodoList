import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	errorMessage: string = "";

	constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private authService: AuthService) { }

	ngOnInit() {
		if(this.authService.isUserAuthorised) {
			this.router.navigate(["dashboard"]);
		}
		this.generateForm();
		this.loginForm.reset();
	}

	generateForm() {
		this.errorMessage = "";
		this.loginForm = this.formBuilder.group({
		    "username": ["", [Validators.required]],
		    "password":["", [Validators.required]]
		});
	}

	userLogin(): void {
		this.errorMessage = "";
		let response = this.loginService.userLogin(this.loginForm.value);
		if(response.status) {
			this.loginForm.reset();
			this.authService.setAuthorisedUser(true, response.user.id);
			this.router.navigate(["dashboard"]);
		} else {
			this.errorMessage = response.message;
		}
	}

}
