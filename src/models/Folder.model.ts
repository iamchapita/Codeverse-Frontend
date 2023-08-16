import { Project } from './Project.model';
import { Snippet } from './Snippet.model';

export interface Folder {
	_id?: string;
	name: string;
	description: string;
	createdAt: string;
	modifiedAt: string;
	parentFolder?: string;
	folders?: Array<Folder>;
	projects?: Array<Project>;
	snippets?: Array<Snippet>;
}
