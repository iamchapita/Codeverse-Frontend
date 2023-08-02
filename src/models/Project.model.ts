import { File } from './File.model';

export interface Project {
	id: number;
	name: string;
	description: string;
	createdAt: string;
	modifiedAt: string;
	files: Array<File>;
}
