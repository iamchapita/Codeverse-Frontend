import { File } from './File.model';
import { Folder } from './Folder.model';
import { Snippet } from './Snippet.model';

export interface Project {
	_id?: string;
	name: string;
	description: string;
	createdAt: string;
	modifiedAt: string;
	parentFolder: Folder | null;
	files: Array<File>;
	snippets: Array<Snippet>;
}
