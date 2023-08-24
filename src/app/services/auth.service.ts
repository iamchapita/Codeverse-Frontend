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
									});
								})
								.then(async (response) => {
									await this.fetchService.makeRequest(
										'folders',
										'POST',
										{
											name: 'rooFolder',
											description: 'This is RootFolder',
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
}
