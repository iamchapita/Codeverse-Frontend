import { Injectable } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { FetchService } from './fetch.service';

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
	performingUpdate: boolean = false;
	updateProfile: string = '';

	constructor(
		public afAuth: AngularFireAuth,
		public router: Router,
		private fetchService: FetchService
	) {
		this.afAuth.authState.subscribe((user) => {
			if (user) {
			} else {
				localStorage.setItem('user', 'null');
			}
		});
	}

	setUserData(user: any) {
		this.userData = {
			id: user.id,
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			plan: user.plan,
		};

		localStorage.setItem('user', JSON.stringify(this.userData));
	}

	async signIn(email: string, password: string) {
		this.performingLogin = true;
		await this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				this.afAuth.authState.subscribe(async (innerUser) => {
					if (innerUser) {
						await this.getUserIdByUid(innerUser.uid).then(
							(response) => {
								this.setUserData({
									uid: user!.uid,
									email: user!.email,
									displayName: user!.displayName,
									photoURL: user!.photoURL,
									id: response._id,
									plan: response.plan,
								});
								this.performingLogin = false;
								this.router.navigate(['app/projectExplorer']);
							}
						);
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
					await auth
						.updateProfile(user, {
							displayName: displayName,
						})
						.then(async (data) => {
							await this.fetchService
								.createUser(user!.uid, displayName, email)
								.then((response) => {
									this.setUserData({
										uid: user!.uid,
										email: user!.email,
										displayName: user!.displayName,
										photoURL: user!.photoURL,
										id: response._id,
										plan: response.plan,
									});
								})
								.then(async (response) => {
									await this.fetchService.makeRequest(
										'folders',
										'POST',
										{
											name: 'Raíz',
											description:
												'Este es el folde Raíz',
											user: this.userData.id,
										}
									);

									this.performingRegister = false;
									this.router.navigate([
										'app/projectExplorer',
									]);
								});
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

	async getUserIdByUid(uid: string): Promise<any> {
		return await this.fetchService.makeRequest(
			`users/uid/${uid}`,
			'GET',
			null
		);
	}

	async updateUser(user: any) {
		this.performingUpdate = true;

		const currentUser = await this.afAuth.currentUser;
		const userId = JSON.parse(localStorage.getItem('user')!).id;

		await currentUser
			?.updateProfile({
				displayName: `${user.firstNameInput} ${user.lastNameInput}`,
				photoURL: null,
			})
			.then(async (response) => {
				await currentUser?.updateEmail(user.emailInput);
				await currentUser?.updatePassword(user.passwordInput);
				await this.fetchService.makeRequest(`users/${userId}`, 'PUT', {
					name: `${user.firstNameInput} ${user.lastNameInput}`,
					email: user.emailInput,
					plan: user.planInput,

				});
			})
			.catch((error) => {
				if (
					error.message ===
					'Firebase: This operation is sensitive and requires recent authentication. Log in again before retrying this request. (auth/requires-recent-login).'
				) {
					this.updateProfile =
						'Cierre sesión e inicie sesión de nuevo para actualizar estos campos';
				}
			});

		this.performingUpdate = false;
		this.router.navigate(['editProfile']);
	}
}
