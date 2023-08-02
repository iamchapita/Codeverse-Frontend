export type Type = 'html' | 'css' | 'js';

export interface File {
	id: number;
	type: Type;
	content: string;
	createdAt: string;
	modifiedAt: string;
}
