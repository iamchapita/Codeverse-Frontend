export type Type = 'HTML' | 'CSS' | 'JS';

export interface File {
	_id?: string;
	type: Type;
	content: string;
	createdAt: string;
	modifiedAt: string;
}
