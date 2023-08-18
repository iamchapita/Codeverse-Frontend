import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
	AbstractControl,
} from '@angular/forms';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
	faFacebook = faFacebook;
	registerForm: FormGroup;

	constructor(private fb: FormBuilder, public authService: AuthService) {}

	ngOnInit(): void {
		this.registerForm = this.fb.group(
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
			},
			{
				validators: this.passwordsMatchValidator,
			}
		);
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

	handleSubmit() {
		if (this.registerForm.valid) {
			this.authService.SignUp(
				`${this.registerForm.get('firstNameInput')?.value} ${
					this.registerForm.get('lastNameInput')?.value
				}`,
				this.registerForm.get('emailInput')?.value,
				this.registerForm.get('passwordInput')?.value
			);
		} else {
			return;
		}
	}
}
