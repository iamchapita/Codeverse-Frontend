import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	userData: any;
	registerFailed: string = '';
	performingRegister: boolean = false;
	loginFailed: string = '';
	performingLogin: boolean = false;
	performingLogout: boolean = false;
	uid: string = '';

	constructor(public afAuth: AngularFireAuth, public router: Router) {
		this.afAuth.authState.subscribe((user) => {
			if (user) {
			} else {
				localStorage.setItem('user', 'null');
			}
		});
	}

	setUserData(user: any) {
		this.userData = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
		};

		localStorage.setItem('user', JSON.stringify(this.userData));
	}

	async signIn(email: string, password: string) {
		this.performingLogin = true;
		await this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				this.setUserData(user);

				this.afAuth.authState.subscribe(async (user) => {
					if (user) {
						this.uid = `${user.uid}`;
						this.performingLogin = false;
						this.router.navigate(['app/projectExplorer']);
					}
				});
			})
			.catch((error) => {
				if (
					error.message ===
					'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).'
				) {
					this.performingLogin = false;
					this.loginFailed = 'Credenciales Incorrectas';
				}
			});
	}

	async signUp(displayName: string, email: string, password: string) {
		this.performingRegister = true;
		await this.afAuth
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				if (user !== null) {
					this.uid = `${user.uid}`;

					await auth
						.updateProfile(user, {
							displayName: displayName,
						})
						.then((data) => {
							this.setUserData(user);
							this.performingRegister = false;
							this.router.navigate(['app/projectExplorer']);
						});
				}
			})
			.catch((error) => {
				if (
					error.message ===
					'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'
				) {
					this.performingRegister = false;
					this.registerFailed =
						'El correo electrónico ya está en uso.';
				}
			});
	}

	async signOut() {
		await this.afAuth.signOut();
		localStorage.removeItem('user');
		this.router.navigate(['/']);
	}

	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('user')!);
		return user !== null ? true : false;
	}
}
