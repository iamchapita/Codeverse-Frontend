export type Plan = 'FREE' | 'X' | 'Y';

export interface User {
	_id?: string;
	uid?: string;
	name: string;
	email: string;
	password?: string;
	plan: Plan;
	createdAt: string;
	modifiedAt: string;
}
