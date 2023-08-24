import { Component, OnInit } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';
import { Router } from '@angular/router';
import { RequestOptions } from 'src/app/services/requestOption.interface';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	faFacebook = faFacebook;
	loginForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		public authService: AuthService,
		private fetchService: FetchService,
		private router: Router
	) {}

	ngOnInit(): void {
		if (this.authService.isLoggedIn == true) {
			this.router.navigate(['app/projectExplorer']);
		}

		this.loginForm = this.fb.group({
			emailInput: new FormControl('', [
				Validators.required,
				Validators.email,
			]),
			passwordInput: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/
				),
			]),
		});
	}

	async handleSubmit() {
		if (this.loginForm.valid) {
			await this.authService.signIn(
				this.loginForm.get('emailInput')?.value,
				this.loginForm.get('passwordInput')?.value
			);
		} else {
			return;
		}
	}
}
