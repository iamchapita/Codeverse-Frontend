export type Type = 'HTML' | 'CSS' | 'JS';

export interface File {
	id: number;
	type: Type;
	content: string;
	createdAt: string;
	modifiedAt: string;
}
