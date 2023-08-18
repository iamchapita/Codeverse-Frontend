export type Plan = 'FREE' | 'X' | 'Y';

export interface User {
	uid: string;
	email: string;
	displayName: string;
	photoURL: string;
	emailVerified: boolean;
}
