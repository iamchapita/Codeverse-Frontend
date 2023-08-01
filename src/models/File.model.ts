export type Extension = 'html' | 'js' | 'css';

export type File = {
	id: number;
	name: string;
	type: Extension;
	content: string;
	createdAt: string;
	modifiedAt: string;
};
