import { Project } from './Project.model';
import { Snippet } from './Snippet.model';

export interface Folder {
	_id?: string;
	name: string;
	description: string;
	parentFolder?: string;
	user: string;
	folders?: Array<Folder>;
	projects?: Array<Project>;
	snippets?: Array<Snippet>;
	createdAt: string;
	modifiedAt: string;
}
