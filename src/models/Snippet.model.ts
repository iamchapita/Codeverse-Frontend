import { Type } from './File.model';

export interface Snippet {
	_id?: string;
	name: string;
	type: Type;
	code: string;
	createdAt: string;
	modifiedAt: string;
}
