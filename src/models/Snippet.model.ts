import { Type } from './File.model';

export interface Snippet {
	id: number;
	type: Type;
	code: string;
	createdAt: string;
	modifiedAt: string;
}
