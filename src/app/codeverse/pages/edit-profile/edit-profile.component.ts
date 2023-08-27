import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
	AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
	updateProfileForm: FormGroup;
	isLoading: boolean = true;

	userDetails: any = {
		firstNameInput: '',
		lastNameInput: '',
		emailInput: '',
		passwordInput: '',
		passwordConfirmInput: '',
		planInput: '',
	};

	constructor(
		private fb: FormBuilder,
		public authService: AuthService,
		private fetchService: FetchService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getUser();

		this.updateProfileForm = this.fb.group(
			{
				firstNameInput: new FormControl('', [
					Validators.required,
					Validators.pattern(
						/^(?:[a-zA-Z]{2,15} [a-zA-Z]{2,15}|[a-zA-Z]{2,15})$/
					),
				]),
				lastNameInput: new FormControl('', [
					Validators.required,
					Validators.pattern(
						/^(?:[a-zA-Z]{2,15} [a-zA-Z]{2,15}|[a-zA-Z]{2,15})$/
					),
				]),
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
				passwordConfirmInput: new FormControl('', [
					Validators.required,
					Validators.pattern(
						/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/
					),
				]),
				planInput: new FormControl('', [Validators.required]),
			},
			{
				validators: this.passwordsMatchValidator,
			}
		);
	}

	async getUser() {
		const id = JSON.parse(localStorage.getItem('user')!).id;

		await this.fetchService
			.makeRequest(`users/${id}`, 'GET', null)
			.then(async (response) => {
				// this.updateProfileForm.setValue()

				this.userDetails = {
					firstNameInput: response.name.split(' ')[0],
					lastNameInput: response.name.split(' ')[1],
					emailInput: response.email,
					passwordInput: '',
					passwordConfirmInput: '',
					planInput: response.plan,
				};

				this.updateProfileForm.setValue(this.userDetails);
			})
			.catch((error) => {});

		this.isLoading = false;
	}

	passwordsMatchValidator(
		control: AbstractControl
	): { [key: string]: any } | null {
		const passwordInput = control.get('passwordInput');
		const passwordConfirmInput = control.get('passwordConfirmInput');

		if (
			passwordInput &&
			passwordConfirmInput &&
			passwordInput.value !== passwordConfirmInput.value
		) {
			return { passwordsMismatch: true };
		}

		return null;
	}

	async handleSubmit() {
		if (this.updateProfileForm.valid) {

			this.authService.updateUser(this.updateProfileForm.value);

		} else {
			return;
		}
	}
}
